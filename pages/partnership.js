import  { useState, useEffect } from "react";
import Fde from "react-reveal/Fade";
import HeadPartenar from "../components/headPartenar.jsx";
 import MoneyPartenar from "../components/MoneyPartenar..jsx";
import Header from "../components/header";
import Footer from "../components/footer";
import {useClass} from "../plugin/thme.js";
import HeadComponents from  "../components/HeadComponents"


const Partenaire = () => {
    const [darkTheme, setDarkTheme,consumer] = useClass();
  
    const [isAffiliate, setIsAffiliate] = useState(-1);

  useEffect(() => {
    setIsAffiliate(JSON.parse(sessionStorage.getItem("userInfo")).promo.value)
  }, [])  

  return (
    <>
        <HeadComponents title="Partenariat" />

    <main className={consumer} >
      <Header darkTheme={darkTheme} setDarkTheme={t=>setDarkTheme(t)} />
      <HeadPartenar state={isAffiliate} />
      {(isAffiliate== 1) && <MoneyPartenar/>}



      <Footer/>
     </main>
     </>
  );
};

export default Partenaire;
 