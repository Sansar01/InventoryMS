import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddChallan() {
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    product: 'select',
    supplier: 'select',
    quantity: '',
    packetSize: '',
    totalQuantity: '',
    type: 'Daily',
    createdAt: new Date().toISOString().slice(0, 10),
    createdBy: userId
  });

  const [successMessage, setSuccessMessage] = useState({
    success: '',
    danger: ''
  });

  const [productData, setProductData] = useState({
    listproduct: [],
    listsupplier: []
  });

  useEffect(() => {
    const getInventory = async () => {
      try {
        const productresponse = await axios.get('https://processing-management-system-api.vercel.app/api/products');
        const supplierresponse = await axios.get('https://processing-management-system-api.vercel.app/api/supplier');

        setProductData({
          listproduct: productresponse.data.data,
          listsupplier: supplierresponse.data.data
        });
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    getInventory();
  }, []);

  const handleInput = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const calculateTotalQuantity = () => {
      const quantity = parseFloat(formData.quantity);
      const packetSize = parseFloat(formData.packetSize);
      if (!isNaN(quantity) && !isNaN(packetSize)) {
        setFormData({
          ...formData,
          totalQuantity: (quantity * packetSize).toFixed(2)
        });
      } else {
        setFormData({
          ...formData,
          totalQuantity: ''
        });
      }
    };

    calculateTotalQuantity();
  }, [formData.quantity, formData.packetSize]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://processing-management-system-api.vercel.app/api/challan', formData);

      setFormData({
        type: 'Daily',
        product: 'select',
        supplier: 'select',
        category: 'select',
        createdAt: new Date().toISOString().slice(0, 10),
        quantity: '',
        packetSize: '',
        totalQuantity: '',
        createdBy: userId
      });

      setSuccessMessage({
        success: 'Challan Added Successfully',
        danger: ''
      });

      setTimeout(() => setSuccessMessage({
        success: '',
        danger: ''
      }), 3000);

    } catch (error) {
      setSuccessMessage({
        success: '',
        danger: 'Challan not added! Please try again.'
      });
      setTimeout(() => setSuccessMessage({
        success: '',
        danger: ''
      }), 3000);
    }
  };

  return (
    <div className="content-page">
      <div className="container-fluid add-form-list">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Challan</h4>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Please Select Product *</label>
                        <select name="product" value={formData.product} onChange={handleInput} className='form-control' required>
                          <option value="select">Select</option>
                          {productData.listproduct.map((item, index) => (
                            <option key={index} value={item._id}>{item.sku} - {item.name} - {item.category.category_name}</option>
                          ))}
                        </select>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Please Select Supplier *</label>
                        <select name="supplier" value={formData.supplier} onChange={handleInput} className='form-control' required>
                          <option value="select">Select</option>
                          {productData.listsupplier.map((item, index) => (
                            <option key={index} value={item._id}>{item.name}</option>
                          ))}
                        </select>
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Type</label>
                        <input
                          type="text"
                          name="type"
                          value={formData.type}
                          className="form-control"
                          required
                          readOnly
                        />
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Date *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="createdAt"
                          value={formData.createdAt}
                          required
                          onChange={handleInput}
                          disabled
                        />
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Quantity *</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter Quantity"
                          name="quantity"
                          value={formData.quantity}
                          required
                          onChange={handleInput}
                          min="0"
                        />
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Packet of Size *</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter size"
                          name="packetSize"
                          value={formData.packetSize}
                          required
                          onChange={handleInput}
                          min="0"
                        />
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Total Quantity *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="totalQuantity"
                          value={formData.totalQuantity !== '' ? `${formData.totalQuantity} ${productData.listproduct.find(p => p._id === formData.product)?.unitOfMeasure ?? ''}` : 'Total Quantity'}
                          required
                          readOnly
                        />
                        <div className="help-block with-errors"></div>
                      </div>
                    </div>

                  </div>
                  <button type="submit" className="btn btn-primary mr-2">Add Challan</button>
                </form>
                {successMessage.success && (
                  <div className="alert alert-success mt-3" role="alert">
                    {successMessage.success}
                  </div>
                )}
                {successMessage.danger && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {successMessage.danger}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddChallan;
