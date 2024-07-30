import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from './Contexts/Context';
import axios from 'axios'

function UpdatePage() {

  const { whichRoute, id } = useParams();

  const navigate = useNavigate();

  const { type } = useContext(Context)

  const [recieveData, setrecieveData] = useState([])

  const [catsData, setcatData] = useState([]);

  const [successMessage, setSuccessMessage] = useState({
    success: '',
    danger: ''
  });


  const whichType = type.find(type => type === whichRoute);

  useEffect(() => {

    const getData = async () => {

      if (whichType === "products") {
        try {

          const res = await axios.get(`https://processing-management-system-api.vercel.app/api/${whichType}/${id}`)

          const cats = await axios.get('https://processing-management-system-api.vercel.app/api/categories');

          setrecieveData(await res.data.data);

          setcatData(cats.data)

        }
        catch (error) {

          console.log(error.message);

        }
      }
      else {
        try {
          const res = await axios.get(`https://processing-management-system-api.vercel.app/api/${whichType}/${id}`)

          setrecieveData(res.data.data);

        }
        catch (error) {
          console.log(error.message);
        }
      }

    }

    getData();
  }, [])


  const handleInput = (e) => {
    e.preventDefault();

    setrecieveData({
      ...recieveData,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://processing-management-system-api.vercel.app/api/${whichType}/${id}`, recieveData)

      setSuccessMessage({
        ...successMessage,
        success: 'Update Successfully'
      });

      setTimeout(() => setSuccessMessage({
        success: '',
        danger: ''
      }), 3000);

    }
    catch (error) {
      setSuccessMessage({
        ...successMessage,
        danger: 'Product not updated ! Please try again'
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
                    <h4 className="card-title">Update {whichRoute.charAt(0).toUpperCase() + whichRoute.slice(1)}</h4>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      {
                        Object.keys(recieveData).map((item, index) => (

                          (item === "createdAt" || item === "_id") ? (
                            <div className="col-md-6" key={index}>
                              <div className="form-group">
                                <label>{item.charAt(0).toUpperCase() + item.slice(1)}</label>
                                <input type="text" className="form-control" name={item} value={recieveData[item]} onChange={handleInput} required disabled />
                                <div className="help-block with-errors"></div>
                              </div>
                            </div>
                          ) :
                            (item === "updatedAt") ? (
                              <div className="col-md-6" key={index}>
                                <div className="form-group">
                                  <label>{item.charAt(0).toUpperCase() + item.slice(1)} *</label>
                                  <input type="text" className="form-control" name={item} value={new Date().toLocaleDateString('en-GB')} onChange={handleInput} required disabled />
                                  <div className="help-block with-errors"></div>
                                </div>
                              </div>

                            ) :
                              (item === "category") ? (

                                <div className="col-md-6" key={index}>
                                  <div className="form-group">
                                    <label>{item.charAt(0).toUpperCase() + item.slice(1)} *</label>
                                    <select name={item} value={recieveData[item].category_name} onChange={handleInput} className='form-control'>
                                      <option value="select" >{recieveData[item].category_name}</option>
                                      {
                                        catsData.map((item, index) => (
                                          <option key={index} value={item._id}>{item.category_name}</option>
                                        ))
                                      }
                                    </select>
                                    <div className="help-block with-errors"></div>
                                  </div>
                                </div>

                              ) :
                                item === "isActive" ? (
                                  (
                                    <div className="col-md-6" key={index}>
                                      <div className="form-group">
                                        <label>{item.charAt(0).toUpperCase() + item.slice(1)} *</label>
                                        <select name={item} value={recieveData[item].isActive} onChange={handleInput} className='form-control'>
                                          <option value={recieveData[item].isActive ? 'true' : 'false'} >{recieveData[item] ? 'true' : 'false'}</option>
                                          <option value="false">false</option>
                                        </select>
                                        <div className="help-block with-errors"></div>
                                      </div>
                                    </div>
                                  )
                                ) :
                                  item !== "__v" && (
                                    <div className="col-md-6" key={index}>
                                      <div className="form-group">
                                        <label>{item.charAt(0).toUpperCase() + item.slice(1)} *</label>
                                        <input type="text" className="form-control" placeholder={`Please enter ${item}`} name={item} value={recieveData[item]} onChange={handleInput} required />
                                        <div className="help-block with-errors"></div>
                                      </div>
                                    </div>
                                  )
                        ))
                      }
                    </div>
                    {
                      whichRoute === "products" && whichRoute === "supplier" ? (

                        <div className="d-flex justify-content-between">
                          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
                          <button type="submit" className="btn btn-primary mr-2 ">Update {(whichRoute).charAt(0).toUpperCase() + whichRoute.slice(1).slice(0, -1)}</button>
                        </div>
                      )
                        :
                        (
                          <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
                            <button type="submit" className="btn btn-primary mr-2">Update {(whichRoute).charAt(0).toUpperCase() + whichRoute.slice(1)}</button>
                          </div>
                        )
                    }
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

export default UpdatePage