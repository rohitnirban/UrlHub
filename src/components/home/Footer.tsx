import Link from 'next/link'
import { Separator } from '../ui/separator';

export function Footer() {

  const date = new Date();
  const latestYear = date.getFullYear()

  return (
    <footer className="bg-white">
      <Separator />
      <div className="bg-white py-8 w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center ">© {latestYear} <Link href="/" className="hover:underline">UrlHub</Link>. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-black  sm:mt-0">
          <li>
            <a href="/why-urlhub" className="hover:underline me-4 md:me-6">Why UrlHub?</a>
          </li>
          <li>
            <a href="/products" className="hover:underline me-4 md:me-6">Products</a>
          </li>
          <li>
            <a href="/pricing" className="hover:underline me-4 md:me-6">Pricing</a>
          </li>
        </ul>
      </div>
    </footer>

  )
}