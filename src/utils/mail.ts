import axios from "axios";

export const sendMail = (
  orderId: number,
  name: string,
  email: string,
  message: string
) => {
  if (!orderId || !name || !email || !message) {
    return;
  }

  axios({
    method: "POST",
    url: "https://alba-mail.herokuapp.com/mail",
    data: {
      name,
      email,
      message,
      orderId,
    },
  })
    .then((response) => {
      if (response.data.msg === "success") {
        console.log("success");
      } else if (response.data.msg === "fail") {
        console.log("error", response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
