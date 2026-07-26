import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Known AI crawlers, scrapers, and automated bot keywords
const BLOCKED_BOT_KEYWORDS = [
  'gptbot', 'chatgpt', 'claudebot', 'claude-web', 'googlebot', 'bingbot', 
  'ahrefsbot', 'semrushbot', 'rogerbot', 'mj12bot', 'yandexbot', 
  'baiduspider', 'ia_archiver', 'petalbot', 'ccbot', 'facebookexternalhit',
  'python-urllib', 'python-requests', 'headless', 'curl', 'wget'
];

export function middleware(request: NextRequest) {
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  
  // Check if User-Agent matches any blocked signatures
  const isBot = BLOCKED_BOT_KEYWORDS.some(bot => userAgent.includes(bot));
  
  if (isBot) {
    return new NextResponse(
      JSON.stringify({ error: "Access Denied: AI bots and automated crawlers are restricted from entering NEBULA." }),
      { 
        status: 403, 
        headers: { 'content-type': 'application/json' } 
      }
    );
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (local assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
