import React, { useEffect, useState } from "react";
import { allProduct } from "./service";
import { IProBilgiler } from "./models/IProduct";
import ProductItem from "./inc/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "./useRedux/store";
import { SearchAction } from "./useRedux/actions/SearchAction";
import { SearchType } from "./useRedux/types/SearchType";

function Dashboard() {
  //Use effect return kısmı bittikten sonra yaşayan bir bölümdür. Returnden sonra bir kez çalışır. Statelerden de etkilenir.

  const searchSelector = useSelector((item: StateType) => item.SearchReducer);
  const dispath = useDispatch();

  const [proArr, setProArr] = useState<IProBilgiler[]>([]);
  const [oldProArr, setoldProArr] = useState<IProBilgiler[]>([]);

  useEffect(() => {
    const searchAction: SearchAction = {
      type: SearchType.SEARCH_CHANGE,
      payload: "",
    };
    dispath(searchAction);

    allProduct()
      .then((res) => {
        const arr = res.data.Products[0].bilgiler;
        setProArr(arr);
        setoldProArr(arr);
        console.log("then");
      })
      .catch((ex) => {
        console.log("catch");
        console.log(ex);
      });
  }, []);

  useEffect(() => {
    const search = searchSelector.toLocaleLowerCase();

    const searchArr = oldProArr.filter(
      (item) => item.productName.toLocaleLowerCase().indexOf(search) > -1
    );

    setProArr(searchArr);
  }, [searchSelector]);

  return (
    <>
      {searchSelector}

      <div className="row m-3">
        {proArr.map((item, index) => (
          <ProductItem key={item.productId} data={item}></ProductItem>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
