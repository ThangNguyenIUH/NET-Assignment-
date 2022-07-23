import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './Product/Product';
import ProductUpdate from './Product/UpdateProduct';
import Category from './Category/Category';
import CategoryUpdate from './Category/UpdateCategory';
import CreateNewCategory from './Category/CreateNewCategory';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App></App>}>
            <Route path='/product' element={<Product></Product>}></Route>
            <Route path='/product/:productId' element={<ProductUpdate></ProductUpdate>}></Route>
            <Route path='/Category' element={<Category></Category>}>
           
            </Route>
            <Route path='/Category/new' element={<CreateNewCategory></CreateNewCategory>}></Route>
            <Route path='/Category/:CategoryId' element={<CategoryUpdate></CategoryUpdate>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
