import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function CustomerAdBanner() {
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