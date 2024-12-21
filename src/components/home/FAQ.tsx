// components/FAQ.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  { question: "What is a URL shortener?", answer: "A URL shortener is a tool that creates a short, unique URL that will redirect to a specific webpage when accessed." },
  { question: "Why to short a URL?", answer: "Shortening URLs makes them easier to share, remember, and track. It's especially useful for social media posts with character limits." },
  { question: "What is a custom URL?", answer: "A custom URL allows you to create a personalized short link using words or phrases of your choice, rather than a randomly generated string of characters." },
  { question: "What is QR Code?", answer: "A QR (Quick Response) code is a type of matrix barcode that can be scanned using a smartphone camera to quickly access information or a website." },
  { question: "Why to customize a QR Code?", answer: "Customizing a QR code allows you to add your brand colors, logo, or other design elements, making it more visually appealing and on-brand." },
  { question: "What is Bio Link?", answer: "A Bio Link is a single link that leads to a page containing multiple links to your various online profiles, websites, or content." },
  { question: "What is URLHub?", answer: "URLHub is a comprehensive online presence management tool that offers URL shortening, QR code generation, and Bio Link creation services." },
  { question: "Why you choose URLHub?", answer: "URLHub provides an all-in-one solution for managing your online presence, with features like custom URLs, analytics, and easy-to-use tools for creating short links, QR codes, and Bio Links." }
]

export function FAQ() {
  return (
    <div className="container w-full md:w-[65%] ">
      <h2 className="text-center font-extrabold text-4xl md:text-5xl tracking-tight text-black mb-8 md:mb-16">
        Frequently asked questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}