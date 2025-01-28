import { Hero } from '@/components/home/Hero'
import { ShortLongUrl } from '@/components/home/ShortLongUrl'
import { Products } from '@/components/home/Products'
import { FAQ } from '@/components/home/FAQ'
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel'

export default function Home() {
  return (
    <main>
      <Hero />
      <ShortLongUrl />
      <Products />
      <div className="my-16">
        <TestimonialCarousel />
      </div>
      <div className="my-16">
        <FAQ />
      </div>
    </main>
  )
}
