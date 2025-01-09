import { SellerSideBar } from "@/components/sellerSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SellerPage from './page';

export default function SellerPagelayout() {
    return (
        <>
            <div>
                <SidebarProvider>
                    <SellerSideBar />
                    <main className=" w-screen h-screen">
                        <SidebarTrigger className="absolute" />
                        <SellerPage />
                    </main>
                </SidebarProvider>

            </div>

        </>)
}