import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import CreateNewCategory from "./CreateNewCategory";
import UpdateCategory from "./UpdateCategory";

function Category(props) {
  const CategoryAPI = (url = "https://localhost:7054/api/Category") => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updateRecord) => axios.put(`${url}/${id}`, updateRecord),
      delete: (id) => axios.delete(`${url}/${id}`),
    };
  };
  const [CategoryList, setCategoryList] = useState([]);
  const [showFormCreateCategory, setshowFormCreateCategory] = useState(false);
  const [showFormUpdateCategory, setshowFormUpdateCategory] = useState(false);

  useEffect(() => {
    const fetchCategoryFromServer = async () => {
      const response = await CategoryAPI().fetchAll();
      setCategoryList(response.data);
    };

    fetchCategoryFromServer();
  }, []);

  const navigate = useNavigate();
  const handleDelete = async (CategoryId) => {
    try {
      const response = await CategoryAPI().delete(CategoryId);
      setCategoryList(response.data);
      navigate("/Category");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-responsive mt-5">
      <table className="table table-bordered border-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">CRUD</th>
          </tr>
        </thead>
        <tbody>
          {CategoryList.map((Category) => (
            <tr key={Category.id}>
              <th scope="row"> {Category.id} </th>
              <td>{Category.name}</td>
              <td>{Category.type}</td>
              <td>
                <button>
                  <Link to={`${Category.id.toString()}`} key={Category.id}>
                    Update
                  </Link>
                </button>
                <a
                  href="/category"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure delete # ${Category.id} - ${Category.name}`
                      )
                    )
                      handleDelete(Category.id);
                  }}
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Link to="/Category/new">Create New Category</Link>
      </div>

      {showFormCreateCategory && <CreateNewCategory></CreateNewCategory>}
      {showFormUpdateCategory && <UpdateCategory></UpdateCategory>}
    </div>
  );
}
export default Category;
