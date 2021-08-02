import Head from "next/head";

const defaultMeta = {
  title: process.env.NAMEWEBSITE,
  url: process.URLCLIENT,
  image: "/img/sac.jpg",
  description:
    "Achat en ligne des meilleurs produits et offres. Possibilité de Livraison gratuite. Découvrez  nos nombreuse collections : High tech ,Mode , Culture ,Design ,Accessoire... etc",
};

 const HeadComponents = ({
  title = defaultMeta.title,
  url = defaultMeta.url,
  image = defaultMeta.image,
  description = defaultMeta.description,
}) => {
  const meta = {
    title,
    url,
    image,
    description,
  };

  return (
    <Head>
      <meta name="google-site-verification" content="pTTbSgAS5CwwPLoa2OYdnC3y3EFiAAHDtdqm5n8oFnc" />

      
<title>{defaultMeta.title}</title>
      
      <meta name="title" content={meta.title} />
      <meta name="description" content={meta.description} />
      <meta name="image" content={meta.image} />

      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:url" content={meta.url} />

      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </Head>
  );
};
export default HeadComponents;
