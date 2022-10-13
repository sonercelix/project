import axios from "axios";
import { IUser } from "./models/IUser";
import { IProduct } from "./models/IProduct";
import { userLoginControl } from "./util";
import { IBasket } from "./models/IBasket";
import { IOrders } from "./models/IOrders";

let baseURL = "https://www.jsonbulut.com/json/";
let ref = "d1becef32825e5c8b0fc1b096230400b";

baseURL = process.env.REACT_APP_BASE_URL
  ? process.env.REACT_APP_BASE_URL
  : baseURL;

ref = process.env.REACT_APP_REF ? process.env.REACT_APP_REF : ref;

//userLogin.php?ref=d1becef32825e5c8b0fc1b096230400b&userEmail=zehra@mail.com&userPass=12345&face=no

export const userLogin = (email: string, password: string) => {
  const sendParams = {
    userEmail: email,
    userPass: password,
    face: "no",
  };
  return config.get<IUser>("userLogin.php", { params: sendParams });
};

const config = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  params: {
    ref: ref,
  },
  headers: {},
});

export const allProduct = () => {
  const sendParams = {
    start: "0",
  };
  return config.get<IProduct>("product.php", { params: sendParams });
};

export const addBasket = (productId: string) => {
  const user = userLoginControl();
  if (user) {
    const sendParams = {
      customerId: user?.userId,
      productId: productId,
      html: productId,
    };

    return config.get<IBasket>("orderForm.php", { params: sendParams });
  }
  return null;
};

export const order = () => {
  const user = userLoginControl();
  if (user) {
    const sendParams = {
      musterilerID: user?.userId,
    };

    return config.get<IOrders>("orderList.php", { params: sendParams });
  }
  return null;
};
