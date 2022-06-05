import React from "react";
import Link from "next/link";
import OrderReceivedWrapper, {
  OrderReceivedContainer,
  OrderInfo,
  OrderDetails,
  TotalAmount,
  BlockTitle,
  Text,
  InfoBlockWrapper,
  InfoBlock,
  ListItem,
  ListTitle,
  ListDes,
} from "./order-received.style";
import { useCart } from "contexts/cart/use-cart";
import { FormattedMessage } from "react-intl";
import router from "next/router";

type OrderReceivedProps = {
  cartDetails: any;
  userDetails: any;
  today: string;
  paymentMethod: string;
  orderNumber: number;
  invoiceUrl: string;
};

const OrderReceived: React.FunctionComponent<OrderReceivedProps> = ({
  userDetails,
  today,
  paymentMethod,
  orderNumber,
  invoiceUrl,
}) => {
  const { address, schedules } = userDetails;
  const {
    items,
    clearCart,
    calculatePrice,
    calculateDiscount,
    calculateSubTotalPrice,
    cartItemsCount,
  } = useCart();

  const redirectHome = () => {
    router.push("/");
    clearCart();
  };

  const total = calculatePrice();
  const discount = calculateDiscount();
  const subTotalPrice = calculateSubTotalPrice();

  return (
    <OrderReceivedWrapper>
      <OrderReceivedContainer>
        {/* <Link href="/"> */}
        <a className="home-btn" onClick={redirectHome}>
          <FormattedMessage id="backHomeBtn" defaultMessage="Back to Home" />
        </a>
        {/* </Link> */}
        {invoiceUrl && (
          <Link href={invoiceUrl}>
            <a
              className="home-btn"
              style={{
                marginRight: "12rem",
                backgroundColor: "#009e7f",
                color: "white",
              }}
              download="invoice.pdf"
            >
              <FormattedMessage
                id="backHomeBtnss"
                defaultMessage="Download Invoice"
              />
            </a>
          </Link>
        )}
        <OrderInfo>
          <BlockTitle>
            <FormattedMessage
              id="orderReceivedText"
              defaultMessage="Order Received"
            />
          </BlockTitle>

          <Text>
            <FormattedMessage
              id="orderReceivedSuccess"
              defaultMessage="Thank you. Your order has been received"
            />
          </Text>

          <InfoBlockWrapper>
            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage
                  id="orderNumberText"
                  defaultMessage="Order Number"
                />
              </Text>
              <Text>{orderNumber}</Text>
            </InfoBlock>

            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage id="orderDateText" defaultMessage="Date" />
              </Text>
              <Text>{today}</Text>
            </InfoBlock>

            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage id="totalText" defaultMessage="Total" />
              </Text>
              <Text>₹{total}</Text>
            </InfoBlock>

            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage
                  id="paymenMethodText"
                  defaultMessage="Payment Method"
                />
              </Text>
              <Text>
                <FormattedMessage
                  id="paymentMethodNames"
                  defaultMessage={paymentMethod}
                />
              </Text>
            </InfoBlock>
          </InfoBlockWrapper>
        </OrderInfo>

        <OrderDetails>
          <BlockTitle>
            <FormattedMessage
              id="orderDetailsText"
              defaultMessage="Order Details"
            />
          </BlockTitle>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="totalItemText"
                  defaultMessage="Total Item"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>{cartItemsCount}</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="productNames"
                  defaultMessage="ProductDetails :"
                />
              </Text>
            </ListTitle>
            <ListDes>
              {items.map((cart) => (
                <Text key={cart.id} style={{ paddingBottom: "1rem" }}>{`${
                  cart.title
                } (${cart.quantity}) (${
                  cart.quantity * cart.salePrice
                })`}</Text>
              ))}
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="orderTimeText"
                  defaultMessage="Order Time"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>
                {
                  schedules.filter((time) => {
                    return time.type == "primary";
                  })[0].time_slot
                }
              </Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="deliveryTimeText"
                  defaultMessage="Delivery Time"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>24 Hrs Express Delivery</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="deliveryLocationText"
                  defaultMessage="Delivery Location"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>{address[0]?.info}</Text>
            </ListDes>
          </ListItem>
        </OrderDetails>

        <TotalAmount>
          <BlockTitle>
            <FormattedMessage
              id="totalAmountText"
              defaultMessage="Total Amount"
            />
          </BlockTitle>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage id="subTotal" defaultMessage="Sub total" />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>₹{subTotalPrice}</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="paymentMethodText"
                  defaultMessage="Payment Method"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>{paymentMethod}</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="deliveryCharge"
                  defaultMessage="Delivery Charge"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>₹ 0</Text>
            </ListDes>
          </ListItem>
          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="discountText"
                  defaultMessage="Discount Amount"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>- ₹{discount}</Text>
            </ListDes>
          </ListItem>
          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage id="totalText" defaultMessage="Total" />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>₹{total}</Text>
            </ListDes>
          </ListItem>
        </TotalAmount>
      </OrderReceivedContainer>
    </OrderReceivedWrapper>
  );
};

export default OrderReceived;
