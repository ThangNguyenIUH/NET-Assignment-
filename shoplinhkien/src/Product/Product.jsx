import React, { useEffect, useState } from "react";
import CreateNewProduct from "./CreateNewProduct";
import UpdateProduct from "./UpdateProduct";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
function Product(props) {
  const ProductAPI = (url = "https://localhost:7054/api/Product") => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updateRecord) => axios.put(`${url}/${id}`, updateRecord),
      delete: (id) => axios.delete(`${url}/${id}`),
    };
  };
  const [productList, setproductList] = useState([]);
  const [showFormCreateProduct, setshowFormCreateProduct] = useState(false)
  const [showFormUpdateProduct, setshowFormUpdateProduct] = useState(false)
  

  useEffect(() => {
    const fetchProductFromServer = async () =>{
     const response = await ProductAPI().fetchAll()
     setproductList(response.data);
    }
  
    fetchProductFromServer()
  }, []) // useEffect tự đông làm khi state thay đổi 
  
  function GetAllProduct() {
    const url = "https://localhost:7054/api/Product";

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((reposnserFromServer) => {
        console.log(reposnserFromServer);
        setproductList(reposnserFromServer);
      })
      .catch((error) => {
        console.log(error);
      });

      
  }
  const navigate = useNavigate()
  const handleDelete = async (productId) =>{
    try {
      const response=  await ProductAPI().delete(productId)
      setproductList(response.data)
      navigate('/product')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="table-responsive mt-5">
      <table className="table table-bordered border-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Img</th>
            <th scope="col">CRUD</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id}>
              <th scope="row"> {product.id} </th>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.type}</td>
              <td>
                <img src={product.imageSrc} alt=""></img>
              </td>
              <td>
              <button> 
                   <Link
                     to={`${product.id.toString()}`}
                     key={product.id}
                   >
                     Update
                   </Link>
                 </button>
                <button onClick ={()=> {if(window.confirm(`Are you sure delete # ${product.id} - ${product.name}`)) handleDelete(product.id)}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
     
      <button onClick={() => setshowFormCreateProduct(true)}>Create New Products</button>
        
      </div>
      {showFormCreateProduct && <CreateNewProduct></CreateNewProduct>}
      {showFormUpdateProduct && <UpdateProduct></UpdateProduct>}
    </div>
    
  );
}



export default Product;
