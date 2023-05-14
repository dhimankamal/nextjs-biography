import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let token = request.cookies.get("token")?.value;
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (token) {
      
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
}
