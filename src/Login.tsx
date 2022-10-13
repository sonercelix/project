import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "./service";
import { encrypt, userLoginControl } from "./util";

function Login() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const user = userLoginControl();
  //   console.log(user);
  //   if (user) {
  //     navigate("/dashboard");
  //   }
  // }, []);

  const [remember, setRemember] = useState(false);

  const sendForms = (evt: React.FormEvent) => {
    evt.preventDefault();
    userLogin(email, password)
      .then((res) => {
        if (res.data.user[0].bilgiler) {
          console.log(res.data.user[0].bilgiler?.userName);
          setAlertMessage("");
          const stBilgiler = JSON.stringify(res.data.user[0].bilgiler);
          const encryptStBilgiler = encrypt(stBilgiler);
          sessionStorage.setItem("user", encryptStBilgiler);
          if (remember) localStorage.setItem("user", encryptStBilgiler);
          window.location.href = "/dashboard";
        } else {
          setAlertMessage("Kullanici bilgileri bulunamadi");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("service call finish");
      });
  };

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [AlertMessage, setAlertMessage] = useState("");
  return (
    <>
      <div className="row">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <h2>Admin Login</h2>

          {AlertMessage !== "" && (
            <div className="alert alert-danger" role="alert">
              {AlertMessage}
            </div>
          )}

          <form onSubmit={sendForms}>
            <div className="mb-3">
              <input
                required
                onChange={(evt) => {
                  setEmail(evt.target.value);
                }}
                type="email"
                className="form-control"
                placeholder="E-Mail"
              />
            </div>
            <div className="mb-3">
              <input
                required
                type="password"
                onChange={(evt) => {
                  setpassword(evt.target.value);
                }}
                className="form-control"
                placeholder="Password"
              />
            </div>

            <div className="mb-3 form-check">
              <input
                onChange={(evt) => {
                  setRemember(!remember);
                }}
                className="form-check-input"
                type="checkbox"
                value=""
                id="remember"
              />
              <label className="form-check-label" htmlFor="remember">
                Beni hatırla
              </label>
            </div>

            <button type="submit" className="btn btn-success">
              Login
            </button>
          </form>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </>
  );
}

export default Login;
function componentDidMount() {
  throw new Error("Function not implemented.");
}
