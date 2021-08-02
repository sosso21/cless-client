import { useState, useEffect } from "react";
import dataWebSite from "../pages/api/data.json";
import StylePartenar from "../styles/partener.module.css";

const Money = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("userInfo")).promo.money);
  }, []);

  const HandleClick = (e) => {
    e.preventDefault();
    if (user.actual >= 50 && user.askToPay == false) {
      fetch(process.env.URLSERVER + "/api/promo/PayMe", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: new URLSearchParams({
          token: localStorage.getItem("token"),
        }).toString(),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.response == "success") {
              let session = JSON.parse(sessionStorage.getItem("userInfo"));
              session.promo.money.askToPay = true;
              sessionStorage.setItem("userInfo", JSON.stringify(session));
              setUser(session.promo.money);
            }
          },
          (err) => {
            console.log("Une erreur c' est produit:", err);
          }
        );
    }
  };

  return (
    <>
      <section className={"container my-auto " + StylePartenar.moneySection}>
        <h2 className="fw-lighter w-100 text-center">VOS GAINS</h2>

        <p className="my-3">
          <i className="bi bi-info-circle"></i>
          vous pouvez demander vos payement dès 50 {dataWebSite.currency} de
          bénéfices sur vos partenariats
        </p>

        <ul>
          <li>
            <span className={StylePartenar.fsBig + " fw-lighterr"}>
              
              {user.actual}
              <sup>{dataWebSite.currency}</sup>
            </span>
            <h3> Revenues actuel</h3>
          </li>
          <li>
            <span className={StylePartenar.fsBig + " fw-lighter"}>
              
              {user.total} <sup>{dataWebSite.currency}</sup>
            </span>
            <h3>Revenues total</h3>
          </li>
        </ul>
        <button
          onClick={(e) => HandleClick(e)}
          className={
            "btn btn-hermes btn-lg " +
            ((user.actual <= 50 || user.askToPay) && "disabled")
          }
        >
          Faire un retrais
        </button>
        {user.askToPay && (
          <div className="p-4 text-center w-75 bg-warning">
            <h3 className="fw-lighter">
              <i className="mx-2 bi bi-check2-circle"></i>
              Demande effectuée!
            </h3>
            <p>
              Un le transféré de vos revenues sera effectuer au plus vite vers
              le moyens de payement que vous nous avez renseigner,en cas de
              difficultés n’hésitez pas a nous contacter sur nos réseaux .
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default Money;
