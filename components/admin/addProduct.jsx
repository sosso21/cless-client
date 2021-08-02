import { useState, useEffect } from "react";
import { storage } from "./firebase";
import Fade from "react-reveal/Fade";
import Error from "../error.jsx";
import Social from "./social.jsx"

const AddProduct = () => {
  const [responseMsg, setResponseMsg] = useState({});
  const [resultProduct, setResultProduct] = useState("");
  const [image, setImage] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);
  const [infoProduct, setInfoProduct] = useState({
    name: "",
    price: 99.99,
    promo: false,
    type: [],
    dectiption: "",
    note: "",
  });
  const [types, setTypes] = useState([]);
  const [InputTypes, setInputTypes] = useState("");

  const [InputModels, setInputModels] = useState([]);
  const [ProtoModel, setProtoModel] = useState([]);

  useEffect(async () => {
    let res = await fetch(process.env.URLSERVER + "/api/products");
    res = await res.json();
    const products = res.products;
    let type = [];

    for (let i = 0; i < products.length; i++) {
      const e = products[i];
      for (let j = 0; j < e.type.length; j++) {
        const t = e.type[j];
        const v = type.includes(t);
        !v && (type = [...type, t]);
      }
    }
    setTypes(type);
  }, []);

  const handleChange = (e) => {
    if (e.target.files.length && !image.filter(i=>i.raw.name == e.target.files[0].name).length ) {
      const _id = Date.now()
      setImage([
        ...image,
        {
          _id:_id,
          progress:0,
          url:"",
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0]//{...e.target.files[0], name:_id},
        },
      ]);
    }
  };
