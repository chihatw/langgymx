import { NextResponse } from 'next/server';
import { auth } from './auth';

const HOME_PAGE = '/';
const LOGIN_PAGE = '/login';
const SIGNUP_PAGE = '/signup';
const USER_PAGE = ['/lisan', '/kousan', '/'];

export default auth((req: any) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user;

  // ログインしていない、かつユーザーページでもない場合は、　ログインページを返す
  if (!user && ![LOGIN_PAGE, SIGNUP_PAGE, ...USER_PAGE].includes(pathname)) {
    return NextResponse.redirect(new URL(LOGIN_PAGE, req.url));
  }

  // ログインしている、かつログインページまたはサインアップページの場合は、　ホームページを返す
  if (!!user && [LOGIN_PAGE, SIGNUP_PAGE].includes(pathname)) {
    return NextResponse.redirect(new URL(HOME_PAGE, req.url));
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
