import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redirecting...',
  description: 'Redirecting...'
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
