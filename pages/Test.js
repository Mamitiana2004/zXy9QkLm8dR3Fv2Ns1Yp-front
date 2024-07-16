import Loader from '@/layouts/Loader';
import dynamic from 'next/dynamic';

const FilterMap = dynamic(()=> import('@/components/FilterMap'),{ssr:false});



export default function Test() {
    return <Loader/>
}



Test.getLayout = function getLayout(page) {
    return(
        <>
            {page}
        </>
    );
}