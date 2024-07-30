import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function Stock() {
    const [challan, setChallan] = useState([]);

    useEffect(() => {
        const getListChallan = async () => {
            try {
                const response = await axios.get('https://processing-management-system-api.vercel.app/api/challan');
                setChallan(response.data.data);

            } catch (error) {
                console.error('Error fetching challan:', error);
            }
        };

        getListChallan();
    }, []);


    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://processing-management-system-api.vercel.app/api/challan/${id}`);
            setChallan(challan.filter(challan => challan._id !== id));
          
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
                                    <h4 className="mb-3">Stock List</h4>
                                    <p className="mb-0">
                                        The Stock list effectively dictates product presentation and provides
                                        <br />
                                        space to list your products and offering in the most appealing way.
                                    </p>
                                </div>
                                <Link to='/dashboard/addproduct' className="btn btn-primary add-list">
                                    <i className="las la-plus mr-3">Add Product</i>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="table-responsive rounded mb-3">
                                <table className="data-tables table mb-0 tbl-server-info">
                                    <thead className="bg-white text-uppercase">
                                        <tr className="ligth ligth-data">
                                            <th>Product Name</th>
                                            <th>Category</th>
                                            <th>Quantity</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="ligth-body">
                                        {
                                            challan.map((item, index) => (
                                                <tr className="odd" key={index}>
                                                    <td>{item.product.name}</td>
                                                    <td>{item.product.category.category_name}</td>
                                                    <td>{item.totalQuantity} {item.product.unitOfMeasure}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center list-action">
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
    );
}

export default Stock;
