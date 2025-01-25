"use client"

import { motion } from "framer-motion"
import { TestimonialColumn } from "./TestimonialColumn"

const testimonials = [
  {
    content:
      "This platform has completely changed the way I share links. The custom back-half and password features are a game-changer!",
    author: "Prashant",
    role: "Web Developer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    content:
      "I love the ability to set expiry dates for links. It ensures my content is only available when I want it to be.",
    author: "Naveen",
    role: "Digital Marketer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    content:
      "The password protection feature is genius. Sharing confidential links has never been this secure.",
    author: "Kapish",
    role: "IT Specialist",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    content:
      "This tool makes creating custom short links so easy. The user interface is incredibly intuitive.",
    author: "Rohit Yadav",
    role: "Freelancer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    content:
      "The upcoming file-sharing feature is exactly what I need. Can&apos;t wait to use it for sharing documents with short URLs.",
    author: "Kapil Gangwar",
    role: "Business Owner",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    content:
      "The portfolio URL feature is a brilliant idea. Uploading a resume and building a portfolio in one place? Amazing!",
    author: "Ashit Rai",
    role: "Job Seeker",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    content:
      "This platform is perfect for managing links. The analytics features have provided incredible insights into my shared content.",
    author: "Sant Kumar Maurya",
    role: "Assistant Prof",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    content:
      "The ability to customize every link is what sets this tool apart. It&apos;s so easy to brand my links now!",
    author: "Gungun",
    role: "Entrepreneur",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    content:
      "The seamless experience of this tool has made it my go-to for shortening and sharing links.",
    author: "Aditya",
    role: "Software Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    content:
      "It&apos;s so much more than just a URL shortener. The added security and future features make it stand out from the rest.",
    author: "Arjit",
    role: "UI/UX Designer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    content:
      "I was impressed by how simple and efficient it is to manage multiple links with different expiration dates.",
    author: "Abhilaksh",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    content:
      "This tool is exactly what I needed to share secure and custom links for my projects. Highly recommended!",
    author: "Vishal",
    role: "Tech Enthusiast",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];



export function TestimonialCarousel() {
  const columnSize = Math.ceil(testimonials.length / 3)
  const columns = [
    testimonials.slice(0, columnSize),
    testimonials.slice(columnSize, columnSize * 2),
    testimonials.slice(columnSize * 2),
  ]

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-16">
       <h2 className="text-center font-extrabold text-4xl md:text-5xl tracking-tight text-black mb-16">
       Testimonials
      </h2>
      <div className="relative h-[600px] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
          <TestimonialColumn testimonials={columns[0]} direction="down" />
          <TestimonialColumn testimonials={columns[1]} direction="up" />
          <TestimonialColumn testimonials={columns[2]} direction="down" />
        </div>
      </div>
    </div>
  )
}

