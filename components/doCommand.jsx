import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Error from "./error.jsx";
import dataWebSite from "../pages/api/data.json";
import { useRouter } from "next/router";

const DoCommand = ({ show, setShow, cart, contentClassName, deliver }) => {
  const router = useRouter();

  const [promo, setPromo] = useState(
    router.query.promo ? router.query.promo : ""
  );
  const [typeDeliver, setTypeDeliver] = useState(deliver[0]._id);
  const currency = dataWebSite.currency;

  const [err, setErr] = useState("");
  const [disbaleBbtn, setDisbaleBbtn] = useState(false);

  const pay = (e) => {
    e.preventDefault();
    setDisbaleBbtn(true);

    fetch(process.env.URLSERVER + "/api/payment", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams({
        promo: promo,
        typeDeliver: typeDeliver,
        cart: JSON.stringify(cart),
        token: localStorage.token ? localStorage.token :"" ,
      }).toString(),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            setErr(result.error);
          } else if (result.link) {
             return window.location.replace(result.link);
          }
          return setDisbaleBbtn(false);
         
        },
        (err) => {
          console.log("Une erreur c' est produit:", err);
        }
      );
  };

  if (router.query.set == "clearCart") {
    localStorage.setItem("cart", "");
    return router.push("/");
  }

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        contentClassName={contentClassName}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 className="font-weight-light w-100 mx-4">Commander</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="p-4">
            <form>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control w-100"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="ceode promotionel"
                />
              </div>

              {deliver.map(i => (
                <div className="form-check my-3">
                  <input
                    onClick={() => setTypeDeliver(i._id)}
                    checked={typeDeliver==i._id}
                    className="form-check-input"
                    type="radio"
                    id={i._id}
                    value={i._id}
                  />
                  <label className="form-check-label" htmlFor={i._id} >
                  {i.name+": "+i.Price+currency + (i.FreeFrom != -1 ? (" ( Gratuit à partir de "+ i.FreeFrom +currency+" d'achat) - ") : " - " ) +  i.description }
                  </label>
                </div>
              ))}
              
            </form>

            <div className="d-block">
              {err && <Error response={{ error: err }} />}

              <div className="input-group w-100">
                <button
                  onClick={(e) => pay(e)}
                  className="btn btn-lg btn-hermes mx-auto"
                  disabled={disbaleBbtn}
                >
                  Suivant
                </button>
              </div>
            </div>
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default DoCommand;
  

