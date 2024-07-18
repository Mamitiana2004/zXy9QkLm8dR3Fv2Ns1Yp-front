import ProductCard from '@/components/card/ProductCard';
import Loader from '@/layouts/Loader';
import dynamic from 'next/dynamic';

import { InputOtp } from 'primereact/inputotp';
        
const FilterMap = dynamic(()=> import('@/components/FilterMap'),{ssr:false});



export default function Test() {
    return (
        <div>
            <InputOtp length={6}/>
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