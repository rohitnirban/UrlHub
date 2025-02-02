import { RecentUrl } from "./page";

export function RecentUrlActivites({ data }: { data: RecentUrl[] }) {
    return (
        <div className="space-y-8">
            {data.map((url) => (
                <div key={url.shortUrl} className="flex items-center">
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{url.shortUrl}</p>
                        <p className="text-sm text-muted-foreground block max-w-[200px] md:max-w-[250px] lg:max-w-[275px] xl:max-w-[300px] truncate text-ellipsis overflow-hidden">
                            {url.originalUrl}
                        </p>
                    </div>
                    <div className="ml-auto font-medium">{url.totalClicks}</div>
                </div>
            ))}
        </div>
    );
}
