'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema"

const Page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const { toast } = useToast();
    const router = useRouter();

    //zod implementation
    // infer is completly optional
    const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
        }
    });


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');
        console.log(tokenParam);
        setToken(tokenParam);

    }, []);

    const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
        setIsSubmitting(true);
        try {
            if(token === null) {
                toast({
                    title: 'Token not found',
                    description: 'Token is required to reset password',
                    variant: "destructive"
                })
            }
            const response = await axios.post<ApiResponse>(`/api/v1/auth/reset-password/${token}`, data);
            toast({
                title: 'Success',
                description: response.data.message
            })
            router.replace(`/login`);
        } catch (error:any) {
            console.error("Error in resetting password ", error);
            if (axios.isAxiosError(error) && error.response) {
                toast({
                    title: 'Error',
                    description: error.response.data.message,
                    variant: "destructive"
                })
            } else {
                toast({
                    title: 'Error',
                    description: error.message,
                    variant: "destructive"
                })
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex mx-3 p-8 bg-white rounded-lg shadow-md space-x-0 md:space-x-8">
            <div className="">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Reset Password
                    </h1>
                    <p className="mb-4">Reset your password to regain access to your account</p>
                </div>
                <Form {...resetPasswordForm}>
                    <form onSubmit={resetPasswordForm.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="password"
                            control={resetPasswordForm.control}
                            render={({ field }) => {
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
            </div>
        </div>
    )
}

export default Page