import axios from "axios";
import { IUser } from "./models/IUser";

let baseURL = "https://www.jsonbulut.com/json/";
let ref = "d1becef32825e5c8b0fc1b096230400b";

baseURL = process.env.REACT_APP_BASE_URL
  ? process.env.REACT_APP_BASE_URL
  : baseURL;

ref = process.env.REACT_APP_REF ? process.env.REACT_APP_REF : ref;

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

//userLogin.php?ref=d1becef32825e5c8b0fc1b096230400b&userEmail=zehra@mail.com&userPass=12345&face=no
