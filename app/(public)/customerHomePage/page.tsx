import CustomerAdBanner from '@/components/ads/customerAdBanner';
import HomepageProductShowcase from '@/components/productDisplay/homepageProductShowcase';


export default function CustomerHomePage() {
    return (
        <>

            <div className="px-40 w-screen py-5 space-y-5">
                <CustomerAdBanner />
                <HomepageProductShowcase />
            </div>

        </>
    )
}