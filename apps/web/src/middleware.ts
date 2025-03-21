import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./utils/auth/check-jwt";

// If user is logged in, redirect to home page
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth");

  if (token?.value) {
    const tokenPayload = await verifyToken(token.value);
    if (tokenPayload) return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/login"],
};
