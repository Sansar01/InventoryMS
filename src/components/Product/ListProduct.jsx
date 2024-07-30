import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Context } from '../Contexts/Context';

const ListProduct = () => {

    const [products, setProduct] = useState([])
    const [allProducts, setAllProducts] = useState([]);

    const { type } = useContext(Context);

    useEffect(() => {

        const getListProduct = async () => {

            try {
                const response = await axios.get('https://processing-management-system-api.vercel.app/api/products');

                setProduct(response.data.data);

                setAllProducts(response.data.data);

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        getListProduct();
    }, []);

    const handleFilteration = (e) => {
        e.preventDefault();

        if (e.target.value === '') {
            setProduct(allProducts);
        }
        else {
            const filterItem = allProducts.filter((item) =>
                item.name.toLowerCase().includes(e.target.value)
            );
            setProduct(filterItem);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://processing-management-system-api.vercel.app/api/products/${id}`);

            setProduct(products.filter(products => products._id !== id));
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
                            <div className="d-flex flex-wrap flex-wrap align-items-center justify-content-between mb-4">
                                <div>
                                    <h4 className="mb-3">Product List</h4>
                                    <p className="mb-0">The product list effectively dictates product presentation and provides <br></br>space to list your products and offering in the most appealing way.</p>
                                </div>
                                <Link to='/dashboard/addproduct' className="btn btn-primary add-list"><i className="las la-plus mr-3">Add Product</i></Link>
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
                                <table className="data-tables table mb-0 tbl-server-info">
                                    <thead className="bg-white text-uppercase">
                                        <tr className="ligth ligth-data">
                                            <th>Code</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Category</th>
                                            <th>Unit of Measure</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="ligth-body">
                                        {
                                            products.map((item, index) => (
                                                <tr className="odd" key={index}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            {item.sku}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <Link to={`/dashboard/${type[0]}/detail/${item._id}`}>{item.name}</Link>
                                                        </div>
                                                    </td>
                                                    <td>{item.description}</td>
                                                    <td>{item.category.category_name}</td>
                                                    <td>{item.unitOfMeasure}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center list-action">
                                                            <Link className='badge bg-success mr-2' to={`/dashboard/${type[0]}/update/${item._id}`}><ModeOutlinedIcon /></Link>

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

export default ListProduct
