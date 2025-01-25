import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  avatar: string;
}

export function Testimonial({ content, author, role, avatar }: TestimonialProps) {
  return (
    <Card className="w-full max-w-sm mx-auto mb-4">
      <CardContent className="p-4">
        <blockquote className="text-sm font-medium mb-2">&quot;{content}&quot;</blockquote>
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={avatar} alt={author} />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-sm">{author}</div>
            <div className="text-xs text-muted-foreground">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
