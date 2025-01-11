import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why UrlHub | UrlHub',
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
