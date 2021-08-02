import { useState, useMemo, useRef } from "react";

const Social = ({ product = "" }) => {
  const [myProduct, setMyproduct] = useState(product || "");
  const [idProduct, setIdProduct] = useState(product ? product._id : "");
  const [seePromo, setSeePromo] = useState(true);
  const stylePromo = {
    position: "absolute",

    "z-index": 3,

    "font-size": "3rem",

    background: "red",
    color: "white",
    padding: "1rem 2rem 2rem 1rem",
    "border-bottom-right-radius": "100%",
  };

  const fb = useMemo(() => {
    if (myProduct) {
      let text = "";
      myProduct.price[1]
        ? (text += "⚠️ -" + myProduct.price[1] + "% : ")
        : (text += " :D ");
      text += "👉🏻 " + myProduct.name + "\n";
      text +=
        "Prix : " +
        Math.round(
          (myProduct.price[1]
            ? myProduct.price[0] * (1 - myProduct.price[1] / 100)
            : myProduct.price[0]) * 100
        ) /
          100;
      text +=
        "\n 👉🏻commandez le Dès maintient sur: https://cless.pages.dev?produit=" +
        myProduct._id;
      text +=
        " \n 🛒Découvrez nos nombreux produits et collections ainsi que nos incroyables offres sur : https://cless.pages.dev";
      return text;
    } else {
      return "";
    }
  }, [myProduct]);
  const ig = useMemo(() => {
    if (myProduct) {
      let text = fb;
      text += "\n \n ";
      if (myProduct.models.length) {
        myProduct.models.map((e) => e.map((i) => (text += " #" + i.value)));
      }

      text += "\n";
      text +=
        "#cless #shop #shopping #likeforlike  #instagram #promo #shopping #solg #collection #influance #mode #follow4follow";

      return text;
    } else {
      return "";
    }
  }, [myProduct]);

  const handleGenerate = (e) => {
    e.preventDefault();

    fetch(process.env.URLSERVER + "/api/productsOne/" + idProduct)
      .then((res) => res.json())
      .then((result) => {
        result.statusCode != 500 && setMyproduct(result);
      });
  };

  return (
    <section className="min-vh-100 w-100 d-flex justify-content-around align-content-center flex-column">
 ù<h3 className="my-2">Réseaux Sociaux</h3>
      <form className="input-group">
        <input
          type="text"
          className="form-control"
          value={idProduct}
          onChange={(e) => setIdProduct(e.target.value)}
          placeholder="id du produit"
        />
        <button
          className="btn btn-lg btn-hermes bi bi-search"
          onClick={(e) => handleGenerate(e)}
        ></button>
      </form>
      <div>
        <h2 className="my-2 fw-lighter text-center">
          <i className="bi bi-facebook"></i> Facebook :
        </h2>
      </div>
      <button
        className="btn btn-sm btn-outline-warning"
        onClick={() => navigator.clipboard.writeText(fb)}
      >
        copier
      </button>
      <div className="input-group">
        <textarea
          className="bg-dark text-warning form-control areaImage my-2"
          value={fb}
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <h3 className="my-2 fw-lighter text-center">
        <i className="bi bi-instagram"></i> Instagram :
      </h3>
      <button
        className="btn btn-sm btn-outline-warning"
        onClick={() => navigator.clipboard.writeText(ig)}
      >
        copier
      </button>
      <div className="input-group">
        <textarea
          className="bg-dark text-warning form-control my-2"
          value={ig}
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div>
        <h3 className="my-2 fw-lighter text-center">
          <i className="bi bi-image"></i> Images :
        </h3>
        <button
          className="btn btn-dark btn-lg my-4"
          onClick={() => setSeePromo(!seePromo)}
        >
          {seePromo ? "voir" : "chacher"} les promo
        </button>
      </div>
      {myProduct && (
        <section>
          {myProduct.image.map((i) => (
            <div className="d-block w-100 m-auto my-4 text-center">
              <div>
                {seePromo && (
                  <strong style={stylePromo}>-{myProduct.price[1]}%</strong>
                )}

                <img
                  src={process.env.HOST_IMG + i}
                  alt={myProduct.name}
                  className=" h-75 "
                />
              </div>
            </div>
          ))}
        </section>
      )}
    </section>
  );
};

export default Social;
