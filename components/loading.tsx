import { Skeleton } from "./ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="space-y-2">
                <Skeleton className="h-6 w-[350px]" />
                <Skeleton className="h-6 w-[300px]" />
            </div>
        </div>
    )
}