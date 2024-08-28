import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RoutesEnum } from "@/constants/routeEnums";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = getCookie("token", { cookies });

  if (token) {
    return NextResponse.redirect(new URL(RoutesEnum.LANDING_PAGE, request.url));
  }
}

export const config = {
  matcher: ["/login/:path*", "/register/:path*"],
};
