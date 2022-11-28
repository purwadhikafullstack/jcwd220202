import {
    Box,
    Button,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AdminNavbar from "../components/AdminNavbar"
import { axiosInstance } from "../api"
import CategoryList from "../components/CategoryList"

const AdminCategory = () => {
    const [category, setCategory] = useState([])

    const fetchCategory = async () => {
        try {
            const response = await axiosInstance.get("/add")

            console.log(response.data)

            console.log(response.data)
            setCategory(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const renderCategory = () => {
        return category.map((val, index) => {
            return <CategoryList id={index + 1} category_name={val.category} />
        })
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <Box bgColor={"#81B29A"}>
            <Heading p={"25px"}>Product Category</Heading>
            <Link to={"/add/category"}>
                <Button bgColor={"#F4F1DE"} m={"5"}>
                    + Add Category
                </Button>
            </Link>
            <TableContainer bgColor={"#F4F1DE"} h={"932px"}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>No</Th>
                            <Th>Category</Th>
                        </Tr>
                    </Thead>
                    <Tbody>{renderCategory()}</Tbody>
                </Table>
            </TableContainer>
            <AdminNavbar />
        </Box>
    )
}

export default AdminCategory
