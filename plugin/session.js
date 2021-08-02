
export const session =() =>{
const token = localStorage.getItem("token");
  if (token && !sessionStorage.getItem("userInfo")) { 
    const header={
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams({
      token:token
      }).toString()
    };

    fetch( `${process.env.URLSERVER }/api/connect`,header )
      .then( res => res.json() )
      .then(result=> {
        if ( result.error=='disconnect' ) {
         return  localStorage.clear();
        }
        if ( result.token ) { 
          localStorage.setItem( "token",result.token );
          sessionStorage.setItem("userInfo",JSON.stringify(result.userInfo));
          result.isAdmin && window.location.reload()

        }
      },
        ( err ) => {
          console.log( 'Une erreur c\' est produit:',err )
        }
      )
  }
}
