import React from 'react'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';

function Sidebar() {
    return (

        <div className="iq-sidebar sidebar-default">
            <div className="iq-sidebar-logo d-flex align-items-center justify-content-between">
                <Link to='' className="header-logo">
                    <img src={logo} className="img-fluid rounded-normal light-logo" alt="logo" /><h5 className="logo-title light-logo ml-3">Inventory Management System</h5>
                </Link>
                <div className="iq-menu-bt-sidebar ml-0">
                    <i className="las la-bars wrapper-menu"></i>
                </div>
            </div>
            <div className="data-scrollbar" data-scroll="1" data-scrollbar="true" tabindex="-1" style={{ overflow: "hidden", outline: "none",  overflowY: 'scroll' }}>
                <div className="scroll-content" style={{ transform: "translate3d(0px, 0px, 0px)" }}>
                    <nav className="iq-sidebar-menu">
                        <ul id="iq-sidebar-toggle" className="iq-menu">
                            <li className="active">
                                <a href="" className="svg-icon">
                                    <svg className="svg-icon" id="p-dash1" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="2" stroke-linecap="round" strokeLinejoin="round">
                                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                    </svg>
                                    <span className="ml-4"> <Link to=''>Dashboards</Link></span>
                                </a>
                            </li>
                            <li className="">
                                <a href="#challan" className="collapsed" data-toggle="collapse" aria-expanded="false">
                                    <svg className="svg-icon" id="p-dash4" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="2" stroke-linecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                    <span className="ml-4">Challan</span>
                                    <svg className="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="2" stroke-linecap="round" strokeLinejoin="round">
                                        <polyline points="10 15 15 20 20 15"></polyline>
                                        <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                                    </svg>
                                </a>
                                <ul id="challan" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                    <li className="">
                                        <Link to='listchallan'>
                                            <i className="las la-minus"></i><span>List Challan</span>
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to='addchallan'>
                                            <i className="las la-minus"></i><span>Add Challan</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="">
                                <a href="#stock" className="collapsed" data-toggle="collapse" aria-expanded="false">
                                    <svg className="svg-icon" id="p-dash5" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="2" stroke-linecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                    <span className="ml-4">Stock</span>
                                    <svg className="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="2" stroke-linecap="round" strokeLinejoin="round">
                                        <polyline points="10 15 15 20 20 15"></polyline>
                                        <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                                    </svg>
                                </a>
                                <ul id="stock" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                    <li className="">
                                        <Link to='stock'>
                                            <i className="las la-minus"></i><span>Stock</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="">
                                <a href="#master" className="collapsed" data-toggle="collapse" aria-expanded="false">
                                    <svg className="svg-icon" id="p-dash2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="2" stroke-linecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                    </svg>
                                    <span className="ml-4">Master</span>
                                    <svg className="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="2" stroke-linecap="round" strokeLinejoin="round">
                                        <polyline points="10 15 15 20 20 15"></polyline>
                                        <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                                    </svg>
                                </a>
                                <ul id="master" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                    <li>
                                        <a href="#product" className="collapsed" data-toggle="collapse" aria-expanded="false">
                                            <svg className="svg-icon" id="p-dash3" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="2" stroke-linecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                            </svg>
                                            <span className="ml-4">Product</span>
                                            <svg className="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="2" stroke-linecap="round" strokeLinejoin="round">
                                                <polyline points="10 15 15 20 20 15"></polyline>
                                                <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                                            </svg>
                                        </a>
                                        <ul id="product" className="iq-submenu collapse" data-parent="#master">
                                            <li className="">
                                                <Link to='listproduct'>
                                                    <i className="las la-minus"></i><span>List Product</span>
                                                </Link>
                                            </li>
                                            <li className="">
                                                <Link to='addproduct'>
                                                    <i className="las la-minus"></i><span>Add Product</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li>
                                        <a href="#Category" className="collapsed" data-toggle="collapse" aria-expanded="false">
                                            <svg className="svg-icon" id="p-dash3" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="2" stroke-linecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                            </svg>
                                            <span className="ml-4">Category</span>
                                            <svg className="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="2" stroke-linecap="round" strokeLinejoin="round">
                                                <polyline points="10 15 15 20 20 15"></polyline>
                                                <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                                            </svg>
                                        </a>
                                        <ul id="Category" className="iq-submenu collapse" data-parent="#master">
                                            <li className="">
                                                <Link to='listcategory'>
                                                    <i className="las la-minus"></i><span>List Category</span>
                                                </Link>
                                            </li>
                                            <li className="">
                                                <Link to='addcategory'>
                                                    <i className="las la-minus"></i><span>Add Category</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li>
                                        <a href="#Suppliers" className="collapsed" data-toggle="collapse" aria-expanded="false">
                                            <svg className="svg-icon" id="p-dash3" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="2" stroke-linecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                            </svg>
                                            <span className="ml-4">Suppliers</span>
                                            <svg className="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="2" stroke-linecap="round" strokeLinejoin="round">
                                                <polyline points="10 15 15 20 20 15"></polyline>
                                                <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                                            </svg>
                                        </a>
                                        <ul id="Suppliers" className="iq-submenu collapse" data-parent="#master">
                                            <li className="">
                                                <li className="">
                                                    <Link to='listsupplier'>
                                                        <i className="las la-minus"></i><span>List Suppliers</span>
                                                    </Link>
                                                </li>
                                                <li className="">
                                                    <Link to='addsupplier'>
                                                        <i className="las la-minus"></i><span>Add Suppliers</span>
                                                    </Link>
                                                </li>
                                            </li>
                                        </ul>
                                    </li>

                                </ul>
                            </li>
                            <li className="p-3"></li>
                        </ul>
                    </nav>
                    <div className="scrollbar-track scrollbar-track-x" style={{ display: "none" }}>
                        <div className="scrollbar-thumb scrollbar-thumb-x" style={{ width: "260px", transform: "translate3d(0px, 0px, 0px)" }}>
                        </div>
                    </div>
                    <div className="scrollbar-track scrollbar-track-y" style={{ display: "block" }}>
                        <div className="scrollbar-thumb scrollbar-thumb-y" style={{ height: "265.961px", transform: "translate3d(0px, 6.63061px, 0px)" }}>

                        </div>
                    </div>
                </div>
                <div className="p-3"></div>
            </div>
        </div>
    )
}

export default Sidebar;
