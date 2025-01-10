import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Link href={'/'}>
                <div className="absolute top-2 left-2 flex justify-center items-center hover:underline">
                    <ChevronLeftIcon className="h-5 w-5" />
                    <p className="">
                        Back
                    </p>
                </div>
            </Link>
            {children}
        </div>
    );
}
