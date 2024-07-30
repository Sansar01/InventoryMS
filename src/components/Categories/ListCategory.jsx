import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


const ListCategory = () => {

    const [category, setCategory] = useState([])
    const [editingId, setEditingId] = useState(null);
    const [updateCategory, setupdateCategory] = useState('')

    useEffect(() => {

        const getListCategory = async () => {

            try {
                const response = await axios.get('https://processing-management-system-api.vercel.app/api/categories');

                const value = await response.data;

                setCategory(value);

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        getListCategory();
    }, []);


    const handleEdit = (id, currentName) => {
        setEditingId(id);
        setupdateCategory(currentName);
    };

    const handleInputChange = (e) => {
        setupdateCategory(e.target.value);
    };

    const handleUpdate = async (categoryId) => {
        console.log("categoryId ", categoryId);
        try {
            await axios.put(`https://processing-management-system-api.vercel.app/api/categories/${categoryId}`, {
                category_name: updateCategory
            });


            // Update the local state with the new category name
            setCategory((prev) => prev.map((item) => item._id === categoryId ? { ...item, category_name: updateCategory } : item));


            setEditingId(null); // Stop editing

        } catch (error) {
            console.error('There was an error updating the category!', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://processing-management-system-api.vercel.app/api/categories/${id}`);

            setCategory(category.filter(category => category._id !== id));
        }
        catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className="content-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                                <div>
                                    <h4 className="mb-3">Category List</h4>
                                    <p className="mb-0">Use category list as to describe your overall core business from the provided list. <br></br>
                                        Click the name of the category where you want to add a list item. .</p>
                                </div>
                                <Link to='/dashboard/addcategory' className="btn btn-primary add-list"><i className="las la-plus mr-3">Add Categoy</i></Link>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="table-responsive rounded mb-3">
                                <table className="data-table table mb-0 tbl-server-info">
                                    <thead className="bg-white text-uppercase">
                                        <tr className="ligth ligth-data">
                                            {/* <th>
                                                    <div className="checkbox d-inline-block">
                                                        <input type="checkbox" className="checkbox-input" id="checkbox1" />
                                                        <label for="checkbox1" className="mb-0"></label>
                                                    </div>
                                                </th> */}
                                            <th>Category Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="ligth-body">
                                        {
                                            category.map((item, index) => (

                                                <tr key={index}>
                                                    {/* <td>
                                                            <div className="checkbox d-inline-block">
                                                                <input type="checkbox" className="checkbox-input" id="checkbox2" />
                                                                <label for="checkbox2" className="mb-0"></label>
                                                            </div>
                                                        </td> */}

                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                {
                                                                    editingId === item._id ? (
                                                                        <input
                                                                            type="text"
                                                                            value={updateCategory}
                                                                            onChange={handleInputChange}
                                                                            className='form-control'
                                                                        />
                                                                    ) : (
                                                                        <div>{item.category_name}</div>
                                                                    )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="d-flex align-items-center list-action">
                                                            {
                                                                editingId === item._id ? (
                                                                    <Link className="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Save"
                                                                        onClick={() => handleUpdate(item._id)}><SaveOutlinedIcon /></Link>
                                                                ) : (
                                                                    <Link className="badge bg-success mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"
                                                                        onClick={() => handleEdit(item._id, item.category_name)}><ModeOutlinedIcon /></Link>
                                                                )
                                                            }
                                                            <Link className="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                                                                onClick={() => handleDelete(item._id)}><DeleteOutlineOutlinedIcon /></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ListCategory
