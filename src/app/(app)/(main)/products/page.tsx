import { FAQ } from '@/components/home/FAQ'
import { Products } from '@/components/home/Products'
import React from 'react'

const page = () => {
    return (
        <div>
            <Products />
            <div className="my-16">
                <FAQ />
            </div>
        </div>
    )
}

export default page