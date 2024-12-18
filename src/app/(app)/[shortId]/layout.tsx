import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UrlHub Short URL',
  description: 'This is a short URL service',
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
