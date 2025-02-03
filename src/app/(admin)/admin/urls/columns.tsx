"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import dayjs from "dayjs"
import { useRouter } from "next/navigation"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Url = {
    _id: string
    originalUrl: string
    urlId: string
    isUrlExpiry: true | false
    urlExpiry: string
    isPasswordProtected: true | false
    totalClicks: number
    createdAt: Date
}

const useRouterInCell = () => {
    return useRouter();
};

const ActionsCell = ({ row }: { row: { original: Url } }) => {
    const router = useRouterInCell(); // Use custom hook here
    const url = row.original;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(url._id)}
                >
                    Copy Url ID
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => router.push(`/admin/urls/${url.urlId}`)}
                >
                    View Url details
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const columns: ColumnDef<Url>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "urlId",
        header: "Url ID",
    },
    {
        accessorKey: "originalUrl",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Original Url
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <span
                className="block max-w-[300px] truncate text-ellipsis overflow-hidden"
                title={row.original.originalUrl} // Tooltip for full URL
            >
                {row.original.originalUrl}
            </span>
        ),
    },
    {
        accessorKey: "urlExpiry",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Url Expiry
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            if (!row.original.isUrlExpiry) {
                const expiryDate = dayjs(row.original.urlExpiry);
                const now = dayjs();
                const yearsRemaining = expiryDate.diff(now, 'year');
                const monthsRemaining = expiryDate.diff(now, 'month') % 12;
                const weeksRemaining = expiryDate.diff(now, 'week') % 4;
                const daysRemaining = expiryDate.diff(now, 'day') % 7;

                let remainingTime = '';
                if (yearsRemaining > 0) {
                    remainingTime = `${yearsRemaining} Year${yearsRemaining > 1 ? 's' : ''} Remaining`;
                } else if (monthsRemaining > 0) {
                    remainingTime = `${monthsRemaining} Month${monthsRemaining > 1 ? 's' : ''} Remaining`;
                } else if (weeksRemaining > 0) {
                    remainingTime = `${weeksRemaining} Week${weeksRemaining > 1 ? 's' : ''} Remaining`;
                } else if (daysRemaining > 0) {
                    remainingTime = `${daysRemaining} Day${daysRemaining > 1 ? 's' : ''} Remaining`;
                } else {
                    remainingTime = 'Expired';
                }

                return (
                    <span>
                        {remainingTime}
                    </span>
                );
            } else {
                return (
                    <span>
                        Never
                    </span>
                );
            }
        }
    },
    {
        accessorKey: "totalClicks",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Clicks
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "isPasswordProtected",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Password Protected
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.isPasswordProtected === true ? "Yes" : "No"}
                </span>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const createdAt = dayjs(row.original.createdAt).format('MM-DD-YYYY [at] HH:mm');
            return (
                <span>
                    {createdAt}
                </span>
            );
        },
    },
    {
        id: "actions",
        cell: ActionsCell, // Use ActionsCell component here
    },
]
