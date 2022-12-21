import {
    Box,
    Button,
    Image,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuOptionGroup,
    MenuList,
    Text,
    SimpleGrid,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Navigation from "../components/NavigationBar";
import other from "../assets/4square.png";
import Carousel from "../components/Banner";
import SearchBar from "../components/SearchBar";
import { axiosInstance } from "../api";
import { useEffect, useState } from "react";

const Home = () => {
    const [order, setOrder] = useState("");
    const [category, setCategory] = useState([]);

    const fetchCategory = async () => {
        try {
            const response = await axiosInstance.get(`/category`);

            setCategory(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <Box bgColor={"#81B29A"} h={"932px"} mt={"70px"} fontFamily={"roboto"}>
            <SearchBar />
            <Box h={"200px"} bgColor={"#F4F1DE"}>
                <Carousel />
            </Box>
            {category.length <= 8 ? (
                <SimpleGrid
                    columns={"4"}
                    spacing={5}
                    textAlign={"center"}
                    alignItems={"center"}
                    bgColor={"white"}
                    p={"5"}
                    mt={"10px"}
                >
                    {category.slice(0, 3).map((item) => {
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
                        );
                    })}
                    <Link to={"/category"}>
                        <Box display={"grid"}>
                            <Image
                                justifySelf={"center"}
                                src={other}
                                w={"40px"}
                                alignItems={"center"}
                            />
                        </Box>
                    </Link>
                </SimpleGrid>
            ) : (
                <SimpleGrid
                    columns={"4"}
                    spacing={5}
                    textAlign={"center"}
                    alignItems={"center"}
                    bgColor={"white"}
                    p={"5"}
                    mt={"10px"}
                >
                    {category.slice(0, 7).map((item) => {
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
                        );
                    })}
                    <Link to={"/category"}>
                        <Box display={"grid"}>
                            <Image
                                justifySelf={"center"}
                                src={other}
                                w={"40px"}
                                alignItems={"center"}
                            />
                        </Box>
                    </Link>
                </SimpleGrid>
            )}
            <Box
                h={"600px"}
                bgColor={"#F4F1DE"}
                mt={"10px"}
                position={"relative"}
            >
                <Box ml={"5"} mt={"5"} position={"absolute"}>
                    <Menu>
                        <MenuButton as={Button} bgColor={"#81B29A"}>
                            Sort
                        </MenuButton>
                        <MenuList minWidth="240px">
                            <MenuOptionGroup
                                type="radio"
                                onChange={(value) => setOrder(value)}
                            >
                                <MenuItemOption value="ASC">
                                    A - Z
                                </MenuItemOption>
                                <MenuItemOption value="DESC">
                                    Z - A
                                </MenuItemOption>
                            </MenuOptionGroup>
                        </MenuList>
                    </Menu>
                </Box>
            </Box>
            <Navigation />
        </Box>
    );
};

export default Home;
