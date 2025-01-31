'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Zap, Lock, Clock, ArrowRight } from "lucide-react"
import { AuroraBackground } from '../ui/aurora-background';
import { HoverBorderGradient } from '../ui/hover-border-gradient';
import Link from 'next/link';

export function Hero() {
  return (
    <AuroraBackground>
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <div className="flex justify-center space-x-4">
              <HoverBorderGradient
                containerClassName="rounded-full bg-white"
                as="button"
                className="bg-blue-50 text-black flex items-center space-x-2"
              >
                <p className='text-sm inline-flex justify-center items-center'>
                  <span>More URL Features coming soon</span>
                  <ArrowRight className='ml-2' size={14} />
                </p>
              </HoverBorderGradient>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Shorten, Secure, and Share
              <span className="block text-blue-600">Your URLs with Ease</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-800">
              Create custom, secure, and time-sensitive short links in seconds. Perfect for professionals and businesses
              looking to optimize their online presence with the best URL shortener.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <FeatureItem icon={<Zap size={24} />} text="Custom back-half" />
              <FeatureItem icon={<Lock size={24} />} text="Password protection" />
              <FeatureItem icon={<Clock size={24} />} text="Expiry dates" />
            </div>
            <div className='mt-10 '>
              <Link href={'/dashboard/create'}>
                <Button
                  size="lg"
                  className="font-semibold text-lg px-8 py-6"
                >
                  Start Shortening Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AuroraBackground>
  )
}


function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  )
}