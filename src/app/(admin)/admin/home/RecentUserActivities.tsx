import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RecentUser } from './page';
import { getNameInitials } from '@/helpers/getNameInitials';

export function RecentUserActivites({ data }: { data: RecentUser[] }) {
    return (
        <div className="space-y-8">
            {data.map((user) => (
                <div key={user.username} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback>{getNameInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{user.username}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
