import React from 'react'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Sidebar from './components/siderbar/Sidebar'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <>
            <Header />
            <Sidebar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout