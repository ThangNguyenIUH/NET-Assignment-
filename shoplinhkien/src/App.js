
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';
import Header from './pages/Header/Header';
import Product from './Product/Product';

function App() {
  const [showProduct, setshowProduct] = useState(false)
  function getProduct(){
    const url ="https://localhost:7054/api/Product"

    fetch(url,{
      method:'GET'
    }).then(res => res.json())
    .then((responsefronserver)=>{
      console.log(responsefronserver)
    })
    .catch(error => {
      console.log(error)
    })
  }
  return (
    <>
      <Header></Header>
      {/* <nav >
        <Link to='/Category' style={{marginRight:'20px'}}>Category</Link>
        <Link to='/product'>Product</Link>
      </nav>
      <Outlet></Outlet> */}
    </>
  );
  
  function renderTable() {
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
            {Product.map((Product) => (
              <tr key={Product.id}>
                <th scope="row"> {Product.id} </th>
                <td>{Product.name}</td>
                <td>{Product.price}</td>
                <td>{Product.description}</td>
                <td>{Product.type}</td>
                <td>
                  <img src="{product.img}"></img>
                </td>
                <td>
                <nav style={{padding:'1rem', borderRight:"1px solid"}}>
                    <button><Link to={`${Product.id.toString()}`} key={Product.id} style={{display:'block',margin:'1rem'}}>
                          Update
                        </Link>
                    </button>
                  </nav>
                  <button className="btn btn-secondary btn-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
