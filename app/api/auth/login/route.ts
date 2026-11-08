import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    let isAuthenticated = false;
    let userEmail = email;

    // 1. Try Supabase Auth if configured
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (!error && data.session) {
          isAuthenticated = true;
          userEmail = data.user?.email || email;
        }
      } catch (authErr) {
        console.warn('Supabase auth attempt error:', authErr);
      }
    }

    // 2. Demo fallback authentication check
    const demoEmail = process.env.ADMIN_DEMO_EMAIL || 'admin@smart-tourism.lk';
    const demoPassword = process.env.ADMIN_DEMO_PASSWORD || 'CeylonTravel2026!';

    if (!isAuthenticated) {
      if (
        email.trim().toLowerCase() === demoEmail.trim().toLowerCase() &&
        password === demoPassword
      ) {
        isAuthenticated = true;
        userEmail = demoEmail;
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    // Create session token and cookie
    const token = Buffer.from(
      JSON.stringify({
        email: userEmail,
        role: 'admin',
        issuedAt: Date.now(),
      })
    ).toString('base64');

    const response = NextResponse.json({
      success: true,
      user: {
        email: userEmail,
        role: 'admin',
      },
    });

    response.cookies.set({
      name: 'admin_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { error: 'Internal server error during authentication' },
      { status: 500 }
    );
  }
}

