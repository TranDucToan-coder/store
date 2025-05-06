import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token");
    const role = req.cookies.get("role")?.value;
    if (!token) {
        console.log("Redirecting to /");
        return NextResponse.redirect(new URL("/", req.url));
    }
    else {
        const url = req.nextUrl.pathname;
        if (role != "customer" && url.includes("/User")) {
            return NextResponse.redirect(new URL("/User", req.url))
        }
         else if (role != "staff" && role != "manager" && url.includes("/Admin")) {
            return NextResponse.redirect(new URL("/Admin", req.url))
        }
    }
    return NextResponse.next();
}
export const config = {
    matcher: ['/User/:path*', '/Admin/:path*'],
};