import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./inc/Navbar";

import { userLoginControl } from "./util";

function Security(item: { component: JSX.Element }) {
  const user = userLoginControl();
  return user === null ? (
    <Navigate to="/"></Navigate>
  ) : (
    <>
      <Navbar user={user} /> {item.component}
    </>
  );
}

export default Security;
