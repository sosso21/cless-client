import  { useRef  } from "react";
import FormPeomo from "./formPartenar..jsx";
import Fade from 'react-reveal/Fade';
import Image from 'next/image';
import StylePartenar from "../styles/partener.module.css"
  const HeadPartenar = ({state = -1}) => {
  
  const formRef = useRef()

  return (
    <>
      <section className={StylePartenar.headSection}>
      <Fade bottom> 
        <h2 className={ StylePartenar.fsBig+" my-4"}>
          {state == 1 ? "VOUS ÊTES" : "DEVENEZ"} PARTENAIRE !
        </h2>

        <p className="mb-5">
          GAGNEZ des CADEAUX , du CACHE. Offrez è vos amis et votre audience des
          PROMOTIONS avec votre code promo. 
        </p>
      </Fade>

        <button onClick={()=>formRef.current.scrollIntoView({ behavior: 'smooth' })} className="btn btn-dark rounded-circle btn-lg mt-5 bi bi-chevron-down">
          
        </button>
      </section>

      <section className="mx-auto my-4 ">
        
        <h2 className="fw-lighter w-100 text-center">
        {state == 1 ? "UTILISEZ" : "DEMANDEZ"} VOTRE CODE PROMO
        </h2>
        <div  ref={formRef} className={StylePartenar.flexSmJustify}> 
        
        <Image 
        loader={()=>"/img/draw.png"}
        src="/img/draw.png"
        width={500}
        height={500}
      />
      <FormPeomo/>
        </div>
 
      </section>
    </>
  );
};

export default HeadPartenar;


