'use client'
import ProductsPage from "./productsPage/page";
import SalesPage from "./salesPage/page";
import { usePathname } from "next/navigation";

export default function SellerPage() {

    const pathname = usePathname()

    const isSalesPage = pathname === '/sellerPage/salesPage'
    const isProductPage = pathname === '/sellerPage/productsPage'
    // const isSalesPage = pathname === '/sellerPage/salesPage'


    return (
        <>
            <div className="w-full h-full p-8">
                {isSalesPage && (
                    <SalesPage />
                )}
                {isProductPage && (
                    <ProductsPage />
                )}
            </div>

        </>
    )
}