'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <div className="relative overflow-hidden ">
      <div
        className="container relative z-10 py-24 text-center"
      >
        <h1 className="text-5xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">
            The Ultimate Solution
          </span>
          <br />
          For Your Online Presence
        </h1>
        <p className="mx-auto mt-6 max-w-[600px] text-lg  md:text-xl">
          Create a short link that tracks and redirects your followers to all your social media profiles, websites, and online stores.
        </p>
        <div className='mt-6'>
          <Link href={'/register'}>
            <Button>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}