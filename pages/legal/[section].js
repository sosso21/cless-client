import  { useEffect, useRef } from "react";
import Header from "../../components/header"
import Footer from "../../components/footer";
import conditions from  "../api/condition.json"
import Mentions from "../../components/mention.jsx"
import request from "../api/request.json"
import { useClass } from "../../plugin/thme.js";
import { useRouter } from "next/router";
import HeadComponents from  "../../components/HeadComponents"






const Legal = () =>{ 
          const router = useRouter();
          const [darkTheme, setDarkTheme, consumer] = useClass();
 
  const faaq = useRef()
  const mention = useRef()
  const condition = useRef()


  useEffect(() => {
    const  path = router.query.section
    if(path){
      if(path == "faq"){
        faaq.current.scrollIntoView({ behavior:'smooth'})
      }
      else if(path == "mention"){
        mention.current.scrollIntoView({ behavior:'smooth'})
      }
      else if(path == "conditions"){
        condition.current.scrollIntoView({ behavior:'smooth'})
      }
    }

  }, [router.query])


  return (
    <>

    <main className={consumer}>
    
              <Header darkTheme={darkTheme} setDarkTheme={(e) => setDarkTheme(e)} />
      <div className="container">

        <section className="my-4">
          <h2 ref={faaq} className="fw-lighter">FAQ:</h2>
          <ul>
            {
              request.map(i => <li className="my-1">
                <h3>{i.req}</h3>
                <article>{i.res} </article>
              </li>)
            }
          </ul>
        </section>
        <section className="my-4">
          <h2 ref={mention} className="fw-lighter">Mentions légals:</h2>
          <Mentions />
        </section>

        <section className="my-4">
          <h2 ref={condition} className="fwt-lighter">Conditions générales de vente concernent et d'utilisation;</h2>

          <article>
            <ul>
              {conditions.li.map(i => <li>{i}</li>)}
            </ul>
          </article>

        </section>

      </div>

      <Footer />
    </main>
    </>
  );
};

export default Legal;
 