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
    useToast,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AdminNavbar from "../components/AdminNavbar"
import { axiosInstance } from "../api"
import CategoryList from "../components/CategoryList"

const AdminCategory = () => {
    const [category, setCategory] = useState([])
    const toast = useToast()

    const fetchCategory = async () => {
        try {
            const response = await axiosInstance.get("/category")

            setCategory(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    const renderCategory = () => {
        return category.map((val, index) => {
            return (
                <CategoryList
                    no={index + 1}
                    id={val.id}
                    category_name={val.category_name}
                    onDelete={() => deleteBtnHandler(val.id)}
                />
            )
        })
    }

    const deleteBtnHandler = async (id) => {
        try {
            await axiosInstance.delete(`/category/${id}`)

            fetchCategory()
            toast({ title: "Category deleted", status: "info" })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <Box bgColor={"#81B29A"}>
            <Heading p={"25px"}>Product Category</Heading>
            <Link to={"/super-admin/category/add"}>
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
