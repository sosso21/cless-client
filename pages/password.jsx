import  { useState,useEffect } from 'react';
import Header from  "../components/header";
import Footer from "../components/footer.js";
import { useRouter } from "next/router";
import Flip from 'react-reveal/Flip';
import { useClass } from "../plugin/thme.js";
import StyleLog from "../styles/log.module.css"
import HeadComponents from  "../components/HeadComponents"



    
const Password=() => {
  
  const [darkTheme, setDarkTheme, consumer] = useClass();
  
  const router = useRouter();

  const [missingPassState,setMissingPassState]=useState(1)
  const [mpInfo,setMpInfo]=useState({ omp: "",mp1: "",mp2: "" })
  const [err,setErr]=useState('')


  const resetPass=(e) => {
    e.preventDefault()
    if (mpInfo.mp1!=mpInfo.mp2) {
      return setErr("les mots de passes ne sont pas identiques")
    }

    const header={
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams({
        authorization: router.query.token,
        pass: mpInfo.mp1
      }).toString()
    };

    fetch(`${process.env.URLSERVER}/api/resetPasswordForget`,header)
      .then(res => res.json())
      .then((result) => {
        setErr(result.response)
        if (result.response=="success") {
          setTimeout(() => {
            setMissingPassState(3)
          },3000);
        } 

      },
        (err) => {
          console.log('Une erreur c\' est produit:',err)
        }
      )
  }

  const resetWhithOldPass =(e)=>{
    e.preventDefault();
    if (mpInfo.mp1!=mpInfo.mp2) {
      return setErr("les mots de passes ne sont pas identiques")
    }
    
    const header={
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams({
        operation :'password',
        token: localStorage.getItem("token"),
        form: JSON.stringify({
        pass:  mpInfo.omp,
        newPass: mpInfo.mp1
      })}).toString()
    };
    
    fetch(process.env.URLSERVER+"/api/updateUser" ,header)
      .then(res => res.json())
      .then((result) => {
        
        result.response ?  setErr(result.response) :  setErr(result.error)

        if (result.response=="success") {
          setTimeout(() => {
            setMissingPassState(3)
          },3000);
        }

      },
        (err) => {
          console.log('Une erreur c\' est produit:',err)
        }
      )

  }

  const sendEmail =(e)=>{
    e.preventDefault()
    const email = JSON.parse(sessionStorage.getItem("userInfo")).email

    const header={
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams({
        email : email
    }).toString()
    };
    
    fetch(process.env.URLSERVER+"/api/sendEmailToResetPwd" ,header)


  }

  useEffect(() => {
    
    if (router.query.token) {
      setMissingPassState(2);

    }
  },[])


  return (
    <>
        <HeadComponents title="Réninitialiser le Mot de Passe" />

    <main className={consumer + " min-vh-100 w-100 d-flex align-content-between  justify-content-between flex-column"}>
        <Header darkTheme={darkTheme} setDarkTheme={(e) => setDarkTheme(e)} />
      <section className={"container text-center "+StyleLog.wResponsive}>
        <h1 className="fw-lighter my-4">Redéfinissez votre mot de passe</h1>


        {(missingPassState==1)&&<div>
          <Flip right>
            <form className='text-center my-4' onSubmit={e => resetWhithOldPass(e)}>
              <div className="input-group my-1">
                <input value={mpInfo.omp} onChange={e => setMpInfo({ omp: e.target.value,mp1: mpInfo.mp1,mp2: mpInfo.mp2 })} type="password" placeholder='Ancien mot de passe' className="form-control w-100" required />
              </div>
              <div className="input-group my-1">
                <input value={mpInfo.mp1} onChange={e => setMpInfo({ mp1: e.target.value,omp: mpInfo.omp,mp2: mpInfo.mp2 })} type="password" placeholder='Nouveau mot de passe' className="form-control w-100" required />
              </div>
              <div className="input-group my-1">
                <input value={mpInfo.mp2} onChange={e => setMpInfo({ mp2: e.target.value,mp1: mpInfo.mp1,omp: mpInfo.omp })} type="password" placeholder='confirmez le mot de passe' className="form-control w-100" required />
              </div>
              {err&&<div>
                {(err=="success")? <p className="alert alert-success">mot de passe modifier avec succès ! </p>:<p className="alert alert-danger"> {err} 
</p>}
              </div>}
   <p>Mot de passe oublié ? <i onClick={e=>sendEmail(e)} className="pointer text-primary"> Envoyer un email </i> </p>
              <button type="submit" className="btn-lg btn btn-hermes">Réinitialiser</button>
            </form>
          </Flip>
        </div>}

        {(missingPassState==2)&&<div>
          <Flip right>
            <form className='text-center my-4' onSubmit={e => resetPass(e)}>
              <div className="input-group my-1">
                <input value={mpInfo.mp1} onChange={e => setMpInfo({ mp1: e.target.value,omp: mpInfo.omp,mp2: mpInfo.mp2 })} type="password" placeholder='Nouveau mot de passe' className="form-control w-100" required />
              </div>
              <div className="input-group my-1">
                <input value={mpInfo.mp2} onChange={e => setMpInfo({ mp2: e.target.value,mp1: mpInfo.mp1,omp: mpInfo.omp })} type="password" placeholder='confirmez le mot de passe' className="form-control w-100" required />
              </div>
              {err&&<div>
                {(err=="success")? <p className="alert alert-success">mot de passe modifier avec succès ! </p>:<p className="alert alert-danger"> {err}</p>}

              </div>}
              <button type="submit" className="btn-lg btn btn-hermes">Réinitialiser</button>
            </form>
          </Flip>
        </div>}

        {(missingPassState==3)&&<div align="center" className="mb-5 text-success" >
          <Flip cascade>
            <i className="bi bi-check-circle-fill"> </i>
          </Flip>
        </div>}
      </section>
      <Footer />
    </main>
    </>
  );
};

export default Password