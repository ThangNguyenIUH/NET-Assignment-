import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Category from "./Category";

const CategoryUpdate = ()   => {    
  const CategoryAPI = (url = "https://localhost:7054/api/Category") => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updateRecord) => axios.put(`${url}/${id}`, updateRecord),
    };
  };

  const params = useParams();
  const initialValue = {
    name: "",
    type: "",
  };
  const [values, setvalues] = useState(initialValue);
  const [errors, seterrors] = useState({});

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await CategoryAPI().fetchAll();
        const CategoryList = response.data;
        const findCategoryById = CategoryList.find((x) => x.id.toString() === params.CategoryId);
        setvalues(findCategoryById)
      } catch (error) {
        console.log("Failed to fetch Category list : ", error);
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
  const validate = () => {
    let temp = {};
    temp.name = values.name === "" ? false : true;
    temp.type = values.type === "" ? false : true;
    seterrors(temp);
    return Object.values(temp).every((x) => x === true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("id", values.id);
      formData.append("name", values.name);
      formData.append("type", values.type);
      CategoryAPI()
        .update(parseInt(values.id),formData)
        .then((res) => {
          negative('/Category')
        })
        .catch((err) => console.log(err));
    }
  };
  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? "invalid-field" : "";


  const negative = useNavigate()

    return(
        <>
      <div className="container">
        <p className="lead">Create new Category</p>
      </div>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-body">
            <div>
              <div className="form-group">
              <label className="h3 form-label"> Category Name</label> 
                <input
                  className={"form-control-file" + applyErrorClass("name")}
                  placeholder="Categpry Name"
                  name="name"
                  value={values.name}
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
      </form>
      </>
    )
  }
export default CategoryUpdate;