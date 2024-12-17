import { Footer } from '@/components/home/Footer';
import { Navbar } from '@/components/home/Navbar';


export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="min-h-screen bg-background font-sans antialiased">
                <Navbar />
                {children}
                <Footer />
            </div>
        </>
    );
}
