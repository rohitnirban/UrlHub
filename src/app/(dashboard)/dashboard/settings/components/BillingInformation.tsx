import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from '@/components/ui/scroll-area';

const BillingAndUsage = () => {
    return (
        <ScrollArea className='h-full'>
            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 bg-gray-50">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Billing and usage
                    </h2>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Plan details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Free plan</h3>
                            <Button>Upgrade</Button>
                        </div>
                        <ul className="mt-4 space-y-2">
                            <li>✓ 50 bit.ly links per month</li>
                            <li>✓ QR Codes</li>
                            <li>✓ 1 landing page</li>
                            <li>✓ 0 complimentary custom domains</li>
                            <li>✓ 30 days of click and scan data</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Monthly usage */}
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly usage</CardTitle>
                        <p className="text-sm text-gray-500">Aug 1 - Aug 31</p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span>Short Links</span>
                                    <span>2 of 50 used</span>
                                </div>
                                <Progress value={4} />
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span>Custom back-halves</span>
                                    <span>0 of 50 used</span>
                                </div>
                                <Progress value={0} />
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span>Link redirects</span>
                                    <span>0 of 0 used</span>
                                </div>
                                <Progress value={0} />
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span>API Requests</span>
                                    <span>0 used</span>
                                </div>
                                <Progress value={0} />
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span>QR Codes</span>
                                    <span>0 used</span>
                                </div>
                                <Progress value={0} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Plan limits */}
                <Card>
                    <CardHeader>
                        <CardTitle>Plan limits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span>Bitly Pages</span>
                                <span>1 of 1 used</span>
                            </div>
                            <Progress value={100} />
                        </div>
                    </CardContent>
                </Card>

                {/* Billing details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Billing details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold mb-2">Payment method</h4>
                                <p>No card on file</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Upcoming plan charge</h4>
                                <p>No payment due</p>
                                <p>$0.00</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Billing history */}
                <Card>
                    <CardHeader>
                        <CardTitle>Billing history</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">You have not made any payments</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </ScrollArea>
    );
};

export default BillingAndUsage;