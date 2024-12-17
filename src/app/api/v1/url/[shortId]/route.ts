import dbConnect from '@/lib/dbConnect';
import UrlModel from '@/models/Url';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { shortId: string } }) {
  await dbConnect();

  const { shortId } = params;

  try {
    const urlEntry = await UrlModel.findOne({ urlId: shortId });

    if (!urlEntry) {
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }

    return NextResponse.json(urlEntry);
  } catch (error) {
    console.error('Error fetching URL data:', error);
    return NextResponse.json({ error: 'Error fetching URL data' }, { status: 500 });
  }
}
