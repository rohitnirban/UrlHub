'use client'

import { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ClipboardCopy, Loader2 } from 'lucide-react'
import { useToast } from '../ui/use-toast'
import Link from 'next/link'

export function ShortLongUrl() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { toast } = useToast();

  const handleShortenUrl = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!longUrl) {
      setError('Please enter a valid URL.')
      return
    }
    setLoading(true)
    setError('')
    setShortUrl('')

    try {
      const response = await axios.post('/api/v1/url/create-without-account', {
        originalUrl: longUrl
      })

      setShortUrl(response.data.data) // Assuming the API returns the short URL in `data.shortUrl`

    } catch (err: any) {
      setError(err.response?.data?.message || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    toast({
      title: 'Success',
      description: 'URL Copied successfully'
    })
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-8">
          Shorten Your <span className="text-blue-600">Long</span> Link
        </h2>

        <div className="max-w-3xl mx-auto bg-white rounded-lg p-8 space-y-6">
          <form onSubmit={handleShortenUrl} className="space-y-4">
            <Input
              type="url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Paste a long URL here"
              className="text-lg"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                'Generate Short URL'
              )}
            </Button>
          </form>

          {shortUrl && (
            <Card className="bg-gray-100 p-4 text-center">
              <CardHeader className="mb-2">
                <p className="font-bold">Shortened URL</p>
              </CardHeader>
              <CardContent className="flex justify-center items-center">
                <Link target='_blank' href={shortUrl} className="text-blue-600 underline">{shortUrl}</Link>
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                  <ClipboardCopy className="h-5 w-5 ml-2 text-blue-600" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
