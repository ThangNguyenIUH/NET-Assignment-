import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateNewCategory(props) {
    const initialFormData = Object.freeze({
        name : "Nhập tên",
        type :"Mô tả",
    })
    const [formData, setFormData] = useState(initialFormData)

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
       
    }
    const navigative = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault()
        const productCreate ={
            name : formData.name,
            type : formData.type,
        }
        const url = "https://localhost:7054/api/Category";

        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify(productCreate)
        }).then(res => res.json())
        .then(responseFromServer =>{
            console.log(responseFromServer)
            navigative("/Category")
        })
        .catch((error)=>{
            console.log(error)
        })
        alert("Thêm thành công");

        
}

    
  return (
    <div>
        <form className='w-100 px-5'>
            <h1 className='mt-5'>Create new Category</h1>
            <div className='mt-5'>
                <label className='h3 form-label'>Name</label>
                <input value={formData.name} name="name" type={'text'} className="form-control" onChange={handleChange} ></input>
            </div>
            <div className='mt-5'>
                <label className='h3 form-label'>Description</label>
                <input value={formData.type} name="type" type={'text'} className="form-control" onChange={handleChange}></input>
            </div>
            <a href="/category" onClick={handleSubmit} className="btn btn-primary">Submit</a>
            
            <a href="/category" className="btn btn-warning" >Cancel</a>
        </form>
    </div>
  )
}

export default CreateNewCategory