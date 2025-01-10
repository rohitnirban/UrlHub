import dbConnect from '@/lib/dbConnect';
import FreeUrlModel from '@/models/FreeUrl';
import UrlModel from '@/models/Url';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { shortId: string } }) {
  await dbConnect();

  const { shortId } = params;

  try {
    console.log("Short ID server ", shortId);
    
    // First, try to find a free URL
    const freeUrlEntry = await FreeUrlModel.findOne({ urlId: shortId });
    
    // If found in free URL database, return it
    if (freeUrlEntry) {
      return NextResponse.json(freeUrlEntry);
    }
    
    // If not found in free URL, try the premium URL database
    const urlEntry = await UrlModel.findOne({ urlId: shortId });

    if (urlEntry) {
      return NextResponse.json(urlEntry);
    }

    return NextResponse.json({ error: 'URL not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching URL data:', error);
    return NextResponse.json({ error: 'Error fetching URL data' }, { status: 500 });
  }
}
