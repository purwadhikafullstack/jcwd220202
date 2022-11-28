import { Box, Text } from "@chakra-ui/react";
import { Link, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginAdminPage from "./pages/LoginAdminPage";
import ProfilePage from "./pages/ProfilePage";
import AddressPage from "./pages/AddressPage";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import CategoryList from "./pages/Category";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "./api";
import { useState } from "react";
import { useEffect } from "react";
import { login } from "./redux/features/authSlice";
import AdminCategory from "./pages/AdminCategory";
import AddCategory from "./pages/AddCategory";
import ForgotPassword from "./pages/ForgotPassword";
import ReentryPassword from "./pages/ReentryPassword";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import ProductListAdmin from "./pages/ProductListAdmin";
import ProductListSprAdm from "./pages/ProductListSprAdm";
import AddProductSprAdm from "./pages/AddProductSprAdm";
import ProductDetailSprAdm from "./pages/ProductDetailSprAdm";
import ProductDetailAdmin from "./pages/ProductDetailAdmin";

const App = () => {
  const authSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [authCheck, setAuthCheck] = useState(false);

  const keepUserLoggedIn = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token");

      if (!auth_token) {
        setAuthCheck(true);
        return;
      }

      const response = await axiosInstance.get("/user/refreshToken");

      dispatch(login(response.data.data));
      localStorage.setItem("auth_token", response.data.token);
      setAuthCheck(true);
    } catch (err) {
      console.log(err);
      setAuthCheck(true);
    }
  };
  const renderUserRoutes = () => {
    if (authSelector.RoleId == "1") {
      return (
        <>
          <Route path="/profile" element={<ProfilePage />} />
        </>
      );
    }
    return null;
  };

  useEffect(() => {
    keepUserLoggedIn();
  }, []);

  // const renderAdminRoutes = () => {
  //   if (authSelector.RoleId == "2") {
  //     return (
  //       <>
  //         <Route path="/homepage" element={<HomePage />} />
  //       </>
  //     );
  //   }
  //   return null;
  // };

  if (!authCheck) return <div>LOADING...</div>;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/category" element={<CategoryList />} />
        <Route path="/login/user" element={<LoginPage />} />
        <Route path="/login/admin" element={<LoginAdminPage />} />
        <Route path="/address" element={<AddressPage />} />
        <Route path="/register/user" element={<Register />} />
        <Route path="/admin/category" element={<AdminCategory />} />
        <Route path="/add/category" element={<AddCategory />} />
        {renderUserRoutes()}
        {/* {renderAdminRoutes()} */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reentry-password" element={<ReentryPassword />} />
        <Route
          path="/super-admin/dashboard"
          element={<SuperAdminDashboard />}
        />
        <Route path="/admin/product" element={<ProductListAdmin />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/super-admin/product" element={<ProductListSprAdm />} />
        <Route path="/super-admin/product/add" element={<AddProductSprAdm />} />
        <Route
          path="/super-admin/product/:id"
          element={<ProductDetailSprAdm />}
        />
        <Route path="/admin/product/:id" element={<ProductDetailAdmin />} />
      </Routes>
    </>
  );
};

export default App;
