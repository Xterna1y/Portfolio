import type { VercelRequest, VercelResponse } from '@vercel/node';

const VERCEL_API =
  'https://api.vercel.com/v1/query/web-analytics';

// ======================================================
// TYPES
// ======================================================

type AnalyticsCount = {
  pageviews: number;
  visitors: number;
};

type AnalyticsRow = {
  timestamp?: string;
  requestPath?: string;
  referrerHostname?: string;
  pageviews: number;
  visitors: number;
};

type VercelApiResponse<T> = {
  data: T;
};

// ======================================================
// VERCEL API HELPER
// ======================================================

async function vercelQuery<T>(
  endpoint: string,
  params: Record<string, string>,
  token: string
): Promise<T> {
  const url = new URL(`${VERCEL_API}/${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const message = await response.text();

    console.error(
      `Vercel API error (${response.status}):`,
      message
    );

    throw new Error(
      `Vercel analytics request failed (${response.status}).`
    );
  }

  const result =
    (await response.json()) as VercelApiResponse<T>;

  return result.data;
}

// ======================================================
// MALAYSIA TIME HELPER
// ======================================================

function getMalaysiaMidnightUTC(): Date {
  const now = new Date();

  // Convert current time to Malaysia time (UTC+8).
  const malaysiaTime = new Date(
    now.getTime() + 8 * 60 * 60 * 1000
  );

  // Calculate Malaysia midnight, expressed in UTC.
  return new Date(
    Date.UTC(
      malaysiaTime.getUTCFullYear(),
      malaysiaTime.getUTCMonth(),
      malaysiaTime.getUTCDate()
    ) - 8 * 60 * 60 * 1000
  );
}

// ======================================================
// API HANDLER
// ======================================================

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Cache-Control', 'private, no-store');

  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed.',
    });
  }

  try {
    // --------------------------------------------------
    // 1. ENVIRONMENT VARIABLES
    // --------------------------------------------------

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
      console.error(
        'Missing analytics environment variables.'
      );

      return res.status(500).json({
        error: 'Analytics service is not configured.',
      });
    }

    // --------------------------------------------------
    // 2. AUTHENTICATION
    // --------------------------------------------------

    const authorization =
      req.headers.authorization;

    if (
      typeof authorization !== 'string' ||
      !authorization.startsWith('Bearer ')
    ) {
      return res.status(401).json({
        error: 'Authentication required.',
      });
    }

    const accessToken = authorization.slice(7).trim();

    if (!accessToken) {
      return res.status(401).json({
        error: 'Authentication required.',
      });
    }

    const userResponse = await fetch(
      `${supabaseUrl}/auth/v1/user`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userResponse.ok) {
      return res.status(401).json({
        error: 'Your session is invalid or expired.',
      });
    }

    const user = await userResponse.json();

    if (!user?.id) {
      return res.status(401).json({
        error: 'Could not identify authenticated user.',
      });
    }

    // --------------------------------------------------
    // 3. ADMINISTRATOR VERIFICATION
    // --------------------------------------------------

    const profileUrl = new URL(
      `${supabaseUrl}/rest/v1/admin_profiles`
    );

    profileUrl.searchParams.set(
      'id',
      `eq.${user.id}`
    );

    profileUrl.searchParams.set(
      'role',
      'eq.admin'
    );

    profileUrl.searchParams.set(
      'select',
      'id'
    );

    const profileResponse = await fetch(profileUrl, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!profileResponse.ok) {
      console.error(
        'Administrator profile verification failed:',
        profileResponse.status
      );

      return res.status(403).json({
        error: 'Could not verify administrator access.',
      });
    }

    const profiles = await profileResponse.json();

    if (
      !Array.isArray(profiles) ||
      profiles.length === 0
    ) {
      return res.status(403).json({
        error: 'Administrator access required.',
      });
    }

    // --------------------------------------------------
    // 4. DATE RANGES
    // --------------------------------------------------

    const now = new Date();

    // Rolling 30-day reporting period.
    const since = new Date(
      now.getTime() - 29 * 24 * 60 * 60 * 1000
    );

    // Malaysia-local start of today.
    const today = getMalaysiaMidnightUTC();

    const commonParams = {
      projectId,
      since: since.toISOString(),
      until: now.toISOString(),
    };

    // --------------------------------------------------
    // 5. FETCH VERCEL ANALYTICS
    // --------------------------------------------------

    const [
      totals,
      todayTotals,
      dailyTraffic,
      topPages,
      topReferrers,
    ] = await Promise.all([
      // Total visitors and page views.
      vercelQuery<AnalyticsCount>(
        'visits/count',
        commonParams,
        vercelToken
      ),

      // Today's visitors and page views.
      vercelQuery<AnalyticsCount>(
        'visits/count',
        {
          projectId,
          since: today.toISOString(),
          until: now.toISOString(),
        },
        vercelToken
      ),

      // Daily visitor activity.
      vercelQuery<AnalyticsRow[]>(
        'visits/aggregate',
        {
          ...commonParams,
          by: 'day',
          limit: '30',
        },
        vercelToken
      ),

      // Most visited pages.
      vercelQuery<AnalyticsRow[]>(
        'visits/aggregate',
        {
          ...commonParams,
          by: 'requestPath',
          limit: '5',
        },
        vercelToken
      ),

      // Top referral sources.
      vercelQuery<AnalyticsRow[]>(
        'visits/aggregate',
        {
          ...commonParams,
          by: 'referrerHostname',
          limit: '5',
        },
        vercelToken
      ),
    ]);

    // --------------------------------------------------
    // 6. RETURN RESULTS
    // --------------------------------------------------

    return res.status(200).json({
      period: 'Last 30 days',

      totals: {
        visitors: totals?.visitors ?? 0,
        pageviews: totals?.pageviews ?? 0,
      },

      today: {
        visitors: todayTotals?.visitors ?? 0,
        pageviews: todayTotals?.pageviews ?? 0,
      },

      dailyTraffic: dailyTraffic ?? [],

      topPages: topPages ?? [],

      topReferrers: topReferrers ?? [],

      updatedAt: now.toISOString(),
    });

  } catch (error) {
    console.error(
      'Analytics endpoint error:',
      error
    );

    return res.status(500).json({
      error: 'Unable to retrieve website analytics.',
    });
  }
}