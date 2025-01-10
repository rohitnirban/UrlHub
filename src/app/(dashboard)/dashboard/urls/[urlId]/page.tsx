"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  CalendarRangeIcon,
  ChevronLeftIcon,
  CopyIcon,
  Edit2Icon,
  Loader2,
  MoreHorizontal,
  TagIcon,
  Trash2,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EngagementChart } from "@/components/charts/EngagementChart";
import { HorizontalBar } from "@/components/charts/HorizontalBar";
import { BrowserPieChart } from "@/components/charts/BrowserPieChart";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ApiSingleLinkResponse, LinkData } from "@/types";
import axios from "axios";
import dayjs from "dayjs";
import { OsPieChart } from "@/components/charts/OsPieChart";
import { useToast } from "@/components/ui/use-toast";
import { ShareButton } from "@/components/ShareButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { urlId } = useParams() as { urlId: string };

  const [link, setLink] = useState<LinkData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrlId, setNewUrlId] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    const fetchLinks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<ApiSingleLinkResponse>(
          `/api/v1/url/get-single-user/${urlId}`
        );
        const fetchedLink = response.data.data;
        setLink(fetchedLink);
        setNewTitle(fetchedLink.title);
        setNewUrlId(fetchedLink.urlId);
        setTags(fetchedLink.tags.join(", ") || "");
      } catch (error: any) {
        console.error("Error fetching links:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, [urlId]);

  const handleCopy = (content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        toast({
          title: "Success",
          description: "Link copied to clipboard!",
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Failed to copy text!",
          variant: "destructive",
        });
        console.error("Failed to copy text: ", err);
      });
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedData = {
        newTitle,
        newUrlId,
        tags: tags,
      };
      const response = await axios.put(`/api/v1/url/edit-url/${urlId}`, updatedData);

      setLink((prev) =>
        prev
          ? { ...prev, title: newTitle, urlId: newUrlId, tags: tags.split(",") }
          : prev
      );
      console.log(response.data);
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Link details updated successfully!",
        });
        setIsEditDialogOpen(false);
        if (newUrlId !== urlId) {
          router.replace(`/dashboard/urls/${newUrlId}`);
        }
      }
    } catch (error: any) {
      console.error("Error updating link:", error);
      toast({
        title: "Error",
        description: `${error.response?.data?.message || 'Failed to update link!'} `,
        variant: "destructive",
      });
    }
  };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/v1/url/delete-url/${urlId}`);
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Link deleted successfully!",
        });
        router.replace(`/dashboard/urls`);
      }
    } catch (error: any) {
      console.error("Error deleting link:", error);
      toast({
        title: "Error",
        description: `${error.response?.data?.message || "Failed to delete link!"
          } `,
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 md:p-6 space-y-4 bg-gray-50">
        {/* Header */}
        <Link
          href={"/dashboard/urls"}
          className="flex items-center hover:underline"
        >
          <ChevronLeftIcon size={16} />
          <span className="ml-1">Back</span>
        </Link>

        <div className='bg-white p-4 rounded-lg shadow'>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-xl md:text-[1.7rem] font-extrabold">{link?.title}</h1>
              <div className='flex flex-col md:flex-row justify-center items-start md:items-center py-2 max-w-[70vw]'>
                <img src={link?.icon} alt='Favicon' className='hidden md:flex rounded-full border mb-2 md:mb-0 md:mr-4 flex-shrink-0 w-8 h-8' />
                <div className='flex flex-col justify-between items-start w-full min-w-0'>
                  <a href={link?.shortUrl} target="_blank" className="hover:underline text-blue-700 w-full text-sm md:text-base truncate">
                    {link?.shortUrl}
                  </a>
                  <a href={link?.originalUrl} target="_blank" className="hover:underline w-full text-sm md:text-base truncate">
                    {link?.originalUrl}
                  </a>
                </div>
              </div>
            </div>
            <div className="md:w-fit w-full md:justify-end justify-center flex flex-wrap gap-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="hover:bg-gray-100 p-2" onClick={() => handleCopy(link?.shortUrl || "")}>
                <CopyIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <ShareButton
                url={link?.shortUrl || ""}
                title={link?.title || ""}
              />
              <Button variant="outline" size="sm" className="hover:bg-gray-100 p-2" onClick={handleEdit}>
                <Edit2Icon className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>

              <Button variant="outline" size="sm" className="hover:bg-gray-100 p-2" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>

              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p>Are you sure you want to delete this URL? This action cannot be undone.</p>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDeleteDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

            </div>
          </div>
          <Separator className='my-2' />
          <div className='flex flex-col md:flex-row justify-start items-start md:items-center py-4'>
            <div className='flex justify-center items-center mb-2 md:mb-0'>
              <CalendarRangeIcon size={14} />
              <span className="ml-2">{dayjs(link?.createdAt).format('D MMM YYYY [at] HH:mm')}</span>
            </div>
            <div className='flex justify-center items-center md:ml-10'>
              <TagIcon size={14} />
              <span className='ml-2 text-xs md:text-sm'>No Tags</span>
            </div>
          </div>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Link Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>New Title</Label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div>
                <Label>New URL ID</Label>
                <Input
                  value={newUrlId}
                  onChange={(e) => setNewUrlId(e.target.value)}
                />
              </div>

              <div>
                <Label>Add Tags</Label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Analytics */}
        <EngagementChart clickDetails={link?.clickDetails || []} />
        <Card>
          <CardHeader>
            <CardTitle>Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="countries">
              <TabsList>
                <TabsTrigger value="countries">Countries</TabsTrigger>
              </TabsList>
              <TabsContent value="countries">
                <HorizontalBar clickDetails={link?.clickDetails || []} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BrowserPieChart clickDetails={link?.clickDetails || []} />
          <OsPieChart clickDetails={link?.clickDetails || []} />
        </div>
      </div>
    </ScrollArea >
  );
};

export default Page;
