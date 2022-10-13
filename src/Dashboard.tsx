import React, { useEffect, useState } from "react";
import { allProduct } from "./service";
import { IProBilgiler } from "./models/IProduct";
import ProductItem from "./inc/ProductItem";

function Dashboard() {
  //Use effect return kısmı bittikten sonra yaşayan bir bölümdür. Returnden sonra bir kez çalışır. Statelerden de etkilenir.

  const [first, setfirst] = useState("");
  const [proArr, setProArr] = useState<IProBilgiler[]>([]);
  useEffect(() => {
    allProduct()
      .then((res) => {
        const arr = res.data.Products[0].bilgiler;
        setProArr(arr);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, []);

  return (
    <>
      <div className="container-fluid">
        <input
          className="form-control mt-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(evt) => {
            setfirst(evt.target.value);
          }}
        />
      </div>
      <div className="row m-3">
        {proArr.map((item, index) => (
          <ProductItem key={item.productId} data={item}></ProductItem>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
