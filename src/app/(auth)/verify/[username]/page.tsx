"use client";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { verifySchema } from '@/schemas/verifySchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const Page = () => {
    const router = useRouter();
    const param = useParams<{ username: string }>();
    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const verifyForm = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
    });


    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post<ApiResponse>(`/api/v1/auth/verify-code`, {
                username: param.username,
                code: data.verifyCode,
            });
            setIsSubmitting(false);

            toast({
                title: 'Success',
                description: response.data.message,
            });

            router.replace('/login');
        } catch (error) {
            setIsSubmitting(false);
            console.error("Error in verification", error);
            const axiosError = error as AxiosError<ApiResponse>;

            toast({
                title: "Verification failed",
                description: axiosError.response?.data.message,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Verify your account
                    </h1>
                    <p className="mb-4">We sent an OTP to your registered email for verification.</p>
                </div>
                <Form {...verifyForm}>
                    <form onSubmit={verifyForm.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="verifyCode"
                            control={verifyForm.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="123456"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full' disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : 'Submit'}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Page;
