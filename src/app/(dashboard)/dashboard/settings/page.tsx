"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDownIcon } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/models/User";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Component() {

  const { toast } = useToast()
  
  const router = useRouter()

  const { data: session } = useSession();

  const { username } = session?.user as User || { username: '' };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isMinimized, toggle } = useSidebar();

  useEffect(() => {
    if (!isMinimized) {
      toggle();
    }
  }, [isMinimized,toggle]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNameChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put("/api/v1/auth/update-name", {
        newName,
        username
      });
      toast({
        title: 'Success',
        description: response.data.message
      })
      router.replace('/dashboard/home')
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to save name',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);

    try {
      const response = await axios.delete("/api/v1/auth/delete-account", {
        data: { username }
      });
      toast({
        title: 'Success',
        description: response.data.message
      });
      router.replace('/');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete account',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden md:flex-row">
      <div
        className="md:hidden w-fit border rounded-full p-2 cursor-pointer bg-white"
        onClick={toggleSidebar}
      >
        <ChevronDownIcon size={24} />
      </div>
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <ScrollArea className="h-full">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change User Name</CardTitle>
                  <CardDescription>Update your display name.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNameChange}>
                    <Input
                      placeholder="New User Name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </form>
                </CardContent>
                <CardFooter className="border-t p-6">
                  <Button
                    type="submit"
                    onClick={handleNameChange}
                    disabled={isLoading || !newName.trim()}
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Delete Account</CardTitle>
                  <CardDescription>
                    Permanently delete your account.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
