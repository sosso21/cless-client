import { useState, useEffect } from 'react';
import Header from "../../../components/header"
import Footer from "../../../components/footer"
import Affiliation from '../../../components/admin/affiliationAdmin.jsx'
import Payment from '../../../components/admin/asktoPayAdmin.jsx'
import Newsletter from '../../../components/admin/newsletterAdmin.jsx';
import AddProduct from '../../../components/admin/addProduct.jsx';
import Social from '../../../components/admin/social.jsx';
import { useClass } from "../../../plugin/thme.js";
import { useRouter } from "next/router";
import Link from "next/link";

const linkDb = process.env.URLSERVER + "/admin/plugins/content-manager/collectionType/application::client.client"
const clientLinkDB = process.env.URLSERVER + '/admin/plugins/content-manager/collectionType/application::client.client/'


export default () =>{

  const router = useRouter();
  const [darkTheme, setDarkTheme, consumer] = useClass();
  const [AffiliationReq, setAffiliationReq] = useState([])
  const [AskToPayReq, setAskToPayReq] = useState([])


  const callBackResult = (result) =>
  {
    if (result.error == "disconnect")
    {
      sessionStorage.clear();
      localStorage.clear();
      return router.push("/")
    }
    setAffiliationReq(result.Affiliates)
    setAskToPayReq(result.AskToPay)
  }

  useEffect(() =>{
    
    fetch(process.env.URLSERVER + "/api/getAffiliationProgramInfo/"+localStorage.token)
      .then(res => res.json())
      .then((result) =>
      {
        
        callBackResult(result)
      }
        ,
        (err) =>
        {
          console.log('Une erreur c\' est produit:', err)
        }
      )
  }, [ ])

  const handleEditUser = (e, operation, idUser) =>
  {
    e.preventDefault()
    fetch(process.env.URLSERVER + "/api/admin/setUser", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams({
        token: localStorage.token,
        op: operation,
        idUser: idUser

      }).toString()
    })
      .then(res => res.json())
      .then(result =>
      {
        callBackResult(result)
      }
        ,
        (err) =>
        {
          console.log('Une erreur c\' est produit:', err)
        }
      )
  }

  const onglet = [
    {
      name: "membres",
      url: "members",
      components: [
        {
          name: "Affiliations",
          url: "affiliation",
          components: <Affiliation handleEditUser={handleEditUser} users={AffiliationReq} linkDb={linkDb} clientLinkDB={clientLinkDB} />
        },
        {
          name: "Paiments",
          url: "payment",
          components: <Payment handleEditUser={handleEditUser} users={AskToPayReq} linkDb={linkDb} clientLinkDB={clientLinkDB} />
        },
        {
          name: "Newsletter",
          url: "newsletter",
          components: <Newsletter />
        }
      ]
    }, {
      name: "Produits",
      url: "product",
      components: [ {
        name: "Ajout de Produits",
        url: "addProduct",
        components:  <AddProduct/>
      },{
        name: "Réseaux Sociaux",
        url: "social",
        components:  <Social/>
      }
    ]
    }
  ]




  return (
    <>

      <main className={consumer + " min-vh-100 w-100 d-flex align-content-between  justify-content-between flex-column"}>
        <Header darkTheme={darkTheme} setDarkTheme={(e) => setDarkTheme(e)} />


        <nav>
        <h1 className="fw-lighter p-4">Panneau d'administrateurs</h1>
          <ul className="nav nav-tabs nav-fill">
            {onglet.map(item =>
              <li className="nav-item">
                <Link href={"/admin/" + item.url}>
                  <a className=
                    {(item.url == router.query.section) ? 'nav-link active' : ' nav-link'} >{item.name}</a>
                </Link>
              </li>
            )}
          </ul>

        {onglet.filter(i => i.url == router.query.section)[0] &&
          
            <ul className="nav nav-tabs nav-fill">
              {onglet.filter(i => i.url == router.query.section)[0].components.map(item =>
                <li className="nav-item">
                  <Link href={"/admin/"+router.query.section+"/"+item.url}>
                    <a className=
                      {(item.url == router.query.underSection) ? 'nav-link active' : ' nav-link'} >{item.name}</a>
                  </Link>
                </li>
              )}
            </ul>
        }
</nav>

{ 
onglet.filter(i=> i.url== router.query.section).filter(i=>i.url ==  router.query.underSection)
 }

        {( router.query.section && router.query.underSection &&onglet.filter(i=> i.url== router.query.section).filter(i=>i.url ==  router.query.underSection) != undefined  ) && <div className="px-4  w-100">
             
{onglet.filter(item => item.url == router.query.section)[0].components.filter(item => item.url == router.query.underSection)[0].components}
</div>
        }

        <Footer />
      </main>


    </>
  );
};



 