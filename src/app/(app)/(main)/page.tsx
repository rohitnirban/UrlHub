import { Hero } from '@/components/home/Hero'
import { ShortLongUrl } from '@/components/home/ShortLongUrl'
import { Products } from '@/components/home/Products'
import { FAQ } from '@/components/home/FAQ'
import SlidingTestimonial from '@/components/home/Testimonial'

export default function Home() {
  return (
    <main>
      <Hero />
      <ShortLongUrl />
      <div className="mt-16">
        <Products />
      </div>
      <div className="my-16">
        <SlidingTestimonial />
      </div>
      <div className="my-16">
        <FAQ />
      </div>
    </main>
  )
}
