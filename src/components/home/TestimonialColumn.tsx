"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Testimonial } from "./Testimonial"

interface TestimonialColumnProps {
  testimonials: Array<{
    content: string
    author: string
    role: string
    avatar: string
  }>
  direction: "up" | "down"
}

export function TestimonialColumn({ testimonials, direction }: TestimonialColumnProps) {
  const columnRef = useRef<HTMLDivElement>(null)
  const y = useMotionValue(0)
  const smoothY = useSpring(y, { damping: 60, stiffness: 300 })

  useEffect(() => {
    const column = columnRef.current
    if (!column) return

    const scrollHeight = column.scrollHeight
    y.set(direction === "down" ? 0 : -scrollHeight / 2)
  }, [direction, y])

  useAnimationFrame(() => {
    const column = columnRef.current
    if (!column) return

    const scrollHeight = column.scrollHeight
    const currentY = y.get()

    let newY
    if (direction === "down") {
      newY = currentY + 0.2
      if (newY >= 0) newY = -scrollHeight / 2
    } else {
      newY = currentY - 0.2
      if (newY <= -scrollHeight / 2) newY = 0
    }

    y.set(newY)
  })

  const translateY = useTransform(smoothY, (value) => `${value}px`)

  return (
    <div className="h-full overflow-hidden">
      <motion.div ref={columnRef} style={{ y: translateY }}>
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <Testimonial key={index} {...testimonial} />
        ))}
      </motion.div>
    </div>
  )
}

