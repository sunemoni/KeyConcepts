export const OWNER_EMAIL = 'sunemoni@gmail.com';
export function isOwner(request: Request) {
 return Boolean(request.headers.get('oai-authenticated-user-id')) && request.headers.get('oai-authenticated-user-email')?.trim().toLowerCase() === OWNER_EMAIL;
}
export const privateHeaders = { 'Cache-Control': 'private, no-store', 'Vary': 'Cookie, oai-authenticated-user-id, oai-authenticated-user-email' };
export const topics = ['New construction', 'Remodeling or renovation', 'Property Management', 'Existing project', 'Other question'];
export function csvCell(value: unknown) {
 let text = String(value ?? '');
 if (/^[\s]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text)) text = "'" + text;
 return '"' + text.replaceAll('"', '""') + '"';
}
