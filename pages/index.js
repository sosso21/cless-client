import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/header";
import Footer from "../components/footer";
import MainDiv from "../components/maindiv.jsx";
import AsideBar from "../components/asidebar.jsx";
import FilterBar from "../components/filterBar.jsx";
import ModalProduit from "../components/ModalProduit.jsx";
import Spiner from "../components/Spiner.jsx";
import DoCommand from "../components/doCommand.jsx";
import { useClass } from "../plugin/thme.js";
import { route } from "next/dist/next-server/server/router";
import HeadComponents from  "../components/HeadComponents"


export default ({ type, products,deliver }) =>
{
  
  const router = useRouter();

  const [allProduct, setAllProduct] = useState(products);
  const [data, setData] = useState(allProduct);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [activeModaleProduit, setActiveModaleProduit] = useState(false);
  const [seeProduit, setSeeProduit] = useState("");
  const [ActiveCommand, setActiveCommand] = useState(false);
  const [codePromo, setCodePromo] = useState(0);

  const [darkTheme, setDarkTheme, consumer] = useClass();

  useEffect(() =>
  {
    if (router.query.promo && codePromo === 0) {
      const a = fetch(
        process.env.URLSERVER + "/api/promo/purcent/" + router.query.promo
      )
        .then((res) => res.json())
        .then((result) =>
        {
          const reduction = result.reduction;

          if (reduction <= 0) {
            return setCodePromo(-1);
          }
          setCodePromo(1);
          let df = [];

          for (let i = 0; i < products.length; i++) {
            let element = products[i];
            if (element.price[1] == false) {
              element.price[1] = reduction;
            } else {
              element.price[1] = element.price[1] + reduction;
            }
            df[i] = element;
          }
          setAllProduct(df);
        });
    }
  }, [router.query]);

  useEffect(() =>
  { 
    const myCart = localStorage.getItem("cart");
    const myTotal = localStorage.getItem("total");

    myCart && setCart(JSON.parse(myCart));
    myTotal && setTotal(JSON.parse(myTotal));
  }, [])
  useEffect(() =>
  {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", JSON.stringify(total));
  }, [total, cart]);

  useEffect(() =>
  {
    if (router.query.produit) {
      const productId = router.query.produit;

      const ObjProdOnUrl = allProduct.find((i) => i._id == productId);
      if (ObjProdOnUrl) {
        setSeeProduit(ObjProdOnUrl);
        setActiveModaleProduit(true);
      }
    }
  }, [router.query]);

  return (
    <>
    {activeModaleProduit ? <HeadComponents  title={seeProduit.name} description={seeProduit.description} image={seeProduit.image[0]} /> : <HeadComponents/> }

      {router.isReady ? (
        <main className={consumer}>
          <Header darkTheme={darkTheme} setDarkTheme={(e) => setDarkTheme(e)} />
         
          <FilterBar
            Type={type}
            setData={(e) => setData(e)}
            allProduct={allProduct}
          />

          <AsideBar
            cart={cart}
            setCart={(e) => setCart(e)}
            total={total}
            setTotal={(t) => setTotal(t)}
            setActiveCommand={(e) => setActiveCommand(e)}
          />

          <MainDiv
            Type={type}
            products={data}
            setCart={(C) => setCart(C)}
            total={total}
            setTotal={(t) => setTotal(t)}
            setActiveModaleProduit={(bol) => setActiveModaleProduit(bol)}
            setSeeProduit={(p) => setSeeProduit(p)}
          />

          {seeProduit && (
            <ModalProduit
            contentClassName={consumer}
              show={activeModaleProduit}
              setShow={(cmd) => setActiveModaleProduit(cmd)}
              seeProduit={seeProduit}
              setCart={(cmd) => setCart(cmd)}
              total={total}
              setTotal={(t) => setTotal(t)}
            />
          )}

          <DoCommand
            contentClassName={consumer}
            show={ActiveCommand}
            setShow={(e) => setActiveCommand(e)}
            cart={cart}
            deliver={deliver}
          />

          <Footer />
        </main>
      ) : (
        <Spiner />
      )}
    </>
  );
};

export async function getStaticProps() {

  let res = await fetch(process.env.URLSERVER+ "/api/products");
  res = await res.json();

const products = res.products
 
  let type = [];

  for (let i = 0; i < products.length; i++) {
    const e = products[i];
    for (let j = 0; j < e.type.length; j++) {
      const t = e.type[j];
      const v = type.includes(t);
      !v && (type = [...type, t]);
    }
  }

  return {
    props: {
      type: type.sort(() => Math.random() - 0.5),
      products: products.sort(() => Math.random() - 0.5),
      deliver:res.deliver
    },

    revalidate: 5400,
  };
};
