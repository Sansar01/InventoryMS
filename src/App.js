import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProduct from "./components/Product/AddProduct";
import ListProduct from "./components/Product/ListProduct";
import UpdatePage from "./components/UpdatePage";
import Dashboard from "./components/Dashboard/Dashboard";
import ListCategory from "./components/Categories/ListCategory";
import AddCategory from "./components/Categories/AddCategory";
import SignIn from "./components/Forms/SignIn";
import SignUp from "./components/Forms/SignUp";
import ForgotPassword from "./components/Forms/ForgotPassword";
import ResetPassword from './components/Forms/ResetPassword'
import Layout from "./Layout";
import AddSupplier from "./components/Supplier/AddSupplier";
import ListSupplier from "./components/Supplier/ListSupplier";
import PrivateRoute from "./PrivateRoute";
import ListInventory from "./components/Inventory/ListInventory";
import AddInventory from "./components/Inventory/AddInventory";
import ListChallan from "./components/Challan/ListChallan";
import AddChallan from "./components/Challan/AddChallan";
import Stock from "./components/Stock/Stock";
import DetailPage from './components/DetailPage'

function App() {


  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="resetpassword" element={<ResetPassword/>}/>
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="listproduct" element={<ListProduct />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path=":whichRoute/detail/:id" element={<DetailPage />} />
            <Route path=":whichRoute/update/:id" element={<UpdatePage />} />
            <Route path="listcategory" element={<ListCategory />} />
            <Route path="addcategory" element={<AddCategory />} />
            <Route path="addsupplier" element={<AddSupplier />} />
            <Route path="listsupplier" element={<ListSupplier />} />
            <Route path="listinventory" element={<ListInventory />} />
            <Route path="addinventory" element={<AddInventory />} />
            <Route path="listchallan" element={<ListChallan />} />
            <Route path="addchallan" element={<AddChallan />} />
            <Route path="stock" element={<Stock />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
