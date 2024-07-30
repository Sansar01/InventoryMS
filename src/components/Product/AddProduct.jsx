import React, { useEffect, useState, useContext } from 'react'
import axios from "axios";
import { Context } from "../Contexts/Context";

const AddProduct = () => {

    const userId = localStorage.getItem("userId");

    const [formData, setformData] = useState({
        sku: '',
        name: '',
        description: '',
        unitOfMeasure: '',
        category: 'select',
        color: '',
        weight: '',
        createdBy: userId
    })

    const [categorys, setcategory] = useState([])

    const [successMessage, setSuccessMessage] = useState({
        success: '',
        danger: ''
    });

    const getCategory = async () => {

        try {
            const res = await axios.get('https://processing-management-system-api.vercel.app/api/categories')

            const value = await res.data

            setcategory(value)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getCategory();
    }, [])


    const handleInput = (e) => {
        e.preventDefault();

        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('https://processing-management-system-api.vercel.app/api/products', formData)

            setformData({
                sku: '',
                name: '',
                description: '',
                unitOfMeasure: '',
                category: 'select',
                createdBy: userId
            })

            setSuccessMessage({
                ...successMessage,
                success: 'Product Added Successfully'
            });

            setTimeout(() => setSuccessMessage({
                success: '',
                danger: ''
            }), 3000);
        }
        catch (error) {
            setSuccessMessage({
                ...successMessage,
                danger: 'Product not added ! Please try again'
            });
            setTimeout(() => setSuccessMessage({
                success: '',
                danger: ''
            }), 3000);
        }
    }

    return (
        <>
            <div className="content-page">
                <div className="container-fluid add-form-list">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <div className="header-title">
                                        <h4 className="card-title">Add Product</h4>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Name *</label>
                                                    <input type="text" className="form-control" placeholder="Enter Name" data-errors="Please Enter Name." name='name' onChange={handleInput} value={formData.name} required />
                                                    <div className="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Code *</label>
                                                    <input type="text" className="form-control" placeholder="Enter Code" data-errors="Please Enter Code." name='sku' onChange={handleInput} value={formData.sku} required />
                                                    <div className="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Description *</label>
                                                    <input type="text" className="form-control" placeholder="Enter Name" data-errors="Please Enter description." name='description' onChange={handleInput} value={formData.description} required />
                                                    <div className="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>UnitOfMeasure *</label>
                                                    <select className="form-control" name='unitOfMeasure' value={formData.unitOfMeasure} onChange={handleInput} required>
                                                        <option value="select">Select</option>
                                                        <option value="litre">Litre</option>
                                                        <option value="Kilogram">Kilogram</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Please select Category *</label>
                                                    <select name="category" value={formData.category} onChange={handleInput} className='form-control' required>
                                                        <option value="select" >Select</option>
                                                        {
                                                            categorys.map((item, index) => (
                                                                <option key={index} value={item._id}>{item.category_name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                    <div className="help-block with-errors"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary mr-2">Add Product</button>
                                    </form>
                                    {
                                        successMessage.success && (
                                            <div className="alert alert-success mt-3" role="alert">
                                                {successMessage.success}
                                            </div>
                                        )
                                    }
                                    {
                                        successMessage.danger && (
                                            <div className="alert alert-danger mt-3" role="alert">
                                                {successMessage.danger}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct
