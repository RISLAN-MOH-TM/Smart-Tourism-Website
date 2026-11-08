import { NextRequest, NextResponse } from 'next/server';
import { updateEnquiryStatus } from '@/lib/enquiries';
import { EnquiryStatus } from '@/lib/types';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    const validStatuses: EnquiryStatus[] = ['New', 'Contacted', 'Closed'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be New, Contacted, or Closed' },
        { status: 400 }
      );
    }

    const updated = await updateEnquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { error: 'Enquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (err) {
    console.error('Failed to update enquiry status:', err);
    return NextResponse.json(
      { error: 'Failed to update enquiry status' },
      { status: 500 }
    );
  }
}

