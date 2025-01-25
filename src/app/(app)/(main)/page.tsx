import { Hero } from '@/components/home/Hero'
import { ShortLongUrl } from '@/components/home/ShortLongUrl'
import { Products } from '@/components/home/Products'
import { FAQ } from '@/components/home/FAQ'
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel'
// import { AuroraBackground } from '@/components/ui/aurora-background'

export default function Home() {
  return (
    <main>
      {/* <AuroraBackground> */}
        <Hero />
      {/* </AuroraBackground> */}
      <ShortLongUrl />
      <div className="mt-16">
        <Products />
      </div>
      <div className="my-16">
        <TestimonialCarousel />
      </div>
      <div className="my-16">
        <FAQ />
      </div>
    </main>
  )
}
