import { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { Slide } from "react-slideshow-image";
import dataWebSite from "../pages/api/data.json";
import styleModal from "../styles/ModalProduit.module.css";
import UpDownStar from "./UpDownStar.jsx";
import Fade from "react-reveal/Fade";
import "react-slideshow-image/dist/styles.css";
import "react-slideshow-image/dist/styles.css";
import Image from "next/image";
import Link from "next/link";
import myLoader from "../plugin/imgLoader.js";

import { useRouter } from "next/router";

const ModalProduit = ({
  show,
  setShow,
  seeProduit,
  setCart,
  total,
  setTotal,
  contentClassName = "",
}) => {
  const router = useRouter();
  const sliderRef = useRef(null);

  const [copyLink, setCopyLink] = useState(false);
  const [models, setModels] = useState("");
  const [seeModels, setSeeModels] = useState([]);

  const closeModel = () => {
    setShow(false);
    if (router.query.produit) {
      router.push("/");
    }
  };
  useEffect(() => {
    let options = [];
    let SeeMod = [];
    seeProduit.models.map((i) => options.push(i[0]));
    seeProduit.models.map((i, n) => SeeMod.push({ n: n, state: false }));
    setSeeModels(SeeMod);
    setModels(options);
  }, [show]);
  const newModel = (value, array) => {
    let options = [];
    for (let i = 0; i < seeProduit.models.length; i++) {
      const element = seeProduit.models[i];
      if (array == element) {
        options.push(value);
      } else {
        options.push(models[i]);
      }
    }
    setModels(options);
   
  };
  const changeSeeModel = (index) => {
    let see = [];
    seeModels.map((i, n) => {
      n == index
        ? see.push({ n: n, state: !seeModels[n].state })
        : see.push(seeModels[n]);
    });
    setSeeModels(see);
  };
  const handelAddCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const cart = JSON.parse(localStorage.getItem("cart"));

    const product = seeProduit;
    let model = [];
    models.map((i) => (model = [...model, i]));
    product.model = model;

    let solde = 1;
    if (seeProduit.price[1]) {
      solde = (100 - seeProduit.price[1]) / 100;
    }
    setTotal(Math.round((total + seeProduit.price[0] * solde) * 100) / 100);
    for (let i = 0; i < cart.length; i++) {
      const element = cart[i];

      if (product._id === element._id && product.model === element.model) {
        cart[i].count++;
        setCart(cart);

        return closeModel();
      }
    }

    product.count = 1;
    setCart([...cart, product]);
    return closeModel();
  };

  const copyToClipboard = () => {
    const textField = document.querySelector("#linkOfProduct");
    textField.select();
    document.execCommand("copy");
    setCopyLink(true);
    setTimeout(() => {
      setCopyLink(false);
    }, 10000);
  };

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    scale: 0.4,
    arrows: true,
  };

  const linkOfProduct = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    let link = "https://" + window.location.host + "?produit=" + seeProduit._id;
    if (userInfo != undefined && userInfo.promo.value == 1) {
      return link + "&promo=" + userInfo.promo.code;
    }
    return link;
  };

  const nSlide = (i) => {
    sliderRef.current.goTo(i);
  };

  const GetModelHtml =({element})=>{
    if(element){
    return <>
    {element.img && (
      <i>
        <Image
        className="m-auto"
loader={myLoader}
          src={element.img}
          alt={element.img}
          width={50}
          height={10}
          className={ (seeProduit.image).includes(element.img) && styleModal.smallImg}
          onClick={(e)=>seeProduit.image.map((img, index) => (element.img ==img) && nSlide(index)) 
          }
        />
      </i>
    )}
    {element.color && (
      <i
      className="m-auto"
        style={{
          backgroundColor: elementelement.color,
          color: elementelement.color,
        }}
      >
        ___
      </i>
    )}
    {element.value && <span  className="m-auto">{element.value}</span>}
    </>
  }
}
  return (
    <>
      <Modal
    
        show={show}
        onHide={() => closeModel()}
        dialogClassName=" modal-90w"
        size="xl"
        contentClassName={contentClassName}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <Modal.Title>
            <h2 className="fw-lighter mx-4">{seeProduit.name} </h2>
          </Modal.Title>
          <i
            onClick={() => closeModel()}
            className="btn btn-danger bi bi-x"
          ></i>
        </Modal.Header>
        <Modal.Body>
          <div className={styleModal.modalBodyFlex}>
            <div className={styleModal.bigImg}>
              <Slide easing="ease" ref={sliderRef} {...properties}>
                {seeProduit.image.map((i) => (
                  <div
                    className={styleModal.imgSpan}
                    style={{
                      backgroundImage: `url("${process.env.HOST_IMG + i}")`,
                    }}
                  >
                    {seeProduit.price[1] && (
                      <strong className={styleModal.soldOnModal}>
                        -{seeProduit.price[1]}%
                      </strong>
                    )}
                  </div>
                ))}
              </Slide>
            </div>
            <div className={styleModal.smallImgSpanParent}>
              {seeProduit.image.map((img, index) => (
                <i>
                  <Image
                    loader={myLoader}
                    src={img}
                    alt={img}
                    width={80}
                    height={80}
                    className={styleModal.smallImg}
                    onClick={() => nSlide(index)}
                  />
                </i>
              ))}
            </div>

            <div className={styleModal.bigBoxDescription}>
              <span>
                <span className="d-block">
                  <input
                    value={linkOfProduct()}
                    type="text"
                    className="form-control d-inline w-75"
                    id="linkOfProduct"
                  />
                  <button
                    onClick={() => copyToClipboard()}
                    className="btn btn-outline-hermes btn-lg"
                  >
                    {copyLink ? (
                      <i className="bi bi-check2-all"></i>
                    ) : (
                      <i className="bi bi-share-fill"></i>
                    )}
                  </button>
                </span>
                {seeProduit.type.map((t) => (
                  <Link href={`?filter=${t.replace(" ", "%")}`}>
                    <a className="m-2 btn-mg btn btn-outline-hermes">
                      <i className="bi bi-tags-fill"></i>
                      {t}
                    </a>
                  </Link>
                ))}
              </span>

              {seeProduit.models && (
                <span>
                  {seeProduit.models.map((key, index) => (
                    <ul className="pointer list-group bg-inherite">
                      <li
                        key={index}
                        onClick={() => changeSeeModel(index)}
                        className="list-group-item "
                      >
                        <UpDownStar
                          state={seeModels[index] && seeModels[index].state}
                        />
                        {models ?  <GetModelHtml element={ models[index]} /> : <GetModelHtml element={key[index]} /> }
                        {seeModels[index] && seeModels[index].state && (
                          <ul className="pointer list-group">
                            <Fade top>
                              {key.map((ii, k) => (
                                <li
                                  key={k}
                                  onClick={() => newModel(ii, key)}
                                  className={"list-group-item "+styleModal.ListModel}
                                >
                                  <GetModelHtml element={ii} />
                                </li>
                              ))}
                            </Fade>
                          </ul>
                        )}
                      </li>
                    </ul>
                  ))}
                </span>
              )}

              <div align="right">
                {seeProduit.price[1] && (
                  <del className="fs-3 text-danger mx-2">
                    {seeProduit.price[0] + dataWebSite.currency}
                  </del>
                )}
                <span className="fs-1">
                  {seeProduit.price[1]
                    ? Math.round(
                        ((100 - seeProduit.price[1]) / 100) *
                          seeProduit.price[0] *
                          100
                      ) / 100
                    : seeProduit.price[0]}
                  <sup>{dataWebSite.currency}</sup>
                </span>
              </div>
              <hr/>
              <article className={styleModal.preformatted}>
                {seeProduit.description}
              </article>
              <button
                onClick={(e) => handelAddCart(e)}
                className="btn btn-warning btn-lg"
              >
                Ajouter au panier
                <i className="bi bi-cart-plus"></i>
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalProduit;
