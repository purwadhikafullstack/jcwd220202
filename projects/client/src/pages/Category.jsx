import { Box, Heading, Text, SimpleGrid, Image } from "@chakra-ui/react"
import Navigation from "../components/NavigationBar"
import { axiosInstance } from "../api"
import { useEffect, useState } from "react"

const CategoryList = () => {
    const [category, setCategory] = useState([])

    const fetchCategory = async () => {
        try {
            const response = await axiosInstance.get(`/category`)

            setCategory(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <Box h={"932px"} bgColor={"#F4F1DE"}>
            <Box>
                <Heading p={"30px"} size="md">
                    Category
                </Heading>
                <SimpleGrid
                    mx={"10px"}
                    columns={"4"}
                    spacing={5}
                    textAlign={"center"}
                    alignItems={"center"}
                >
                    {category.map((item) => {
                        return (
                            <Box display={"grid"}>
                                <Image
                                    justifySelf={"center"}
                                    src={item.icon_url}
                                    w={"50px"}
                                    alignItems={"center"}
                                />
                                <Text fontSize={"xs"}>
                                    {item.category_name}
                                </Text>
                            </Box>
                        )
                    })}
                </SimpleGrid>
            </Box>
            <Navigation />
        </Box>
    )
}

export default CategoryList
