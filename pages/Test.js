import DetailProduct from '@/components/card/DetailProduct';
import DetailTravel from '@/components/card/DetailTravel';
import PopularTripCard from '@/components/card/PopularTripCard';
import TripCard from '@/components/card/TripCard';
import TimelineEvent from '@/layouts/users/tour/TimelineEvent';
import dynamic from 'next/dynamic';
const FilterMap = dynamic(()=> import('@/components/FilterMap'),{ssr:false});



export default function Test() {
    return (
        <div>
            <TimelineEvent/>
        </div>
    )
}



Test.getLayout = function getLayout(page) {
    return(
        <>
            {page}
        </>
    );
}