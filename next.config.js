module.exports = {
  reactStrictMode: true,
    env: {
      "NAMEWEBSITE" : "Cless",
      "URLCLIENT":"https://cless.pages.dev",
      "URLSERVER":"https://cless-server.herokuapp.com",
      "HOST_IMG":"https://firebasestorage.googleapis.com/v0/b/cless-image.appspot.com/o/"
    },
    images: {
      loader: 'imgix',
      path: 'https://firebasestorage.googleapis.com/v0/b/cless-shop.appspot.com/o/',
      domains: ["https://firebasestorage.googleapis.com"]
    },
  } 
  