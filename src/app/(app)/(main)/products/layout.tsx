import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | UrlHub',
};

export default function Layout({
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
