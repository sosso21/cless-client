import  {useState} from 'react';
import Error from "../error.jsx"


const NewsLetter = () => {
    const [obj , setObj]= useState('');
    const [body , setBody]= useState('');
    const [err , setErr]= useState('');
  
const handleSend = (e)=>{
    e.preventDefault()
    
    fetch(process.env.URLSERVER+"/api/sentNewsLetter",{
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: new URLSearchParams({
          token: localStorage.token,
          obj : obj,
          bodyMail : body
        }).toString()
      })
        .then(res => res.json())
        .then((result)=>{
          
    if(result.error=="disconnect"){
      sessionStorage.clear();
       localStorage.clear();
       return window.location.pathname ='/'
      }
      setErr(result);
      setObj('')
      setBody('')
      setTimeout(() => {
        setErr("");
      }, 10000);
      
            
          },
          (err) => {
            console.log('Une erreur c\' est produit:',err)
          }
        )

}

    return (
      
        <section>
        {err ? <span className='h-100 w-100 my-4 '> <Error response={err} />  </span> : 
        <form className="my-4 mx-auto w-100 d-flex justify-content-around align-content-around flex-column" onSubmit={e=>handleSend(e)}>
  <div className="input-group">
    <input value={obj} onChange={e=>setObj(e.target.value)} type="text" className="form-control bg-dark text-light w-100" placeholder="objet du mail"/>
  </div>
        <div className="input-group">
        
    <textarea value={body} onChange={e=>setBody(e.target.value)} className="form- bg-dark text-light w-100"  rows="5" placeholder="corp d du mail    <>L'intégration HTML est possible</>"/>
  </div>
  
  <button className='mx-auto btn btn-hermes btn-lg'>Envoyer</button>
 
        </form>}
        </section>
        
    );
};

 
 

export default NewsLetter