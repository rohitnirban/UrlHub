'use client'

import { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ClipboardCopy, RefreshCcw } from 'lucide-react'
import { useToast } from '../ui/use-toast'
import { Switch } from '../ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from '../ui/separator'


export function ShortLongUrl() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [screenshotUrl, setScreenshotUrl] = useState('');

  const domain = process.env.NEXT_PUBLIC_SHORT_DOMAIN;

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!originalUrl) {
      setError('Please enter a valid URL.')
      return
    }

    const microlinkResponse = await axios.get(
      `https://api.microlink.io?url=${encodeURIComponent(originalUrl)}&screenshot=true&meta=false`
    );
    setScreenshotUrl(microlinkResponse.data.data.screenshot.url);

    setLoading(true)
    setError('')
    setShortUrl('')

    try {
      const response = await axios.post('/api/v1/url/create-without-account', {
        originalUrl
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
    <section className="bg-gray-50 pb-8">
      <h2 className="text-4xl font-extrabold text-center mb-8">
        Shorten Your <span className="text-blue-600">Long</span> Link
      </h2>
      <div>
        <div className="max-w-3xl md:max-w-5xl mx-auto p-6 mb-20">
          <div className="space-y-6">
            <div className='flex justify-center items-center'>
              <div className=' w-full h-full mx-4'>
                <div className='mb-4'>
                  <label className="block mb-2 font-medium">Destination</label>
                  <div className='flex justify-center items-center'>
                    <Input
                      placeholder="https://example.com/my-long-url"
                      value={originalUrl}
                      onChange={(e) => setOriginalUrl(e.target.value)}
                    />
                    <RefreshCcw className='ml-2 cursor-pointer' onClick={() => window.location.reload()} />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">You can create a short URL using your long URL</p>
                </div>
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 font-medium">Short link</label>
                      <div className="flex justify-center items-center">
                        <Select disabled>
                          <SelectTrigger>
                            <SelectValue placeholder={`${domain}`} />
                          </SelectTrigger>
                          <SelectContent >
                            <SelectItem value={`${domain}`}>{domain}</SelectItem>
                          </SelectContent>
                        </Select>

                        <TooltipProvider>
                          <Tooltip >
                            <TooltipTrigger className='w-full'>
                              <Input
                                placeholder="Custom back-half (optional)"
                                className="flex-grow"
                                disabled
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Please Login First to create password URL</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">You can create custom back-halves but login is required.</p>
                    </div>
                  </div>
                </div>
                <div className='mt-4'>
                  <h2 className="text-xl font-semibold mb-4">Password Protection</h2>
                  <div className="space-y-4 mt-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <label htmlFor="passwordToggle" className="toggle-label">Add password</label>
                        <div className="relative group">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Switch
                                  id="passwordToggle"
                                  checked={passwordProtected}
                                  onCheckedChange={setPasswordProtected}
                                  disabled
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Please Login First to create password URL</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className='hidden lg:block w-full mx-4'>
                <div className='bg-transparent  h-96 -mt-48'>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="84.965 240 100 125" enable-background="new 84.965 256.099 100 100" >
                    <switch>
                      <foreignObject requiredExtensions="http://ns.adobe.com/AdobeIllustrator/10.0/" x="0" y="0" width="1" height="1" />
                      <g>
                        <g>
                          <path d="M175.115,272.138H94.814c-2.486,0-4.51,2.022-4.51,4.509v53.98c0,2.486,2.023,4.509,4.51,4.509h80.301c2.486,0,4.51-2.022,4.51-4.509v-53.98C179.625,274.16,177.602,272.138,175.115,272.138z M178.625,330.627c0,1.935-1.574,3.509-3.51,3.509H94.814c-1.936,0-3.51-1.574-3.51-3.509v-53.98c0-1.935,1.574-3.509,3.51-3.509h80.301c1.936,0,3.51,1.574,3.51,3.509V330.627z" />
                          <path d="M175.115,274.66H94.814c-1.096,0-1.986,0.891-1.986,1.986v50.764c0,1.096,0.891,1.986,1.986,1.986h80.301c1.096,0,1.986-0.891,1.986-1.986v-50.764C177.102,275.551,176.211,274.66,175.115,274.66z M176.602,327.41c0,0.82-0.666,1.486-1.486,1.486H94.814c-0.82,0-1.486-0.666-1.486-1.486v-50.764c0-0.819,0.666-1.486,1.486-1.486h80.301c0.82,0,1.486,0.667,1.486,1.486V327.41z" />
                          <path d="M139.98,330.384h-10.031c-0.58,0-1.052,0.471-1.052,1.051v0.787c0,0.58,0.472,1.052,1.052,1.052h10.031c0.58,0,1.052-0.472,1.052-1.052v-0.787C141.032,330.854,140.561,330.384,139.98,330.384z M140.532,332.222c0,0.305-0.247,0.552-0.552,0.552h-10.031c-0.305,0-0.552-0.247-0.552-0.552v-0.787c0-0.304,0.247-0.551,0.552-0.551h10.031c0.305,0,0.552,0.247,0.552,0.551V332.222z" />
                        </g>
                      </g>
                    </switch>
                  </svg>
                </div>
                <div className='absolute -mt-[13.8rem] ml-[2.5rem]  z-100 '>
                  {screenshotUrl ? <img
                    src={screenshotUrl}
                    alt="Website Screenshot"
                    className="w-[23.5rem] h-60 rounded-lg shadow-lg"
                  /> : <div className='text-lg text-center ml-6 mt-[6.5rem]'>Enter Destination to see its preview here.</div>}
                </div>
              </div>
            </div>
            {shortUrl && (
              <div>
                <Separator />
                <div className="my-2 p-4 flex space-y-4 md:space-y-0 flex-col md:flex-row items-center justify-between">
                  <span className="text-xl font-bold">
                    Short URL
                  </span>
                  <span className="text-blue-600 font-medium">
                    {shortUrl}
                  </span>
                  <Button onClick={handleCopy} className="ml-4">
                    <ClipboardCopy className="mr-2" />
                    Copy
                  </Button>
                </div>
                <Separator />
              </div>
            )}
            <Button onClick={handleSubmit} type='submit' disabled={loading || !!shortUrl} className={`select-none w-full`}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>
      </div >
    </section >
  )
}
