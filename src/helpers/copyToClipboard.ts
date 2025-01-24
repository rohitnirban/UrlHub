import { useToast } from "@/components/ui/use-toast";

const {toast} = useToast();

const copyToClipboard = (content: string) => {
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

export default copyToClipboard;