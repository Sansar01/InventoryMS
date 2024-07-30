import React, { useState, useContext } from 'react'
import axios from 'axios';
import { Context } from '../Contexts/Context';

const AddSupplier = () => {

    const userId = localStorage.getItem("userId");

    const [formData, setformData] = useState({
        name: '',
        email: '',
        phone_number: '',
        gst_number: '',
        address: '',
        city: '',
        state: '',
        country: '',
        createdBy: userId
    })

    const [successMessage, setSuccessMessage] = useState({
        success:'',
        danger:''
    });

    const handleInput = (e) => {
        e.preventDefault();

        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            await axios
                .post(
                    "https://processing-management-system-api.vercel.app/api/supplier",
                    formData
                )
                .then(alert("form submitted"));

            setformData({
                name: '',
                username: '',
                email: '',
                phone_number: '',
                gst_number: '',
                address: '',
                city: '',
                state: '',
                country: '',
                createdBy: userId
            })
            setSuccessMessage({
                ...successMessage,
                success: 'Supplier Added Successfully'
            });

            setTimeout(() => setSuccessMessage({
                success:'',
                danger:''
            }), 3000);
        }
        catch (error) {
            setSuccessMessage({
                ...successMessage,
                danger:'Supplier not added ! Please try again'
            });
            setTimeout(() => setSuccessMessage({
                success:'',
                danger:''
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
                                        <h4 className="card-title">Add Supplier</h4>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Name *</label>
                                                    <input type="text" className="form-control" placeholder="Enter Name" name='name' value={formData.name} required onChange={handleInput} />
                                                    <div className="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Email *</label>
                                                    <input type="text" className="form-control" placeholder="Enter Email" name='email' value={formData.email} required onChange={handleInput} />
                                                    <div className="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Phone Number *</label>
                                                    <input type="text" className="form-control" placeholder="Enter Phone Number" name='phone_number' value={formData.phone_number} required onChange={handleInput} />
                                                    <div className="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>GST Number *</label>
                                                    <input type="text" className="form-control" placeholder="Enter GST Number" name='gst_number' value={formData.gst_number} required onChange={handleInput} />
                                                    <div className="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Address</label>
                                                    <textarea className="form-control" rows="4" name='address' value={formData.address} onChange={handleInput} required></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>City *</label>
                                                    <input type="text" className="form-control" placeholder="Enter City" name='city' value={formData.city} required onChange={handleInput} />
                                                    <div className="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>State *</label>
                                                    <input type="text" className="form-control" placeholder="Enter State" name='state' value={formData.state} required onChange={handleInput} />
                                                    <div className="help-block with-errors"></div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Country *</label>
                                                    <input type="text" className="form-control" placeholder="Enter Country" name='country' value={formData.country} required onChange={handleInput} />
                                                    <div className="help-block with-errors"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary mr-2 ">Add Supplier</button>
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

export default AddSupplier
