import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IProBilgiler } from "./models/IProduct";
import { addBasket } from "./service";

function ProductDetail() {
  const { state } = useLocation();
  console.log(state);
  const navigate = useNavigate();

  const [product, setProduct] = useState<IProBilgiler>();
  const [BigImage, setBigImage] = useState("");
  useEffect(() => {
    if (state) {
      try {
        const productInfo = state as IProBilgiler;
        if (productInfo) {
          setBigImage(productInfo.images[0].normal);
          setProduct(productInfo);
        }
      } catch (error) {
        navigate("/dashboard");
      }
    } else {
      navigate("/dashboard");
    }
  }, []);

  function addClickBasket() {
    if (product?.productId) {
      const basket = addBasket(product?.productId);
      if (basket) {
        basket
          .then((res) => {
            const status = res.data.order[0].durum;
            if (status) {
              toast.success(res.data.order[0].mesaj, {
                position: toast.POSITION.TOP_CENTER,
              });
            }
          })
          .catch((ex) => {
            console.log(ex);
          });
      }
    }
  }

  return (
    <>
      {product && (
        <>
          <h1>{product?.productName}</h1>
          <div className="row">
            <div className="col-sm-6">
              <img src={BigImage} className="img-fluid" />
              <div>
                {product.images.map((item, index) => (
                  <img
                    key={index}
                    src={item.thumb}
                    className="img-thumb"
                    role="button"
                    onClick={(evt) => {
                      setBigImage(item.normal);
                    }}
                  ></img>
                ))}
              </div>
            </div>
            <div className="col-sm-6">
              <h2>
                <span className="badge bg-danger">{product.price} TL</span>
              </h2>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
              <button
                className="btn btn-success"
                onClick={(evt) => {
                  addClickBasket();
                }}
              >
                <i className="bi bi-basket"></i> Sepete Ekle
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductDetail;
