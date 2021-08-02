import { useState, useEffect } from "react";
import UpDownStar from "../components/UpDownStar.jsx";
import Slide from "react-reveal/Slide";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import countryList from "react-select-country-list";
import Error from "../components/error.jsx";
import Header from "../components/header";
import Footer from "../components/footer";
import StyleProfil from "../styles/profil.module.css";
import HeadComponents from  "../components/HeadComponents"

import Link from "next/link";

const MyInfo = () => {
  const [info, setInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: [],
    addr: [],
  });
  const [see, setSee] = useState(0);
  const [form, setForm] = useState({});
  const [err, setErr] = useState({});
  const informationText = (
    <small className="mx-2">
      <i className="bi bi-info-circle"> </i> les informations ci-dessus nous
      seront important lors de l 'examen relative au plans de partenariats ,
      cependant; ils n 'aurons pas d’utilités concernant les livraisons car ces
      derniers utiliserons les coordonnées fournis lors des différents payements
      respectives au moments des commandes.
    </small>
  );
  useEffect(() => {
    setInfo(JSON.parse(sessionStorage.getItem("userInfo")));
  }, []);
  const changeForm = (element) =>
    setForm({
      ...form,
      ...element,
    });

  const handleClickToBtn = (e, key) => {
    e.preventDefault();
    setForm({
      pass: "",
      lastname: "",
      firstname: "",
      email: "",
    });
    setErr({});
    if (key == see) {
      setSee(0);
    } else {
      setSee(key);
    }
  };
  const classBtn = (key) => {
    let className = " list-group-item list-group-item-action ";
    if (key == see) {
      className = className + "list-group-item-secondary";
    } else {
      className = className + "list-group-item-light";
    }
    return className;
  };

  const formClass = (key) => {
    let className = " my-3";
    if (key != see) {
      className = "d-none";
    }
    return className;
  };

  const handleSubmit = (e, operation) => {
    e.preventDefault();

    fetch(process.env.URLSERVER + "/api/updateUser", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams({
        form: JSON.stringify(form),
        operation: operation,
        token: localStorage.getItem("token"),
      }).toString(),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result;:", result);
          setErr(result);
          if (result.userInfo) {
            setInfo(result.userInfo);
            sessionStorage.setItem("userInfo", JSON.stringify(result.userInfo));
          }
          if (result.success) {
            setTimeout(() => {
              handleClickToBtn(e, 0);
            }, 7000);
          }
        },
        (err) => {
          console.log("Une erreur c' est produit:", err);
        }
      );
  };

  return (
    <>
       <HeadComponents title="Profil" />

    <main className={StyleProfil.bgProfil+ " min-vh-100 w-100 d-flex align-content-between  justify-content-between flex-column" }>
      
      <Header />
      <section className="container">
        <h2 className="fw-lighter"> Paramètres </h2>
        <ul className={"list-group my-4 " + StyleProfil.listNoStyle}>
          <li>
            <i onClick={(e) => handleClickToBtn(e, 1)} className={classBtn(1)}>
              <UpDownStar state={see == 1 ? true : false} /> Nom / Prénom:
              {info.lastname + " " + info.firstname}
            </i>
            <form
              onSubmit={(e) => handleSubmit(e, "name")}
              className={formClass(1)}
            >
              <Slide top>
                <div className="input-group">
                  <div className="m-1">
                    <input
                      value={form.lastname}
                      onChange={(e) =>
                        changeForm({
                          lastname: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control"
                      required
                      placeholder="Nom"
                    />
                  </div>
                  <div className="m-1">
                    <input
                      value={form.firtname}
                      onChange={(e) =>
                        changeForm({
                          firstname: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control"
                      required
                      placeholder="Prénom"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <div className="m-1">
                    <input
                      value={form.pass}
                      onChange={(e) =>
                        changeForm({
                          pass: e.target.value,
                        })
                      }
                      type="password"
                      className="form-control"
                      required
                      placeholder="mot de passe"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <button className="m-1 btn-sm btn btn-outline-hermes">
                    Changer
                  </button>
                </div>
                <Error response={err} /> {informationText}
              </Slide>
            </form>
          </li>
          <li>
            <i onClick={(e) => handleClickToBtn(e, 2)} className={classBtn(2)}>
              <UpDownStar state={see == 2 ? true : false} />
              Email: {info.email}
            </i>
            <form
              onSubmit={(e) => handleSubmit(e, "email")}
              className={formClass(2)}
            >
              <Slide top>
                <div className="input-group">
                  <div className="m-1">
                    <input
                      value={form.email}
                      onChange={(e) =>
                        changeForm({
                          email: e.target.value,
                        })
                      }
                      type="email"
                      className="form-control"
                      required
                      placeholder="email"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <div className="m-1">
                    <input
                      value={form.pass}
                      onChange={(e) =>
                        changeForm({
                          pass: e.target.value,
                        })
                      }
                      type="password"
                      className="form-control"
                      required
                      placeholder="mot de passe"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <button className="m-1 btn-sm btn btn-outline-hermes">
                    Changer
                  </button>
                </div>
                <Error response={err} />
              </Slide>
            </form>
          </li>
          <li>
          <Link href="/password">
            <a className={classBtn(-1)}>
              <UpDownStar> </UpDownStar> Changer le mot de passe
            </a>
                </Link>
          </li>
          <li>
            <i onClick={(e) => handleClickToBtn(e, 3)} className={classBtn(3)}>
              <UpDownStar state={see == 3 ? true : false} />
              Téléphone
            </i>
            <form
              onSubmit={(e) => handleSubmit(e, "phone")}
              className={formClass(3)}
            >
              <Slide top>
                <div
                  className={
                    info.phone
                      ? "input-group alert-dark text-light alert p-3 w-50 d-flex justify-content-between "
                      : "d-none"
                  }
                >
                  <Slide right>
                    <p> {info.phone} </p>
                    <i
                      className="pointer text-danger  bi bi-trash"
                      onClick={(e) => handleSubmit(e, "removePhone")}
                    ></i>
                  </Slide>
                </div>
                <div className="input-group">
                  <PhoneInput
                  specialLabel=''
                  country={'us'}
                    value={form.phone}
                    onChange={(e) =>
                      changeForm({
                        phone: e,
                      })
                    }
                  />
                </div>
                <div className="input-group">
                  <button className="m-1 btn-sm btn btn-outline-hermes">
                    Changer
                  </button>
                </div>
                <Error response={err} />
              </Slide>
            </form>
          </li>
          <li>
            <i onClick={(e) => handleClickToBtn(e, 4)} className={classBtn(4)}>
              <UpDownStar state={see == 4 ? true : false} />
              Adresse
            </i>
            <form
              onSubmit={(e) => handleSubmit(e, "addr")}
              className={formClass(4)}
            >
              <Slide top>
                <div
                  className={
                    info.addr.length
                      ? "input-group alert-dark bg-light alert p-3 w-50"
                      : "d-none"
                  }
                >
                  <Slide right>
                    <span className="d-flex justify-content-between flex-column w-100">
                      <i
                        className="text-right  pinter text-danger  bi bi-trash"
                        onClick={(e) => handleSubmit(e, "removeAddr")}
                      ></i>
                      <div>
                        {info.addr.map((i) => (
                          <p
                            className="
        text - wrap mx - 2 "
                          >
                            {i}
                          </p>
                        ))}
                      </div>
                    </span>
                  </Slide>
                </div>
                <div className="input-group">
                  <div>
                    <input
                      value={form.street}
                      onChange={(e) =>
                        changeForm({
                          street: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control m-1"
                      required
                      placeholder="Adresse"
                    />
                    <input
                      value={form.town}
                      onChange={(e) =>
                        changeForm({
                          town: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control m-1"
                      required
                      placeholder="Ville/Département"
                    />
                    <input
                      value={form.code}
                      onChange={(e) =>
                        changeForm({
                          code: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control m-1"
                      required
                      placeholder="Code Postale (ex:7500)"
                    />
                    <select
                      options={countryList().getData()}
                      placeholder="Pays"
                      required
                      className="form-control m-1"
                      value={form.contry}
                      onChange={(e) =>
                        changeForm({
                          contry: e.target.value,
                        })
                      }
                    >
                      {countryList()
                        .getData()
                        .map((c) => (
                          <option value={c.value}> {c.label} </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="input-group">
                  <button className="m-1 btn-sm btn btn-outline-hermes">
                    Changer
                  </button>
                </div>
                <Error response={err} /> {informationText}
              </Slide>
            </form>
          </li>
        </ul>
      </section>
      <Footer />
    </main>
    </>
  );
};

export default MyInfo;