const sendImg =(img)=>{
  return new Promise((resolve, reject) => {
    let el = img;
    const uploadTask = storage.ref(`images/${img._id}_${img.raw.name}`).put(img.raw);
    uploadTask.on(
     "state_changed",
     snapshot => {
       const progress = Math.round(
         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
       );
       el= {...el,"progress": progress}
     },
     error => {
      reject(error);
     },
     () => {
       storage
         .ref("images")
         .child(img._id+"_"+img.raw.name)
         .getDownloadURL()
         .then(url => {
           resolve({...el ,url:(url).replace(process.env.HOST_IMG,"")});
         });
     }
   );
      });
}
  const handleHostImage =async()=>{
    setDisableBtn(true)
    const arr =[];
    for (let index = 0; index < image.length; index++) {
      const img = image[index];
      let el =img

    if (!img.url && img.progress == 0 ) {
    try {
      el = await sendImg(img);

    } catch (err) {
      console.log('err:', err)
    }
    }
    arr.push(el)
  }
   setImage(arr);
  setDisableBtn(false);
  }

  const handleUpload = (e) => {
    e.preventDefault();
    setResponseMsg({})
    let myModel = [];
    let AllImage =[];
    
    ProtoModel.map((i,_idParent) =>{
      let mods =[];
      i.arr.map((arr,_idItem) =>{
        let el = {_id: (+_idParent+1)+"-"+(+_idItem+1)};
        if(arr.value){el={...el,value:arr.value};}
        if(arr.img){el={...el,img:arr.img};}
        if(arr.color){el={...el,color:arr.color};}
        mods.push(el)
      })
      myModel.push(mods)
    });
    image.map(i=> AllImage.push(i.url) )
    

    
     fetch(process.env.URLSERVER + "/api/uploadProduct", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams({
        name: infoProduct.name,
        description: infoProduct.dectiption,
        price:JSON.stringify([+infoProduct.price, (!infoProduct.promo || infoProduct.promo<=0)?false: +infoProduct.promo]),
        image:JSON.stringify(AllImage),
        type:JSON.stringify(infoProduct.type),
        models:JSON.stringify(myModel),
        note: infoProduct.note,
        token:localStorage.token
      }).toString(),
    })
      .then((res) => res.json())
      .then((result) => {
        if(result.success){
          setResultProduct(result.success)
          return setResponseMsg({success:`produit ajouté ! id du produit: ${result.success._id} `})
        }
        setResponseMsg(result )
      });
  };

  const addNewInputModel = () => {
    const _id = Date.now();
    setProtoModel([...ProtoModel, { _id: _id, arr: [] }]);
    setInputModels([
      ...InputModels,
      { _id: _id, arr: { value: "", color: "", img: "" } },
    ]);
  };
  const changeInput = (_id, changemnt) => {
    let arr = [];

    for (let index = 0; index < InputModels.length; index++) {
      const element = InputModels[index];
      if (element._id == _id) {
        arr = [
          ...arr,
          { _id: element._id, arr: { ...element.arr, ...changemnt } },
        ];
      } else {
        arr = [...arr, element];
      }
    }
    setInputModels(arr);
  };

  const addModel = (e, _id) => {
    e.preventDefault();
    let arr = [];
    let IM = InputModels;
    for (let index = 0; index < ProtoModel.length; index++) {
      const element = ProtoModel[index];
      if (element._id == _id) {
        arr = [
          ...arr,
          { _id: _id, arr: [...element.arr, InputModels[index].arr] },
        ];
        IM[index] = { _id: _id, arr: { value: "", color: "", img: "" } };
      } else {
        arr = [...arr, element];
      }
    }
    setProtoModel(arr);
    setInputModels(IM);
  };

  const DelArray = (_id) => {
    setProtoModel(ProtoModel.filter((i) => i._id != _id));
    setInputModels(InputModels.filter((i) => i._id != _id));
  };

  return (
    <section className="p-4  w-100 min-vh-100 text-center d-flex justify-content-around align-content-around flex-column">
      <div>
        <h2 className="fw-lighter mx-auto my-4">Images</h2>
        {image.length != 0 &&
        <div className="d-flex justify-content-center align-content-center flex-wrap">
          {image.map((i) => (
            <Fade top>
              <i className="my-2 d-flex flex-column w-25">
              <img
                className="pointer"
                onDoubleClick={() =>
                  setImage(image.filter((e) => e._id != i._id))
                }
                onClick={() => navigator.clipboard.writeText(i.url)}
                src={i.preview}
                alt={i._id}
                width="150"
                height="150"
              />
              <progress value={i.progress} max="100" />
              </i>
            </Fade>
          ))}
          </div>}
        
      </div>
      <label
        htmlFor="upload-button"
        className="d-block w-50 h-50 my-4 mx-auto  border border-hermes pointer"
      >
        <span className="bg-hermes">
          <i className="fs-1 bi bi-image-fill"></i>
        </span>
        <h5 className="text-center">Uploadez vos images </h5>
      </label>
      {image.length != 0 && <button 
        onClick={()=>handleHostImage()} className={`btn btn-warning btn-lg w-25 mx-auto ${disableBtn && " disabled"}`}  ><i className="bi bi-cloud-upload-fill"></i> Héberger les images</button> }
      <input
        type="file"
        id="upload-button"
        className="d-none"
        onChange={handleChange}
        />

      <h2 className="fw-lighter mx-auto my-4">Titre & prix</h2>
      <div className="input-group m-4">
        <input
          type="text"
          className="form-control mx-1"
          onChange={(e) =>
            setInfoProduct({ ...infoProduct, name: e.target.value })
          }
          value={infoProduct.name}
          placeholder="Titre"
        />
        <input
          type="number"
          className="form-control mx-1"
          onChange={(e) =>
            setInfoProduct({ ...infoProduct, price: e.target.value })
          }
          value={infoProduct.price}
          placeholder="Prix"
        />
        <input
          type="number"
          className="form-control mx-1"
          onChange={(e) =>
            setInfoProduct({ ...infoProduct, promo: e.target.value })
          }
          value={infoProduct.promo}
          placeholder="Réduction"
        />
      </div>

      <h2 className="fw-lighter mx-auto my-4">Catégories</h2>

      <div className="m-4 d-flex justify-content-center align-content-center">
        {types.map((i) => (
          <Fade bottom>
            <button
              className="btn btn-dark btn-sm mx-1"
              onClick={() =>
                !infoProduct.type.includes(i) &&
                setInfoProduct({
                  ...infoProduct,
                  type: [...infoProduct.type, i],
                })
              }
            >
              {i}
            </button>
          </Fade>
        ))}
      </div>

      <div className="m-4 d-flex justify-content-center align-content-center">
        {infoProduct.type.map((i) => (
          <Fade bottom>
            <button
              className="btn btn-hermes btn-sm mx-1"
              onClick={() =>
                setInfoProduct({
                  ...infoProduct,
                  type: infoProduct.type.filter((ii) => ii != i),
                })
              }
            >
              {i}
            </button>
          </Fade>
        ))}
      </div>

      <form className="input-group w-50 m-auto">
        <input
          type="text"
          className="form-control"
          value={InputTypes}
          onChange={(e) => setInputTypes(e.target.value)}
        />
        <button
          className="btn btn-hermes btn-lg mx-auto bi bi-upload"
          onClick={(e) => {
            e.preventDefault();
            if (!infoProduct.type.includes(InputTypes)) {
              setInfoProduct({
                ...infoProduct,
                type: [...infoProduct.type, InputTypes.toLowerCase()],
              });
              setInputTypes("");
            }
          }}
        ></button>
      </form>

      <h2 className="fw-lighter mx-auto my-4">Models</h2>
      <div>
        <div className="input-group">
          <textarea
            value={JSON.stringify(ProtoModel)}
            className="form-control bg-dark text-light m-4"
            rows="10"
          ></textarea>
        </div>

        <div>
          {InputModels.map((i, index) => (
            <Fade bottom>
              <form className="input-group">
                <i
                  onClick={() => DelArray(i._id)}
                  className="btn btn-danger btn-lg bi bi-x"
                ></i>
                <input
                  type="text"
                  onChange={(e) =>
                    changeInput(i._id, { value: e.target.value })
                  }
                  value={i.arr.value}
                  className="form-control m-1"
                  placeholder="titre"
                />
                <input
                  type="text"
                  onChange={(e) =>
                    changeInput(i._id, { color: e.target.value })
                  }
                  value={i.arr.color}
                  className="form-control m-1"
                  placeholder="couleur"
                />
                <input
                  type="text"
                  onChange={(e) => changeInput(i._id, { img: e.target.value })}
                  value={i.arr.img}
                  className="form-control m-1"
                  placeholder="lien Image"
                />
                <button
                  className="btn btn-hermes btn-lg m-1 bi bi-upload"
                  onClick={(e) => addModel(e, i._id)}
                ></button>
              </form>
            </Fade>
          ))}
          <button
            className="btn btn-hermes btn-lg m-y bi bi-plus-lg"
            onClick={() => addNewInputModel()}
          ></button>
        </div>
      </div>

      <h2 className="fw-lighter mx-auto my-4">Description </h2>
      <div className="input-group m-4">
        <textarea
          className="form-control bg-dark text-light"
          rows="10"
          onChange={(e) =>
            setInfoProduct({ ...infoProduct, dectiption: e.target.value })
          }
          value={infoProduct.dectiption}
          placeholder="dectiption"
        />
      </div>

      <h2 className="fw-lighter mx-auto my-4">Notes</h2>
      <div className="input-group m-4">
        <textarea
          className="form-control bg-dark text-light"
          rows="10"
          onChange={(e) =>
            setInfoProduct({ ...infoProduct, note: e.target.value })
          }
          value={infoProduct.note}
          placeholder="note"
        />
      </div>

      <div className="input-group p-4 ">
        <button 
          className={`btn btn-hermes btn-lg mx-auto ${disableBtn && " disabled"}`}
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
      <div onDoubleClick={()=> setResponseMsg({})} className="mx-auto w-50">
        <Fade bottom>
         <Error response={responseMsg} />
        </Fade>
      </div>
      {resultProduct && <Social product={resultProduct} />}
    </section>
  );
};
export default AddProduct;
