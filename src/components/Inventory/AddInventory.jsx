import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Context } from '../Contexts/Context.jsx'

function AddInventory() {

  const userId = localStorage.getItem('userId');

  const [formData, setformData] = useState({
    product: 'select',
    supplier: 'select',
    date_received: new Date().toLocaleDateString('en-GB'),
    quantity: '',
    createdBy: userId
  })

  const [product, setProduct] = useState([])
  const [supplier, setSupplier] = useState([])

  const [successMessage, setSuccessMessage] = useState({
    success: '',
    danger: ''
  });


  useEffect(() => {

    const getProduct = async () => {
      try {
        const res = await axios.get('https://processing-management-system-api.vercel.app/api/products')

        const value = await res.data.data

        setProduct(value)
      }
      catch (error) {
        console.log(error.message);
      }
    }

    const getSupplier = async () => {
      try {
        const res = await axios.get('https://processing-management-system-api.vercel.app/api/supplier')

        const value = await res.data.data

        setSupplier(value)
      }
      catch (error) {
        console.log(error.message);
      }
    }


    getProduct();

    getSupplier();
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
      await axios.post('https://processing-management-system-api.vercel.app/api/inventory', formData)

      setformData({
        product: 'select',
        supplier: 'select',
        date_received: new Date().toLocaleDateString('en-GB'),
        quantity: '',
        createdBy: userId
      })

      setSuccessMessage({
        ...successMessage,
        success: 'Inventory Added Successfully'
      });

      setTimeout(() => setSuccessMessage({
        success: '',
        danger: ''
      }), 3000);

    } catch (error) {
      setSuccessMessage({
        ...successMessage,
        danger: 'Inventory not added ! Please try again'
      });
      setTimeout(() => setSuccessMessage({
        success: '',
        danger: ''
      }), 3000);
    }
  }

  return (
    <div className="content-page">
      <div className="container-fluid add-form-list">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Inventory</h4>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Select Product Code</label>
                        <select name="product" value={formData.product} onChange={handleInput} className='form-control'>
                          <option value="select" >Select</option>
                          {
                            product.map((item, index) => (
                              <option key={index} value={item._id}>{item.sku} / {item.category.category_name}</option>
                            ))
                          }
                        </select>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Select Supplier Name</label>
                        <select name="supplier" value={formData.supplier} onChange={handleInput} className='form-control'>
                          <option value="select" >Select</option>
                          {
                            supplier.map((item, index) => (
                              <option key={index} value={item._id}>{item.name}</option>
                            ))
                          }
                        </select>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Date *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="date_received"
                          value={formData.date_received}
                          required
                          onChange={handleInput}
                          disabled
                        />
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary mr-2">Add Inventory</button>
                </form>
                {
                  successMessage.success && (
                    <div className="alert alert-success mt-3" role="alert">
                      {successMessage}
                    </div>
                  )
                }
                {
                  successMessage.danger && (
                    <div className="alert alert-danger mt-3" role="alert">
                      {successMessage}
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInventory
