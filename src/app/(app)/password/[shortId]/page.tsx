'use client'

import { Shield, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import bcrypt from 'bcryptjs'

const Page = () => {
    const router = useRouter();
    const param = useParams<{ shortId: string }>();
    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const [dbPassword, setDbPassword] = useState('')
    const [originalUrl, setOriginalUrl] = useState('')

    useEffect(() => {
        const getPasswordFromDb = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/url/${param.shortId}`);
            const urlData = response.data;
            setDbPassword(urlData.password)
            setOriginalUrl(urlData.originalUrl)
        }
        getPasswordFromDb()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const isMatch = await bcrypt.compare(password, dbPassword);
            if (isMatch) {
                toast({
                    title: "Success",
                    description: "Redirecting to the original URL",
                })
                const ipResponse = await axios.get(
                    `https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`
                );
                const ipAddress = ipResponse.data.ip;

                await axios.post(
                    '/api/v1/url/update-statistics',
                    {
                        ipAddress,
                        userAgent: navigator.userAgent,
                        urlId: param.shortId,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                router.push(originalUrl)
            } else {
                setIsSubmitting(false)
                toast({
                    title: "Incorrect Password",
                    description: "Please enter the correct password",
                    variant: "destructive"
                })
            }
        } catch (error) {
            setIsSubmitting(false);
            console.error("Error in verification", error);
            toast({
                title: "Verification failed",
                description: "Error in verification",
                variant: "destructive"
            })

        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <Shield className="w-24 h-24 text-indigo-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Password Protected</h1>
                    <p className="text-center text-gray-600 mb-6">
                        This URL is password protected. Please enter the password to access the content.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Submit'}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Page

