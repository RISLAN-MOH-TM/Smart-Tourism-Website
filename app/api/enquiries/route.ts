import { NextRequest, NextResponse } from 'next/server';
import { getAllEnquiries, createEnquiry } from '@/lib/enquiries';

export async function GET() {
  try {
    const enquiries = await getAllEnquiries();
    return NextResponse.json({ enquiries });
  } catch (err) {
    console.error('Failed to get enquiries:', err);
    return NextResponse.json(
      { error: 'Failed to retrieve enquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, destination, message, phone, travel_date, guests } = body;

    // Validate required fields
    if (!name || !email || !destination || !message) {
      return NextResponse.json(
        { error: 'Name, email, destination, and message are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const newEnquiry = await createEnquiry({
      name: name.trim(),
      email: email.trim(),
      destination: destination.trim(),
      message: message.trim(),
      phone: phone ? phone.trim() : undefined,
      travel_date: travel_date || undefined,
      guests: guests ? Number(guests) : 1,
    });

    return NextResponse.json({ success: true, enquiry: newEnquiry }, { status: 201 });
  } catch (err) {
    console.error('Failed to create enquiry:', err);
    return NextResponse.json(
      { error: 'Failed to process enquiry' },
      { status: 500 }
    );
  }
}

