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
import { sendMail } from "utils/mail";

const OrderReceivedPage = () => {
  const { state } = useContext(ProfileContext);
  const { items, calculatePrice, calculateDiscount, calculateSubTotalPrice } =
    useCart();
  const [isClient, setIsClient] = useState(false);
  const orderNumber = generateOrderNumber();
  const currentDate = currentDateFormate();

  const totalPrice = calculatePrice();
  const discountPrice = calculateDiscount();
  const subTotal = calculateSubTotalPrice();

  useEffect(() => {
    setIsClient(true);
    if (!state.name) {
      Router.push("/checkout");
    }

    sendMail(orderNumber, state.name, state.email, "success");

    spreadsheetDataFormatter(
      orderNumber,
      currentDate,
      items,
      state,
      totalPrice,
      discountPrice,
      subTotal
    );
  }, []);

  return (
    <>
      {isClient && (
        <>
          <SEO title="Invoice - AlbaShop" description="Invoice Details" />
          <BlobProvider
            document={
              <Invoice
                invoice={invoiceDataFormatter(
                  {
                    subTotal,
                    discountPrice,
                    totalPrice,
                  },
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
