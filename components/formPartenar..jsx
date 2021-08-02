import { useState, useEffect } from "react";
import Error from "./error.jsx";
import Fade from "react-reveal/Fade";
import StylePartenar from "../styles/partener.module.css";

const FormPeomo = () => {
  const [form, setForm] = useState({});
  const [err, setErr] = useState({});
  const [promo, setPromo] = useState({});

  useEffect(() => {
    setPromo(JSON.parse(sessionStorage.getItem("userInfo")).promo);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(process.env.URLSERVER+ "/api/promo/user", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams({
        form: JSON.stringify(form),
        operation:
          JSON.parse(sessionStorage.getItem("userInfo")).promo.value == 1
            ? "edit"
            : "ask",
        token: localStorage.getItem("token"),
      }).toString(),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result:", result);
          setErr({ error: result.error });
          console.log("result.eror:", result.error);

          console.log("err:", err);
          if (result.success) {
            setForm({});
            let session = JSON.parse(sessionStorage.getItem("userInfo"));
            session.promo = result.success;
            sessionStorage.setItem("userInfo", JSON.stringify(session));
            setPromo(result.success);
          }
        },
        (err) => {
          console.log("Une erreur c' est produit:", err);
        }
      );
  };

  return (
    <>
      {promo.value == -1 && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <Fade big>
            <div className="input-group my-1 ">
              <textarea
                value={form.media}
                onChange={(e) =>
                  setForm({
                    media: e.target.value,
                    code: form.code,
                    payment: form.payment,
                  })
                }
                className="form-control"
                placeholder="vos réseaux d'influence (facultatif) "
              ></textarea>
            </div>

            <div className="input-group  my-1 ">
              <input
                value={form.code}
                onChange={(e) =>
                  setForm({
                    media: form.media,
                    code: e.target.value,
                    payment: form.payment,
                  })
                }
                type="text"
                className="form-control"
                placeholder="code créateur (facultatif)"
              />
            </div>

            <div className="input-group  my-1 ">
              <textarea
                value={form.payment}
                onChange={(e) =>
                  setForm({
                    media: form.media,
                    code: form.code,
                    payment: e.target.value,
                  })
                }
                className="form-control"
                placeholder="Vos moyens de payments (facultatif) "
              ></textarea>
            </div>

            <button className=" my-1  btn btn-hermes btn-lg">Envoyer</button>

            <div className="input-group  my-1 ">
              <Error response={err} />
            </div>
          </Fade>
        </form>
      )}

      {promo.value == 0 && (
        <aside className="w-auto h-auto d-flex justify-content-center align-content-center ">
          <Fade big>
            <div className="bg-warning rounded p-4 m-auto h-auto">
              <h3 className="font-weight-light my2 text-center">
                Demande en cours d'examen !
              </h3>
              Votre demande de partenariat a bien été envoyer ! Nous vous prions
              d'attendre une répense de notre part. les informations que vous
              nous avez soumis sont les suivant :
              <ul className="list-unstyled">
                <li> Réseau(x) d’influence: {promo.media} </li>
                <li>Code promo : {promo.code} </li>
                <li>Moyen(s) de paiment: {promo.payment} </li>
              </ul>
              <div className="text-center">
                <button
                  onClick={(e) => setPromo({ value: -1 })}
                  className="btn btn-hermes btn-lg"
                >
                  Modifier les Infos
                </button>
              </div>
            </div>
          </Fade>
        </aside>
      )}

      {promo.value == 1 && (
        <aside className="w-auto h-auto d-flex justify-content-center align-content-center ">
          <Fade big>
            <div className="bg-dark text-light rounded  p-4 m-auto h-auto">
              <h3 className="font-weight-light my2 text-center">
                Vos coordonnées :
              </h3>
              Grâce au code promo:
              <span className="bg-warning text-dark px-3  m-4 rounded">
                
                {promo.code}
              </span>
              et / ou en utilisant le lien ci-dessous, toute personne ainsi que
              vous pourriez profiter d'une réduction de
              <strong>{promo.solde}% </strong> ! et un bénéfice de
              <strong>{promo.benef}% </strong> vous seras renverser à chaque
              achat .
              <br />
              <i className="bg-warning text-dark  d-inline-block px-3  mx-4 rounded">
                
                {window.location.host + "?promo=" + promo.code}
              </i>
              <br />
              les informations que vous nous avez soumis sont les suivant :
              <ul className="list-unstyled">
                <li> Réseau(x) d’influence: {promo.media} </li>
                <li>Code promo : {promo.code} </li>
                <li>Moyen(s) de paiment: {promo.payment} </li>
              </ul>
              <div className="text-center">
                <button
                  onClick={(e) => setPromo({ value: -1 })}
                  className="btn btn-hermes btn-lg"
                >
                  Modifier les Infos
                </button>
              </div>
            </div>
          </Fade>
        </aside>
      )}
    </>
  );
};

export default FormPeomo;
