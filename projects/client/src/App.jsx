import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import AdminDashboard from "./pages/AdminDashboard"
import Home from "./pages/Home"
import CategoryList from "./pages/Category"
import Login from "./pages/Login"
import Register from "./pages/Register"

const App = () => {
    return (
        // 430 932
        <Box maxW={"430px"} maxH={"932px"} w={"100%"} h={"100%"}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/category" element={<CategoryList />} />
                <Route path="/login/user" element={<Login />} />
                <Route path="/register/user" element={<Register />} />
            </Routes>
            {/* <Box
                overflow={"hidden"}
                position="sticky"
                mb={"0"}
                w={"100%"}
                display="flex"
                alignItems="center"
                justifyContent={"center"}
            >
                <Grid
                    w={"100%"}
                    h={"50px"}
                    maxW={"430px"}
                    maxH={"932px"}
                    templateColumns="repeat(4, 1fr)"
                    gap={6}
                    textAlign={"center"}
                    bgColor={"#E07A5F"}
                >
                    <GridItem w="100%">
                        <Image src={home} />
                    </GridItem>
                    <GridItem w="100%">
                        <Image src={cart} />
                    </GridItem>
                    <GridItem w="100%">
                        <Image src={list} />
                    </GridItem>
                    <GridItem w="100%">
                        <Image src={profile} />
                    </GridItem>
                </Grid>
            </Box> */}
        </Box>
    )
}

export default App
