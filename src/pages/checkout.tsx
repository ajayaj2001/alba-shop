import React from "react";
import { NextPage } from "next";
import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/seo";
import Checkout from "features/checkouts/checkout-two/checkout-two";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const CheckoutPage: NextPage<Props> = ({ deviceType }) => {
  const token = "true";

  return (
    <>
      <SEO title="Checkout - Alba" description="Checkout Details" />
      <Modal>
        <Checkout token={token} deviceType={deviceType} />
      </Modal>
    </>
  );
};

export default CheckoutPage;
