import React, { useContext, useEffect, useState } from "react";
import { SEO } from "components/seo";
import OrderReceived from "features/order-received/order-received";
import { ProfileContext } from "contexts/profile/profile.context";
import { useCart } from "contexts/cart/use-cart";
import Router from "next/router";

import {
  generateOrderNumber,
  orderPaymentMethod,
  currentDateFormate,
  invoiceDataFormatter,
  spreadsheetDataFormatter,
} from "../utils/orderTool";
import { cartItemsTotalPrice } from "contexts/cart/cart.reducer";
import { BlobProvider } from "@react-pdf/renderer";
import Invoice from "../components/pdfGenerator/Invoice";

const OrderReceivedPage = () => {
  const { state } = useContext(ProfileContext);
  const { items } = useCart();
  const [isClient, setIsClient] = useState(false);

  const totalPrice = cartItemsTotalPrice(items);
  const orderNumber = generateOrderNumber();
  const currentDate = currentDateFormate();

  var data;

  useEffect(() => {
    setIsClient(true);
    if (!state.name) {
      console.log(state, "redirect to error");

      Router.push("/checkout");
    }

    spreadsheetDataFormatter(orderNumber, currentDate, items, state);
  }, []);

  return (
    <>
      {isClient && (
        <>
          <SEO title="Invoice - Alba" description="Invoice Details" />
          <BlobProvider
            document={
              <Invoice
                invoice={invoiceDataFormatter(
                  orderNumber,
                  currentDate,
                  items,
                  state
                )}
              />
            }
          >
            {({ blob, url, loading, error }) => (
              <OrderReceived
                cartDetails={items}
                userDetails={state}
                invoiceUrl={url}
                orderNumber={orderNumber}
                today={currentDateFormate()}
                totalPrice={totalPrice}
                paymentMethod={orderPaymentMethod(state.card)}
              />
            )}
          </BlobProvider>
        </>
      )}
    </>
  );
};

export default OrderReceivedPage;
