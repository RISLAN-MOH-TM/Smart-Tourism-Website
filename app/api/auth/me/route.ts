import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get('admin_session');

  if (!sessionCookie || !sessionCookie.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString('utf-8')
    );

    if (decoded && decoded.email && decoded.role === 'admin') {
      return NextResponse.json({
        authenticated: true,
        user: {
          email: decoded.email,
          role: decoded.role,
        },
      });
    }
  } catch {
    // invalid token
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

