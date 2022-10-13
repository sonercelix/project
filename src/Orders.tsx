import React, { useEffect, useState } from "react";
import { IOrders, Order } from "./models/IOrders";
import { order } from "./service";

function Orders() {
  const [orderArray, setOrderArray] = useState<Order[]>([]);

  // const orderSelector = useSelector(selectorReturningObject, shallowEqual)

  useEffect(() => {
    order()?.then((res) => {
      if (typeof res.data.orderList === "boolean") {
        setOrderArray([]);
      } else {
        setOrderArray(res.data.orderList);
      }
    });
  }, []);

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Pid</th>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Biref</th>
          </tr>
        </thead>
        <tbody>
          {orderArray.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.urun_id}</th>
              <td>
                <img src={item.thumb} className="img-thumbnail"></img>{" "}
              </td>
              <td>{item?.urun_adi}</td>
              <td>{item?.fiyat}</td>
              <td>{item?.kisa_aciklama}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Orders;
function useSelector(selectorReturningObject: any, shallowEqual: any) {
  throw new Error("Function not implemented.");
}
