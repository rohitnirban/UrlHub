import { RecentFreeUrl } from "./page";

export function RecentFreeUrlActivites({ data }: { data: RecentFreeUrl[] }) {
    return (
        <div className="space-y-8">
            {data.map((freeUrl) => (
                <div key={freeUrl.shortUrl} className="flex items-center">
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{freeUrl.shortUrl}</p>
                        <p className="text-sm text-muted-foreground block max-w-[300px] md:max-w-[320px] lg:max-w-[325px] xl:max-w-[350px] truncate text-ellipsis overflow-hidden">
                            {freeUrl.originalUrl}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
