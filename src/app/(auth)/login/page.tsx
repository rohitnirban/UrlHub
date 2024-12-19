"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/schemas/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const Page = () => {
    const router = useRouter();
    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const signInForm = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: '',
            password: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        setIsSubmitting(true)
        const result = await signIn('credentials', {
            redirect: false,
            identifier: data.identifier,
            password: data.password
        })

        if (result?.error) {
            if (result.error === 'CredentialsSignin') {
                toast({
                    title: 'Login Failed',
                    description: 'Incorrect username or password',
                    variant: 'destructive',
                });
            } else {
                toast({
                    title: 'Error',
                    description: result.error,
                    variant: 'destructive',
                });
            }
        }
        setIsSubmitting(false)

        console.log(result);
        if (result?.url) {
            router.replace('/dashboard/home')
        }
    }

    return (
        <div className="flex w-[95%] max-w-4xl p-8 bg-white rounded-lg shadow-md space-x-0 md:space-x-8">
            {/* Left Section: GIF */}
            <div className="w-1/2 hidden md:flex justify-center items-center">
                <img
                    src="/login.png" // Replace with your GIF path
                    alt="Link Shortening and QR Code Generation"
                    className="max-w-full h-auto rounded-lg"
                />
            </div>
            {/* Right Section: Login Form */}
            <div className="w-full md:w-1/2">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Welcome 👋
                    </h1>
                    <p className="mb-4">Login to continue your adventure</p>
                </div>
                <Form {...signInForm}>
                    <form onSubmit={signInForm.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="identifier"
                            control={signInForm.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username/Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="example@domain.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            control={signInForm.control}
                            render={({ field }) => {
                                const [showPassword, setShowPassword] = useState(false);
                                return <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="********"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5 text-gray-500" />
                                                ) : (
                                                    <Eye className="h-5 w-5 text-gray-500" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }}
                        />
                        <Button type="submit" disabled={isSubmitting} className='w-full'>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : 'Login'}
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        Not a member?{' '}
                        <Link href={"/register"} className="text-blue-600 hover:text-blue-800">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Page