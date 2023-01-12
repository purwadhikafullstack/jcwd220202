import { Box, Flex, Image, Spinner, Text } from "@chakra-ui/react";
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
import ProductPage from "./pages/ProductPage";
import ProductDetailUser from "./pages/ProductDetailUser";
import AdminTransaction from "./pages/AdminTransaction";
import AdminTransactionDetail from "./pages/AdminTransactionDetail";
import AdminProductMutation from "./pages/AdminProductMutation";
import grocerinLogo from "./assets/GROCERIN.png";
import VoucherAdmin from "./pages/VoucherAdmin";
import "./style/index.css";
import NotFound from "./pages/404Page";
import CreateBranch from "./pages/CreateBranchSprAdmin";
import UserSprAdmin from "./pages/UserSprAdmin";
import Payment from "./pages/Payment";
import CartUser from "./pages/CartPageUser";
import OrderUser from "./pages/OrderUser";
import AddVoucherAdmin from "./pages/AddVoucherAdmin";
import CategoryEdit from "./pages/EditCategory";
import ProductByCategory from "./pages/ProductByCategory";
import SprAdminStatisctic from "./pages/SprAdminStatistic";
import AdminStatistic from "./pages/AdminStatistic";
import UserTransactions from "./pages/UserTransaction";
import UserTransactionDetail from "./pages/UserTransactionDetail";

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

      if (response.data.data.RoleId === 2) {
        dispatch(
          login({
            id: response.data.data.id,
            RoleId: 2,
            branch_name: response.data.data.Branch.branch_name,
          })
        );
      }

      dispatch(
        login({
          username: response.data.data.username,
          email: response.data.data.email,
          id: response.data.data.id,
          RoleId: response.data.data.RoleId,
          is_verified: response.data.data.is_verified,
        })
      );

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
          <Box
            maxWidth={"480px"}
            margin={"auto"}
            boxSizing={"border-box"}
            border={"2px solid lightgrey"}
            fontFamily={"roboto"}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/category" element={<CategoryList />} />
              <Route path="/login/user" element={<LoginPage />} />
              <Route path="/login/admin" element={<LoginAdminPage />} />
              {/* <Route path="/address" element={<AddressPage />} /> */}
              <Route path="/register/user" element={<Register />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/super-admin/category" element={<AdminCategory />} />
              <Route
                path="/super-admin/category/add"
                element={<AddCategory />}
              />
              <Route path="/category/:id" element={<CategoryEdit />} />
              {/* {renderUserRoutes()} */}
              {/* {renderAdminRoutes()} */}
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reentry-password" element={<ReentryPassword />} />
              <Route
                path="/super-admin/dashboard"
                element={<SuperAdminDashboard />}
              />
              <Route path="/admin/product" element={<ProductListAdmin />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/super-admin/product"
                element={<ProductListSprAdm />}
              />
              <Route
                path="/super-admin/product/add"
                element={<AddProductSprAdm />}
              />
              <Route
                path="/super-admin/product/:id"
                element={<ProductDetailSprAdm />}
              />
              <Route
                path="/admin/product/:id"
                element={<ProductDetailAdmin />}
              />
              <Route path="/product/:id" element={<ProductDetailUser />} />
              <Route
                path="/admin/transaction/"
                element={<AdminTransaction />}
              />
              <Route
                path="/admin/transaction/:id"
                element={<AdminTransactionDetail />}
              />
              <Route
                path="/admin/product-mutation"
                element={<AdminProductMutation />}
              />
              <Route path="/404" element={<NotFound />} />
              <Route
                path="/super-admin/category/:id"
                element={<CategoryEdit />}
              />
              <Route
                path="/super-admin/create-branch"
                element={<CreateBranch />}
              />
              <Route path="/super-admin/branch" element={<UserSprAdmin />} />
              <Route path="/user/cart" element={<CartUser />} />
              <Route path="/user/order" element={<OrderUser />} />
              <Route path="/admin/voucher" element={<VoucherAdmin />} />
              <Route path="/admin/voucher/:url" element={<AddVoucherAdmin />} />
              <Route path="/user/payment/:id" element={<Payment />} />
              <Route path="/user/address" element={<AddressPage />} />
              <Route
                path="/product/filter/category"
                element={<ProductByCategory />}
              />
            </Routes>
          </Box>
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

  if (!authCheck) {
    return (
      <Box textAlign={"center"}>
        <Box mt={"30vh"} display={"grid"}>
          <Image
            src={grocerinLogo}
            alt="logo"
            height={"200px"}
            justifySelf={"center"}
          />
        </Box>
        <Box>
          <Spinner
            thickness="3px"
            speed="0.7s"
            emptyColor="green.200"
            color="#43615f"
            size="xl"
          />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box
        maxWidth={"480px"}
        margin={"auto"}
        boxSizing={"border-box"}
        fontFamily={"roboto"}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/category" element={<CategoryList />} />
          <Route path="/login/user" element={<LoginPage />} />
          <Route path="/login/admin" element={<LoginAdminPage />} />
          {/* <Route path="/address" element={<AddressPage />} /> */}
          <Route path="/register/user" element={<Register />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/super-admin/category" element={<AdminCategory />} />
          <Route path="/super-admin/category/add" element={<AddCategory />} />
          <Route path="/category/:id" element={<CategoryEdit />} />
          {/* {renderUserRoutes()} */}
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
          <Route
            path="/super-admin/product/add"
            element={<AddProductSprAdm />}
          />
          <Route
            path="/super-admin/product/:id"
            element={<ProductDetailSprAdm />}
          />
          <Route path="/admin/product/:id" element={<ProductDetailAdmin />} />
          <Route path="/product/:id" element={<ProductDetailUser />} />
          <Route path="/admin/transaction/" element={<AdminTransaction />} />
          <Route
            path="/admin/transaction/:id"
            element={<AdminTransactionDetail />}
          />
          <Route
            path="/admin/product-mutation"
            element={<AdminProductMutation />}
          />

          <Route path="/404" element={<NotFound />} />
          <Route path="/super-admin/category/:id" element={<CategoryEdit />} />
          <Route path="/super-admin/create-branch" element={<CreateBranch />} />
          <Route path="/super-admin/branch" element={<UserSprAdmin />} />
          <Route path="/user/order/:id" element={<OrderUser />} />
          <Route path="/user/address" element={<AddressPage />} />
          <Route path="/user/payment/:id" element={<Payment />} />
          <Route path="/admin/voucher" element={<VoucherAdmin />} />
          <Route path="/admin/voucher/:url" element={<AddVoucherAdmin />} />
          <Route path="/user/cart" element={<CartUser />} />
          <Route path="/user/order" element={<OrderUser />} />
          <Route path="/admin/voucher" element={<VoucherAdmin />} />
          <Route path="/admin/voucher/:url" element={<AddVoucherAdmin />} />
          <Route
            path="/super-admin/statistic"
            element={<SprAdminStatisctic />}
          />
          <Route path="/admin/statistic" element={<AdminStatistic />} />
          <Route
            path="/product/filter/category"
            element={<ProductByCategory />}
          />
          <Route path="/user/transaction-list" element={<UserTransactions />} />
          <Route
            path="/user/transaction-detail/:id"
            element={<UserTransactionDetail />}
          />
        </Routes>
      </Box>
    </>
  );
};

export default App;
