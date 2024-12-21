'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema"

const Page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { toast } = useToast();
    const router = useRouter();

    //zod implementation
    // infer is completly optional
    const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            identifier: '',
        }
    });


    const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post<ApiResponse>(`/api/v1/auth/send-password-reset-mail`, data);
            toast({
                title: 'Success',
                description: response.data.message
            })
            router.replace(`/login`);
        } catch (error) {
            console.error("Error in registration of user ", error);
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            toast({
                title: 'Failed to send email',
                description: errorMessage,
                variant: "destructive"
            })
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex mx-3 p-8 bg-white rounded-lg shadow-md space-x-0 md:space-x-8">
            <div className="">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Forgot Password
                    </h1>
                    <p className="mb-4">Send Password reset mail to regain access to your account</p>
                </div>
                <Form {...forgotPasswordForm}>
                    <form onSubmit={forgotPasswordForm.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="identifier"
                            control={forgotPasswordForm.control}
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

                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : 'Reset'}
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        Know your password?{' '}
                        <Link href={"/login"} className="text-blue-600 hover:text-blue-800">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Page