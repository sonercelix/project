import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Orders from "./Orders";
import ProductDetail from "./ProductDetail";
import Security from "./Security";
import { store } from "./useRedux/store";
import Users from "./Users";
import { userLoginControl } from "./util";
import { Provider } from "react-redux";

export const router = (
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path=""
          element={
            userLoginControl() === null ? (
              <Login />
            ) : (
              <Navigate to="/dashboard"></Navigate>
            )
          }
        ></Route>
        <Route
          path="/dashboard"
          element={<Security component={<Dashboard />} />}
        ></Route>
        <Route
          path="/orders"
          element={<Security component={<Orders />} />}
        ></Route>
        <Route
          path="/users"
          element={<Security component={<Users />} />}
        ></Route>
        <Route
          path="/detail/:pid"
          element={<Security component={<ProductDetail />} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
