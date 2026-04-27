import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const allowedIps = process.env.ALLOWED_IPS?.split(",").map((ip) =>
    ip.trim()
  );

  if (!allowedIps || allowedIps.length === 0) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  if (!ip || !allowedIps.includes(ip)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
