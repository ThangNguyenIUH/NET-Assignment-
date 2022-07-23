import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Product from "./Product";

const defaultImageSrc = "/img/placeholder-image.png";
const ProductUpdate = () => {
    
  const ProductAPI = (url = "https://localhost:7054/api/Product") => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updateRecord) => axios.put(`${url}/${id}`, updateRecord),
    };
  };

  const params = useParams();
  const initialValue = {
    name: "",
    price: 0,
    description: "",
    type: "",
    imageName: "",
    imageSrc: defaultImageSrc,
    imageFile: null,
  };
  const [values, setvalues] = useState(initialValue);
  const [errors, seterrors] = useState({});

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await ProductAPI().fetchAll();
        const productList = response.data;
        const findProductById = productList.find((x) => x.id.toString() === params.productId);
        setvalues(findProductById)
      } catch (error) {
        console.log("Failed to fetch product list : ", error);
      }
    };
    
    fetchAll();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setvalues({
      ...values,
      [name]: value,
    });
  };
  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      let imageName = e.target.files[0].name;

      const reader = new FileReader();
      reader.onload = (x) => {
        setvalues({
          ...values,
          imageFile,
          imageName,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
      console.log(values);
    } else {
      setvalues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };
  const validate = () => {
    let temp = {};
    temp.name = values.name === "" ? false : true;
    temp.price = values.price === "" ? false : true;
    temp.description = values.description === "" ? false : true;
    temp.type = values.type === "" ? false : true;
    temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
    seterrors(temp);
    return Object.values(temp).every((x) => x === true);
  };
  const resetForm = () => {
    setvalues(initialValue);
    document.getElementById("image-uploader").value = null;
    seterrors({});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("id", values.id);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("type", values.type);
      formData.append("imageName", values.imageName);
      formData.append("imageFile", values.imageFile);
      formData.append("imageSrc", values.imageSrc);
      ProductAPI()
        .update(parseInt(values.id),formData)
        .then((res) => {
          negative('/product')
        })
        .catch((err) => console.log(err));
    }
  };
  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? "invalid-field" : "";


  const negative = useNavigate();

  return (
    <>
      <div className="container">
        <p className="lead">Create new product</p>
      </div>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="card">
          <div style={{ display: "flex" ,marginRight:'1rem'}}>
          <img src={values.imageSrc} width="30%!important" alt=""></img>
          <div className="card-body">
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                className={"form-control-file" + applyErrorClass("imageSrc")}
                onChange={showPreview}
                id="image-uploader"
              ></input>
            </div>
            <div>
              <div className="form-group">
              <label className="h3 form-label"> Product Name</label> 
                <input
                  className={"form-control-file" + applyErrorClass("name")}
                  placeholder="Product Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group">
              <label className="h3 form-label"> Price </label> 
                <input
                  className={"form-control-file" + applyErrorClass("price")}
                  placeholder="price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group">
              <label className="h3 form-label"> Description</label> 
                <input
                  className={
                    "form-control-file" + applyErrorClass("description")
                  }
                  placeholder="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group">
              <label className="h3 form-label"> Type</label> 
                <input
                  className={"form-control-file" + applyErrorClass("type")}
                  placeholder="type"
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group text-center">
                <button type="submit" className="btn btn-info">
                  Submit
                </button>
              </div>
            </div>
          </div>
          </div>

        </div>
      </form>
    </>
  );
};

export default ProductUpdate;