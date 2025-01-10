// components/Navbar.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function Navbar() {
  return (
    <nav className="border-b px-4 py-2">
      <div className=" flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={'/logo-blue.svg'} alt='Logo' width={40} height={40} />
          <span className="text-3xl font-bold text-blue-700">UrlHub</span>
        </Link>
        <div className="hidden md:flex space-x-8">
          <Link href="/why-urlhub" className="font-medium transition-colors hover:text-primary">
            Why urlHub?
          </Link>
          <Link href="/products" className="font-medium transition-colors hover:text-primary">
            Products
          </Link>
          <Link href="/pricing" className="font-medium transition-colors hover:text-primary">
            Pricing
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Link href={'/login'}>Login</Link>
          </Button>
          <Button>
            <Link href={'/register'}>Register</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}