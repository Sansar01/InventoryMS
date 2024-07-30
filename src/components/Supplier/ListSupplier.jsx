import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Context } from '../Contexts/Context';

const ListSupplier = () => {

    const [supplier, setSupplier] = useState([])
    const [allSupplier, setallSupplier] = useState([]);

    const { type } = useContext(Context);


    useEffect(() => {

        const getListSupplier = async () => {

            try {
                const response = await axios.get("https://processing-management-system-api.vercel.app/api/supplier");

                setSupplier(response.data.data);

                setallSupplier(response.data.data)

            } catch (error) {
                console.error('Error fetching supplier:', error);
            }
        }

        getListSupplier();
    }, []);


    const handleFilteration = (e) => {
        e.preventDefault();

        if (e.target.value === '') {
            setSupplier(allSupplier);
        }
        else {
            const filterItem = allSupplier.filter((item) =>
                item.name.toLowerCase().includes(e.target.value)
            );
            setSupplier(filterItem);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://processing-management-system-api.vercel.app/api/supplier/${id}`);

            setSupplier(supplier.filter(supplier => supplier._id !== id));
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
                                    <h4 className="mb-3">Suppliers List</h4>
                                    <p className="mb-0">Create and manage your vendor list, send and receive purchase orders – your online<br></br>
                                        Dashboard is your new back of house.</p>
                                </div>
                                <Link to="/dashboard/addsupplier" className="btn btn-primary add-list"><i className="las la-plus mr-3"></i>Add Supplier</Link>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="table-responsive rounded mb-3">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 d-flex">
                                            <label>Search:
                                                <input type="search" className="form-control form-control-sm" placeholder="" aria-controls="DataTables_Table_0" onChange={handleFilteration} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <table className="data-table table mb-0 tbl-server-info">
                                    <thead className="bg-white text-uppercase">
                                        <tr className="ligth ligth-data">
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone No.</th>
                                            <th>GST No</th>
                                            <th>Address</th>
                                            <th>City</th>
                                            <th>State</th>
                                            <th>Country</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="ligth-body">
                                        {
                                            supplier.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div><Link to={`/dashboard/${type[1]}/detail/${item._id}`}>{item.name}</Link></div>
                                                    </td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone_number}</td>
                                                    <td>{item.gst_number}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.city}</td>
                                                    <td>{item.state}</td>
                                                    <td>{item.country}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center list-action">
                                                            <Link className='badge bg-success mr-2' to={`/dashboard/${type[1]}/update/${item._id}`}><ModeOutlinedIcon /></Link>

                                                            <button className='badge bg-warning mr-2' onClick={() => handleDelete(item._id)}>
                                                                <DeleteOutlineOutlinedIcon />
                                                            </button>
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

export default ListSupplier
