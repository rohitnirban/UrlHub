import dbConnect from '@/lib/dbConnect';
import FreeUrlModel from '@/models/FreeUrl';
import UrlModel from '@/models/Url';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { shortId: string } }) {
  await dbConnect();

  const { shortId } = params;

  try {
    const urlEntry = await UrlModel.findOne({ urlId: shortId });
    const freeUrlEntry = await FreeUrlModel.findOne({ urlId: shortId });

    if (!urlEntry || !freeUrlEntry) {
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });
    }

    if (urlEntry) {
      return NextResponse.json(urlEntry);
    }

    if (freeUrlEntry) {
      return NextResponse.json(freeUrlEntry);
    }

  } catch (error) {
    console.error('Error fetching URL data:', error);
    return NextResponse.json({ error: 'Error fetching URL data' }, { status: 500 });
  }
}
