import Header from '@/components/layout/header';
import AdminSidebar from '@/components/layout/admin-sidebar';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Admin - UrlHub",
  description: "UrlHub",
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-hidden pt-16">{children}</main>
      </div>
    </>
  );
}
