import UrlConfig from "@/util/config";
import React, { useRef, useEffect, useState } from "react";

export default function Paypal(props) {
  const paypal = useRef();
  console.log(props);
  const [infoChambre, setInfoChambre] = useState(null)


  useEffect(() => {

    const handleFetch = () => {
      const formatted_check_in = new Date(props.check_in).toISOString().split('T')[0];
      const formatted_check_out = new Date(props.check_out).toISOString().split('T')[0];

      const booking_info = {
        "chambre_ids": props.id_chambres,
        "check_in": formatted_check_in,
        "check_out": formatted_check_out
      };

      return fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/check/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking_info)
      })
        .then((response) => {
          if (!response.ok) {
            return false;
          }
          return response.json();
        }).then((data) => {

          return data;
        })
        .catch((error) => {
          console.error('Error during user fetch operation:', error);
          return null;
        });
    };
    handleFetch().then((infoChambre) => {
      if (infoChambre.total_price) {
        console.log("total :", infoChambre.total_price);
        window.paypal
          .Buttons({
            style: {
              shape: 'pill',  // ou 'rect' pour rectangulaire
              color: 'gold',  // ou 'blue', 'silver', 'white', 'black'
              layout: 'vertical',  // ou 'horizontal'
              label: 'pay',  // ou 'checkout', 'buynow', 'pay', 'installment'
              tagline: false   // afficher ou non le slogan sous le bouton
            },
            createOrder: (data, actions, err) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: props.description,
                    amount: {
                      currency_code: "EUR",
                      value: infoChambre.total_price,
                      // value: 10,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              console.log(order);
            },
            onError: (err) => {
              console.log(err);
            },
          })
          .render(paypal.current);
      } else {
        console.error("Formulaire incomplet");
      }
    })
  }, [props]);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
