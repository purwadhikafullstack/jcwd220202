import { Box, Text } from "@chakra-ui/react"
import { Link, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import LoginAdminPage from "./pages/LoginAdminPage"
import ProfilePage from "./pages/ProfilePage"
import AddressPage from "./pages/AddressPage"
import Home from "./pages/Home"
import AdminDashboard from "./pages/AdminDashboard"
import CategoryList from "./pages/Category"
import Register from "./pages/Register"
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "./api"
import { useState } from "react"
import { useEffect } from "react"
import { login } from "./redux/features/authSlice"
import AdminCategory from "./pages/AdminCategory"
import AddCategory from "./pages/AddCategory"

const App = () => {
    const authSelector = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [authCheck, setAuthCheck] = useState(false)

    const keepUserLoggedIn = async () => {
        try {
            const auth_token = localStorage.getItem("auth_token")

            if (!auth_token) {
                setAuthCheck(true)
                return
            }

            const response = await axiosInstance.get("/user/refreshToken")

            dispatch(login(response.data.data))
            localStorage.setItem("auth_token", response.data.token)
            setAuthCheck(true)
        } catch (err) {
            console.log(err)
            setAuthCheck(true)
        }
    }
    const renderUserRoutes = () => {
        if (authSelector.RoleId == "1") {
            return (
                <>
                    <Route path="/profile" element={<ProfilePage />} />
                </>
            )
        }
        return null
    }

    useEffect(() => {
        keepUserLoggedIn()
    }, [])

    const renderAdminRoutes = () => {
        if (authSelector.RoleId == "2") {
            return (
                <>
                    <Route path="/homepage" element={<HomePage />} />
                </>
            )
        }
        return null
    }

    if (!authCheck) return <div>LOADING...</div>

    return (
        <>
            <Box bgColor="grey">
                <Text>Hello World!</Text>
                <Link to="/profile">go to profile</Link>
                <Link to="/login/user">login user</Link>
                <Link to="/login/admin">login admin</Link>
            </Box>
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
                {renderAdminRoutes()}
            </Routes>
        </>
    )
}

export default App
