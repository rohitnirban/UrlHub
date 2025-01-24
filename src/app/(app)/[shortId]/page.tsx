import ShortUrlRedirect from './ShortUrlRedirect';
import { Metadata } from 'next';
import axios from 'axios';

interface Props {
  params: {
    shortId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const shortId = params.shortId;

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/url/${shortId}`);
    const urlData = response.data;

    return {
      title: urlData?.title || 'Redirecting...',
      description: urlData?.metaDescription || '',
      icons: { icon: urlData?.metaImageUrl || '' },
      openGraph: {
        title: urlData?.title || '',
        description: urlData?.metaDescription || '',
        images: urlData?.metaImageUrl || '',
        url: urlData?.shortUrl || '',
      },
      twitter: {
        card: 'summary_large_image',
        title: urlData?.title || '',
        description: urlData?.metaDescription || '',
        images: urlData?.metaImageUrl || '',
      },
    };
  } catch (error) {
    // console.error('Error generating metadata:', error);
    return {
      title: 'Error',
      description: 'Failed to fetch URL data.',
    };
  }
}

export default function Page({ params }: Props) {
  return <ShortUrlRedirect params={params} />;
}
