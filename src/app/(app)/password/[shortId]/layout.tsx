import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Protected',
  description: 'The url you are trying to access is password protected',
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
