'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PhoneIcon as Whatsapp, Send, Twitter, Linkedin, Link2, Share } from 'lucide-react'

interface ShareButtonProps {
    url: string
    title: string
}

export function ShareButton({ url, title }: ShareButtonProps) {
    const [isOpen, setIsOpen] = useState(false)

    const shareApps = [
        { name: 'WhatsApp', icon: Whatsapp, color: 'bg-green-500', shareUrl: `https://wa.me/?text=${encodeURIComponent(title + ' ' + 'Here is your short url ' + url)}` },
        { name: 'Telegram', icon: Send, color: 'bg-blue-500', shareUrl: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + ' ' + 'Here is your short url')}` },
        { name: 'Twitter', icon: Twitter, color: 'bg-sky-500', shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title + ' ' + 'Here is your short url')}&url=${encodeURIComponent(url)}` },
        { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700', shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title + ' ' + 'Here is your short url')}` },
    ]

    const handleShare = async (app: typeof shareApps[0]) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    url: url
                })
            } catch (error) {
                console.error('Error sharing:', error)
            }
        } else {
            window.open(app.shareUrl, '_blank')
        }
        setIsOpen(false)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="hover:bg-gray-100 p-2">
                    <Share className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share this content</DialogTitle>
                </DialogHeader>
                <div className="flex justify-around py-4">
                    {shareApps.map((app) => (
                        <Button
                            key={app.name}
                            variant="outline"
                            size="icon"
                            className={`rounded-full p-2 ${app.color}`}
                            onClick={() => handleShare(app)}
                        >
                            <app.icon className="h-5 w-5 text-white" />
                            <span className="sr-only">Share on {app.name}</span>
                        </Button>
                    ))}
                </div>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Button variant="outline" onClick={copyToClipboard}>
                            <Link2 className="mr-2 h-4 w-4" /> Copy Link
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

