import { env } from 'cloudflare:workers';
import { topics } from '../../../lib/inquiry-security';
export async function POST(request: Request) {
 const headers = { 'Cache-Control': 'no-store' };
 const fail = (message: string, status = 400) => Response.json({ error: message }, { status, headers });
 const origin = request.headers.get('Origin');
 if (origin && origin !== new URL(request.url).origin) return fail('Request not allowed.', 403);
 if (!request.headers.get('Content-Type')?.includes('application/json')) return fail('Please submit the contact form.', 415);
 try {
  const raw = await request.text();
  if (raw.length > 16000) return fail('Your submission is too large.', 413);
  const data = JSON.parse(raw);
  const get = (key: string) => typeof data[key] === 'string' ? data[key].trim() : '';
  const id = get('id');
  if (!/^[0-9a-f-]{36}$/i.test(id)) return fail('Please refresh and try again.');
  const first = get('firstName'), last = get('lastName'), email = get('email'), phone = get('phone'), type = get('type'), question = get('question');
  if (!first || first.length > 100 || !last || last.length > 100 || !email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !phone || phone.length > 40 || !topics.includes(type) || !question || question.length > 2500) return fail('Please complete all fields with valid information. Your question must be 2,500 characters or fewer.');
  if (!env.DB) return fail('We could not save your query. Please try again shortly.', 503);
  await env.DB.prepare('INSERT INTO inquiries (id, submitted_at, first_name, last_name, email, phone, query_type, question) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING').bind(id, new Date().toISOString(), first, last, email, phone, type, question).run();
  return Response.json({ ok: true }, { status: 201, headers });
 } catch {
  return fail('We could not save your query. Please try again.', 500);
 }
}
