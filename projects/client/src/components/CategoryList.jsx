import { Image, Td, Tr } from "@chakra-ui/react"

const CategoryList = ({ id, category_name }) => {
    // const [category, setCategory] = useState([])

    // console.log(category)

    // const fetchCategory = async () => {
    //     try {
    //         const response = await axiosInstance.get("/add")

    //         setCategory(response.data.data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // useEffect(() => {
    //     fetchCategory()
    // }, [])

    return (
        <>
            <Tr>
                <Td>{id}</Td>
                <Td>{category_name}</Td>
            </Tr>
        </>
    )
}

export default CategoryList
