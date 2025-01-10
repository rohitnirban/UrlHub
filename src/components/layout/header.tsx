import React from 'react';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur mt-2">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link href="/dashboard/home" className="flex items-center space-x-2">
            <Image src={'/logo-blue.svg'} alt='Logo' width={40} height={40} />
            <span className="text-3xl font-bold text-blue-700">UrlHub</span>
          </Link>
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
          {/* <ThemeToggle /> */}
        </div>
      </nav>
    </div>
  );
}
