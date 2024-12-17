import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const products = [
  {
    name: 'Short Url',
    description: 'Best for getting more clicks with tracking',
    features: ['URL Shortening', 'Custom URLs', 'Fast Redirect', 'Advanced analytics & tracking'],
    status: 'Get started',
    link: '/dashboard/create'
  },
  {
    name: 'QR Code',
    description: 'Generate your own QR and gain insights',
    features: ['Generate QR Code', 'Customized QR', 'Fast Redirect', 'Advanced analytics & tracking'],
    status: 'Coming Soon',
    link: '/dashboard/create'
  },
]

export function Products() {
  return (
    <div className="container mx-auto px-6 py-8 md:py-16">
      <h2 className="text-center font-extrabold text-4xl md:text-5xl tracking-tight text-black mb-16">
        Products
      </h2>
      <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
        {products.map((product) => (
          <Card key={product.name} className="transform transition-all duration-300 w-full lg:min-w-96">
            <CardHeader className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-xl">
              <CardTitle className="text-2xl font-semibold text-gray-900">{product.name}</CardTitle>
              <CardDescription className="text-gray-700 mt-2">{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-800">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-6 bg-gray-50 rounded-b-xl">
              <Link href={product.link} className='w-full'>
                <Button
                  className="w-full py-3 text-lg font-semibold"
                  variant={product.status === 'Coming Soon' ? 'outline' : 'default'}
                  disabled={product.status === 'Coming Soon'}
                >
                  {product.status}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
