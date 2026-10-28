// Optional Supabase Edge Function for sending contact form notifications with Resend.
// Configure RESEND_API_KEY and CONTACT_EMAIL as Supabase Function secrets before deploying.
// Never expose the Resend API key in VITE_ environment variables.

import { Resend } from 'npm:resend@4.8.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (request: Request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  const apiKey = Deno.env.get('RESEND_API_KEY');
  const contactEmail = Deno.env.get('CONTACT_EMAIL');
  if (!apiKey || !contactEmail) {
    return new Response(JSON.stringify({ error: 'Email notification is not configured yet.' }), { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  try {
    const payload = await request.json();
    const name = String(payload.name ?? '').trim().slice(0, 120);
    const email = String(payload.email ?? '').trim().slice(0, 320);
    const subject = String(payload.subject ?? 'Portfolio contact').trim().slice(0, 180) || 'Portfolio contact';
    const message = String(payload.message ?? '').trim().slice(0, 10000);
    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Please provide a valid name, email, and message.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: 'Portfolio contact <onboarding@resend.dev>',
      to: [contactEmail],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (result.error) throw new Error(result.error.message);
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to send notification.';
    return new Response(JSON.stringify({ error: message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
