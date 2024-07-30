import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Context } from './Contexts/Context';


function DetailPage() {

    const { whichRoute, id } = useParams();

    const { type } = useContext(Context)

    const [data, setData] = useState([]);

    const whichType = type.find(type => type === whichRoute)

    useEffect(() => {


        const getData = async () => {
            if (whichType === "products" || whichType === "supplier") {
                try {
                    const res = await axios.get(`https://processing-management-system-api.vercel.app/api/${whichType}/${id}`)

                    setData(await res.data.data)
                    console.log(data.category.createdBy)

                }
                catch (error) {

                }
            }
            else {
                try {
                    const res = await axios.get(`https://processing-management-system-api.vercel.app/api/${whichType}/${id}`)

                    setData(await res.data)

                }
                catch (error) {

                }
            }
        }
        getData();
    }, [id])

    return (
        <div className="content-page">
            <div className="container-fluid add-form-list">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">{whichRoute.charAt(0).toUpperCase() + whichRoute.slice(1)} Detail</h4>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {
                                        whichType === "challan" ? (
                                            Object.keys(data).map((item, index) => (
                                                (item === "product" || item === "supplier") && (
                                                    Object.keys(data[item]).map((subValue, subkey) => (
                                                        subValue !== "__v" && (
                                                            subValue === "category" ? (
                                                                <>
                                                                    <div className="col-md-6" key={subkey}>
                                                                        <div className="form-group">
                                                                            <h5>{item.charAt(0).toUpperCase() + item.slice(1)} {subValue.charAt(0).toUpperCase() + subValue.slice(1)} *</h5>
                                                                            <div className="help-block">{data[item][subValue].category_name}</div>
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        Object.keys(data[item][subValue]).map((catValue, catIndex) => (
                                                                            (catValue === "createdBy" && data[item][subValue][catValue] !== null) && (

                                                                                <div className="col-md-6" key={catIndex}>
                                                                                    <div className="form-group">
                                                                                        <h5>{catValue.charAt(0).toUpperCase() + catValue.slice(1)} *</h5>
                                                                                        <div className="help-block">{data[item][subValue][catValue].name}</div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        ))
                                                                    }
                                                                </>
                                                            ) :
                                                                (
                                                                    <>
                                                                        {
                                                                            subValue === "createdBy" ? (

                                                                                Object.keys(data[item][subValue]).map((catValue, catIndex) => (
                                                                                    (catValue === "name" && data[item][subValue] !== null) && (

                                                                                        <div className="col-md-6" key={catIndex}>
                                                                                            <div className="form-group">
                                                                                                <h5>{item}{catValue.charAt(0).toUpperCase() + catValue.slice(1)} *</h5>
                                                                                                <div className="help-block">{data[item][subValue].name}</div>
                                                                                            </div>
                                                                                        </div>

                                                                                    )
                                                                                ))
                                                                            )
                                                                                :
                                                                                (
                                                                                    <div className="col-md-6" key={subkey}>
                                                                                        <div className="form-group">
                                                                                            <h5> {item.charAt(0).toUpperCase() + item.slice(1)} {subValue.charAt(0).toUpperCase() + subValue.slice(1)} *</h5>
                                                                                            <div className="help-block">{data[item][subValue]}</div>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                        }

                                                                    </>
                                                                )
                                                        )
                                                    ))
                                                )
                                            ))
                                        ) :(
                                                Object.keys(data).map((item, index) => (
                                                    (item !== "__v") && (

                                                        item === "category" ? (
                                                            <>
                                                                <div className="col-md-6" key={index}>
                                                                    <div className="form-group">
                                                                        <h5>{item.charAt(0).toUpperCase() + item.slice(1)} *</h5>
                                                                        <div className="help-block">{data[item].category_name}</div>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    Object.keys(data[item]).map((catValue, catIndex) => (
                                                                        (catValue === "createdBy" && data[item][catValue] !== null) && (

                                                                            <div className="col-md-6" key={catIndex}>
                                                                                <div className="form-group">
                                                                                    <h5>{catValue.charAt(0).toUpperCase() + catValue.slice(1)} *</h5>
                                                                                    <div className="help-block">{data[item][catValue].name}</div>
                                                                                </div>
                                                                            </div>

                                                                        )
                                                                    ))
                                                                }
                                                            </>
                                                        )
                                                            : (
                                                                <div className="col-md-6" key={index}>
                                                                    <div className="form-group">
                                                                        <h5>{item.charAt(0).toUpperCase() + item.slice(1)} *</h5>
                                                                        <div className="help-block">{data[item]}</div>
                                                                    </div>
                                                                </div>
                                                            )
                                                    )
                                                ))
                                            )
                                    }
                                </div>
                                <Link to={`/dashboard/list${whichRoute === "products" ? whichRoute.slice(0, -1) : whichRoute}`}>
                                    <button className="btn btn-primary mr-2">Back</button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPage
