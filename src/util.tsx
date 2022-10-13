import { Bilgiler } from "./models/IUser";
import * as CryptoJs from "crypto-js";

const secretKey = process.env.REACT_APP_SECRET_KEY
  ? process.env.REACT_APP_SECRET_KEY
  : "12345";

export const encrypt = (plainText: string) => {
  const cipherText = CryptoJs.AES.encrypt(plainText, secretKey).toString();
  return cipherText;
};

export const decrypt = (cipherText: string) => {
  const bytes = CryptoJs.AES.decrypt(cipherText, secretKey);
  const plainText = bytes.toString(CryptoJs.enc.Utf8);
  return plainText;
};

export const userLoginControl = () => {
  if (localStorage.getItem("user")) {
    const va = localStorage.getItem("user");
    sessionStorage.setItem("user", va ? va.toString() : "");
  }

  const stBilgiler = sessionStorage.getItem("user");

  if (stBilgiler) {
    try {
      const decryptStBilgiler = decrypt(stBilgiler);
      const bilgiler = JSON.parse(decryptStBilgiler) as Bilgiler;
      return bilgiler;
    } catch (error) {
      localStorage.removeItem("user");
      return null;
    }
  } else {
    return null;
  }
};
