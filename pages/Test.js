import Payment from "@/components/payment/Payment";
import { CardElement, Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import Stripe from "stripe";


const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
    hidePostalCode: true
};


const stripePomise =loadStripe("pk_test_51PnDWSP8Vhow5iFlGuYgULfcwQXfI5FU9Zz2XmYrD4yaHW6YMrWPMCW6MsqB8BJVbxTcLGROvvpcuo7YIOmlWd9V002g9sXWk4");



export default function Test() {
    const [clientSecret,setClientSecret] = useState();


    const createPaymentIntent = async () => {
        const stripe = new Stripe('sk_test_51PnDWSP8Vhow5iFl7nifEoCfR454ZYuBkjQyx7GqJwEYzKeTqZDdngeavb83dnH1qcF9N8U19QjPXMHNDGQIFHNc00LmejjohL');
        
        const customer = await stripe.customers.create({
            name: 'John Doe',      // Nom du client
            email: 'mamitianafaneva2004@gmail.com',  // Email du client
            description: 'Produit tsy aiko',
        });

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 5000, // Par exemple, 50.00 USD
                currency: 'usd',
                customer:customer.id,
                receipt_email:customer.email,
                metadata: {            
                    hebergement_hotel:"Hotel le louvre",
                    order_id: '6735',
                }
            });
    
            setClientSecret(paymentIntent.client_secret);
            setOption({
                clientSecret:paymentIntent.client_secret
            })
        } catch (error) {
            console.error('Error creating PaymentIntent:', error);
        }
    };

    const [option,setOption] =useState(null);
    
    useEffect(()=>{
        createPaymentIntent();
    },[])


    return (
        <div>
            {option!=null &&
                <Elements stripe={stripePomise} options={option}>
                    <Payment/>
                </Elements>
            }
        </div>
    )
}



Test.getLayout = function getLayout(page) {
    return (
        <>
            {page}
        </>
    );
}