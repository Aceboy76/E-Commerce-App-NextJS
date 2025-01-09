import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Loading } from "../loading";

 function HomepageProductContent() {
    const cardnum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    return (
        <>
            <div className="flex flex-wrap gap-5 justify-center">
                {cardnum.map(key => (
                    <Card className="text-center  " key={key}>
                        <CardContent className="p-2">
                            <img src="https://placehold.co/150" alt="Placeholder Image 1" />
                            <div className="break-words  max-w-[150px]">
                                asas asasa asas asasaasas
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default function HomepageProductShowcase() {
 return (
        <Suspense fallback={<Loading />}>
            <HomepageProductContent />
        </Suspense>
    );
}
