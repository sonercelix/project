import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Bilgiler } from "../models/IUser";
import { order } from "../service";
import { OrderAction } from "../useRedux/actions/OrderAction";
import { OrderType } from "../useRedux/types/OrderType";
import { useDispatch } from "react-redux";

function Navbar(item: { user: Bilgiler }) {
  const navigate = useNavigate();
  const location = useLocation();

  // const selectedData = useSelector(selectorReturningObject, shallowEqual)
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const orderService = order();
    if (orderService) {
      orderService.then((res) => {
        const arr = res.data.orderList;
        if (typeof arr !== "boolean") {
          const sendAction: OrderAction = {
            type: OrderType.ORDER_LIST,
            payload: arr,
          };

          dispatch(sendAction);
        }
      });
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <NavLink to="/dashboard" className="navbar-brand">
          NR 2.0
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/dashboard" className="nav-link">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/users" className="nav-link">
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/orders" className="nav-link">
                Orders
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Profil
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" onClick={logout} href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled">
                {item.user.userName} {item.user.userSurname}
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
function useSelector(selectorReturningObject: any, shallowEqual: any) {
  throw new Error("Function not implemented.");
}
