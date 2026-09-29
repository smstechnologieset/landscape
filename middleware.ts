import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const LOCALE_COOKIE = "ls_locale";
const ADMIN_COOKIE = "ls_admin_session";

/**
 * - Refreshes Supabase auth session cookies if configured.
 * - Protects /admin/*: checks ls_admin_session cookie or Supabase user.
 * - Unauthenticated users are redirected to /admin/login.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const path = request.nextUrl.pathname;

  let hasAdminSession = request.cookies.has(ADMIN_COOKIE);

  // If Supabase is configured, also check Supabase auth
  if (
    !hasAdminSession &&
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
              cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
              response = NextResponse.next({ request });
              cookiesToSet.forEach(({ name, value, options }) =>
                response.cookies.set(name, value, options)
              );
            }
          }
        }
      );
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) {
        hasAdminSession = true;
      }
    } catch {
      // Supabase connection skipped
    }
  }

  // If already logged in and visiting login page, redirect to dashboard
  if (path === "/admin/login" && hasAdminSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  // Protect admin routes
  if (path.startsWith("/admin") && !path.startsWith("/admin/login") && !hasAdminSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Default locale cookie for first-time visitors
  if (!request.cookies.has(LOCALE_COOKIE)) {
    response.cookies.set(LOCALE_COOKIE, "en", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax"
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)"]
};
