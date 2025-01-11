import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Url Expired',
  description: 'The url you are trying to access has expired',
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
