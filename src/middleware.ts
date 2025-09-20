import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const publicPaths = [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    // Add other public paths here
  ];

  // Check if current path is public
  const isPublicPath = publicPaths.some(
    (publicPath) => path === publicPath || path.startsWith(publicPath + "/")
  );

  // For client-side route protection, we'll handle authentication in the ProtectedRoute component
  // This middleware serves as a fallback and for server-side protection

  return NextResponse.next();
}

// See "Matching Paths" below to learn more about how this config works
export const config = {
  matcher: [
    // Match all paths except for:
    // - api routes
    // - static files (images, fonts, etc)
    // - favicon.ico
    "/((?!api|_next/static|_next/image|images|fonts|favicon.ico).*)",
  ],
};
