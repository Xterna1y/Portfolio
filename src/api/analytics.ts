import type { VercelRequest, VercelResponse } from '@vercel/node';

const VERCEL_API = 'https://api.vercel.com/v1/query/web-analytics';

async function vercelQuery(
  endpoint: string,
  params: Record<string, string>
) {
  const url = new URL(`${VERCEL_API}/${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Vercel API error: ${message}`);
  }

  return response.json();
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const token = req.headers.authorization?.replace(
      /^Bearer\s+/i,
      ''
    );

    if (!token) {
      return res.status(401).json({
        error: 'Authentication required',
      });
    }

    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey =
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    const vercelToken = process.env.VERCEL_TOKEN;
    const projectId = process.env.VERCEL_PROJECT_ID;

    if (
      !supabaseUrl ||
      !supabaseKey ||
      !vercelToken ||
      !projectId
    ) {
      return res.status(500).json({
        error: 'Missing server configuration',
      });
    }

    // Verify the Supabase session.
    const userResponse = await fetch(
      `${supabaseUrl}/auth/v1/user`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!userResponse.ok) {
      return res.status(401).json({
        error: 'Invalid authentication session',
      });
    }

    const user = await userResponse.json();

    // Verify administrator privileges.
    const profileUrl = new URL(
      `${supabaseUrl}/rest/v1/admin_profiles`
    );

    profileUrl.searchParams.set('id', `eq.${user.id}`);
    profileUrl.searchParams.set('role', 'eq.admin');
    profileUrl.searchParams.set('select', 'id');

    const profileResponse = await fetch(profileUrl, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!profileResponse.ok) {
      return res.status(403).json({
        error: 'Could not verify administrator access',
      });
    }

    const profiles = await profileResponse.json();

    if (!profiles.length) {
      return res.status(403).json({
        error: 'Administrator access required',
      });
    }

    // Use the last 30 days.
    const now = new Date();

    const since = new Date(
      now.getTime() - 29 * 24 * 60 * 60 * 1000
    );

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const common = {
      projectId,
      since: since.toISOString(),
      until: now.toISOString(),
    };

    // Retrieve analytics in parallel.
    const [
      totals,
      todayTotals,
      dailyTraffic,
      topPages,
      topReferrers,
    ] = await Promise.all([
      vercelQuery('visits/count', common),

      vercelQuery('visits/count', {
        ...common,
        since: today.toISOString(),
      }),

      vercelQuery('visits/aggregate', {
        ...common,
        by: 'day',
        limit: '30',
      }),

      vercelQuery('visits/aggregate', {
        ...common,
        by: 'requestPath',
        limit: '5',
      }),

      vercelQuery('visits/aggregate', {
        ...common,
        by: 'referrerHostname',
        limit: '5',
      }),
    ]);

    return res.status(200).json({
      period: '30 days',

      totals: totals.data,

      today: todayTotals.data,

      dailyTraffic: dailyTraffic.data ?? [],

      topPages: topPages.data ?? [],

      topReferrers: topReferrers.data ?? [],
    });
  } catch (error) {
    console.error('Analytics API error:', error);

    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : 'Could not retrieve analytics',
    });
  }
}