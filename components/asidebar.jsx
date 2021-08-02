import { useState } from "react";
import Fade from "react-reveal/Fade";
import dataWebSite from "../pages/api/data.json";
import Image from "next/image";
import myLoader from "../plugin/imgLoader.js"
import StyleAsideBar from "../styles/asidebar.module.css";

const AsideBar = ({ cart, setCart, total, setTotal, setActiveCommand }) => {
  const [seeBasket, setSeeBasket] = useState(false);
  const handeleRemoveElemntFromCart = (e, i) => {
    e.preventDefault();
    e.stopPropagation();
    const index = cart.indexOf((e) => e._id == i._id);
    cart.splice(index, 1);
    setCart(cart);

    let t = 0;
    for (let i = 0; i < cart.length; i++) {
      const element = cart[i];
      let sold = 1;
      if (element.price[1]) {
        sold = (100 - element.price[1]) / 100;
      }
      let priceAfterSold = element.price[0] * sold;
      t += priceAfterSold * element.count;
    }
    setTotal(Math.round(t * 100) / 100);
  };
 
  return (
    <aside className={StyleAsideBar.carteSection}>
      <span className=" d-flex  justify-content-between">
        <Fade right>
          <h2 className={` fw-lighter ${!seeBasket && "d-none"}`}>Panier </h2>
        </Fade>
        <span className="w-100">
          <i
            onClick={() => setSeeBasket(!seeBasket)}
            className="bi bi-cart4
 pointer fs-1"
          ></i>
          {cart.length > 0 && (
            <i className={StyleAsideBar.redNotif}>{cart.length}</i>
          )}
        </span>
      </span>

      {seeBasket &&
        (cart.length == 0 ? (
          <Fade top>
            <p className="text-center alert alert-hermes">
              Votre panier est vide <i className=" bi bi-cart-x "></i>
            </p>
          </Fade>
        ) : (
          <ul className={StyleAsideBar.listCart}>
            <li className=" py-4 d-flex justify-content-between border-bottom border-hermes">
              <Fade left>
                <span>{cart.length} élément(s) </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCart([]);
                    setTotal(0);
                  }}
                  className="d-inline btn btn-danger btn-sm bi bi-x"
                  aria-label="CLose"
                ></button>
              </Fade>
            </li>

            {cart.map((i) => (
              <Fade top>
                <li key={i._id} className="py-4  w-100">
                  <span className={StyleAsideBar.bodyCart}>
                    <Image
                        loader={myLoader}
                      className="card-img-top rounded"
                      src={i.image[0]}
                      alt={i.name}
                      width="auto"
                      height="auto"
                    />
                  </span>

                  <div className={StyleAsideBar.bodyCart}>
                    <strong className="w-100 mx-2">{i.name}</strong>

                    <span align="right" className="d-block mx-2">
                      <p className="d-block">{i.model.map(ii=> ii.value + " ")}</p>
                      {i.price[1]
                        ? Math.round(
                            ((100 - i.price[1]) / 100) * i.price[0] * 100
                          ) / 100
                        : i.price[0]}
                      {dataWebSite.currency} x {i.count}
                    </span>

                    <button
                      onClick={(e) => handeleRemoveElemntFromCart(e, i)}
                      className="btn btn-outline-danger w-100 btn-sm bi bi-trash-fill"
                    ></button>
                  </div>
                </li>
              </Fade>
            ))}

            <li className="d-flex text-center justify-content-center py-4">
              <Fade right>
                <p className="w-100">
                  Total: {total}
                  {dataWebSite.currency}
                </p>
                <button
                  onClick={() => setActiveCommand(true)}
                  className=" btn-lg btn w-100 btn-warning"
                >
                  Commander <i class="bi bi-cart4"></i>
                </button>
              </Fade>
            </li>
          </ul>
        ))}
    </aside>
  );
};

export default AsideBar;

