import { isOwner, privateHeaders } from '../../../lib/inquiry-security';
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
 return Response.json({ isOwner: isOwner(request) }, { headers: privateHeaders });
}
