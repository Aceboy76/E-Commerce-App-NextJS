import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Suspense } from "react";
import { Loading } from "../loading";


 function CustomerAdContent() {
    return (<>
        <div>
            <Carousel>
                <CarouselContent>
                    <CarouselItem>
                        <img src="https://placehold.co/1280x200" alt="Placeholder Image 1" />
                    </CarouselItem>
                    <CarouselItem>
                        <img src="https://placehold.co/1280x200" alt="Placeholder Image 2" />
                    </CarouselItem>
                    <CarouselItem>
                        <img src="https://placehold.co/1280x200" alt="Placeholder Image 2" />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

    </>)
}

export default function CustomerAdBanner() {
     return (
            <Suspense fallback={<Loading />}>
                <CustomerAdContent />
            </Suspense>
        );
 }
