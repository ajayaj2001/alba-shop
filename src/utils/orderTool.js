import { monthNames } from "utils/constant";
import { appendSpreadsheet } from "../components/googleSpreadsheet/googleSpreadsheet";

export const orderTotalAmount = (items) => {
  var totalPrice = 0;

  items.forEach((item) => {
    totalPrice += item.price;
  });
  return totalPrice;
};

export const orderPaymentMethod = (paymentDetail) => {
  return paymentDetail.filter((card) => {
    return card.type == "primary";
  })[0].name;
};

export const generateOrderNumber = () => {
  return Date.now();
};

export const currentDateFormate = () => {
  const today = new Date();

  const date = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  return `${monthNames[month]} ${date}, ${year}`;
};

export const invoiceDataFormatter = (
  priceDetails,
  invoiceNo,
  date,
  cartDetail,
  userDetail
) => {
  const items = cartDetail.map((product) => {
    return {
      sno: product.id,
      desc: product.title,
      qty: product.quantity,
      rate: product.salePrice,
    };
  });
  return {
    priceDetails,
    id: 1,
    subTotal: 0,
    discount: 0,
    totalPrice: 0,
    invoice_no: invoiceNo,
    balance: 0,
    company: "",
    email: userDetail.email,
    phone: userDetail.contact[0]?.number,
    address: userDetail.address[0]?.info,
    items,
    trans_date: date,
    due_date: date,
  };
};

const stringCombine = (arr, obj1, obj2) => {
  var temp = "";
  arr.forEach((prod) => {
    temp += prod[obj1] + (obj2 ? " : " + prod[obj2] : "") + "\n";
  });
  return temp;
};

export const spreadsheetDataFormatter = async (
  invoiceNo,
  date,
  cartDetail,
  userDetail,
  totalPrice,
  discountPrice,
  subTotal
) => {
  for (const product of cartDetail) {
    await appendSpreadsheet({
      orderNo: invoiceNo,
      name: userDetail.name,
      email: userDetail.email,
      orderDate: date,
      totalPrice: product.quantity * product.salePrice,
      productId: product.id,
      productName: product.title,
      cartTotalPrice: totalPrice,
      cartDiscountPrice: discountPrice,
      cartActualPrice: subTotal,
      quantity: product.quantity,
      price: product.salePrice,
      address: stringCombine(userDetail.address, "name", "info"),
      phoneNumbers: stringCombine(userDetail.contact, "number"),
      customizationNames: stringCombine(userDetail.brushName, "name"),
      deliveryTime: userDetail.schedules.filter((time) => {
        return time.type == "primary";
      })[0].time_slot,
      paymentMethod: orderPaymentMethod(userDetail.card),
      transactionId: userDetail.transactionId,
    }).catch((err) => console.log(err));
  }
};
