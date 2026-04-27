import { NextRequest, NextResponse } from "next/server";

const FORBIDDEN_HTML = `<!DOCTYPE html>
<html lang="en" style="height:100%">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Access Denied — StreamScout</title>
  <style>
    body {
      margin: 0;
      min-height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0b0f1a;
      color: #ededed;
      font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
    }
    .container {
      text-align: center;
      padding: 2rem;
      max-width: 420px;
    }
    .emoji {
      font-size: 3.5rem;
      margin-bottom: 1rem;
    }
    .title {
      font-size: 1.75rem;
      font-weight: 700;
      color: #fff;
      margin: 0 0 0.5rem;
      letter-spacing: -0.025em;
    }
    .code {
      font-size: 0.875rem;
      color: #6366f1;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    .message {
      color: #9ca3af;
      font-size: 1rem;
      line-height: 1.6;
      margin: 0;
    }
    .divider {
      width: 48px;
      height: 2px;
      background: linear-gradient(90deg, #6366f1, #8b5cf6);
      border: none;
      border-radius: 1px;
      margin: 1.5rem auto;
    }
    .brand {
      color: #4b5563;
      font-size: 0.75rem;
      margin-top: 2rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="emoji">🔒</div>
    <h1 class="title">Access Denied</h1>
    <div class="code">403 — Forbidden</div>
    <p class="message">
      You don&rsquo;t have permission to access StreamScout from this network.
      If you believe this is a mistake, please contact the site administrator.
    </p>
    <hr class="divider" />
    <div class="brand">🎬 StreamScout</div>
  </div>
</body>
</html>`;

function forbiddenResponse() {
  return new NextResponse(FORBIDDEN_HTML, {
    status: 403,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export function middleware(request: NextRequest) {
  const allowedIps = process.env.ALLOWED_IPS?.split(",").map((ip) =>
    ip.trim()
  );

  if (!allowedIps || allowedIps.length === 0) {
    return forbiddenResponse();
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  if (!ip || !allowedIps.includes(ip)) {
    return forbiddenResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
