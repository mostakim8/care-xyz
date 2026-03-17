import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // কুকি থেকে টোকেন বা ইউজার সেশন চেক করা
  // আপনি যদি Firebase ব্যবহার করেন, তবে সেশন কুকি চেক করা ভালো
  // এখানে একটি সিম্পল উদাহরণ দেওয়া হলো:
  const session = request.cookies.get("session"); // অথবা আপনার অথ টোকেন নাম

  const { pathname } = request.nextUrl;

  
  const protectedPaths = ["/my-bookings", "/booking"];

  
  if (!session && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-bookings/:path*", "/booking/:path*"],
};
