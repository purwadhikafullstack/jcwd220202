import {
    Box,
    Button,
    Flex,
    FormControl,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuOptionGroup,
    MenuList,
    Text,
    SimpleGrid,
} from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { DragHandleIcon, SearchIcon } from "@chakra-ui/icons"
import Navigation from "../components/NavigationBar"
import { categories } from "../components/category"
import other from "../assets/4square.png"

const Home = () => {
    const [keywordHandler, setKeywordHandler] = useState("")
    const [order, setOrder] = useState("")

    return (
        <Box bgColor={"#81B29A"}>
            <Box pt={"10px"}>
                <Flex display={"flex"}>
                    <FormControl>
                        <InputGroup size="md" w={"340px"}>
                            <InputRightElement
                                pointerEvents="none"
                                children={<SearchIcon color="F2CC8F" />}
                                size="md"
                            />
                            <Input
                                w={"340px"}
                                ml={"5"}
                                variant="outline"
                                size="md"
                                placeholder={``}
                                name="input"
                                value={keywordHandler}
                                onChange={(event) =>
                                    setKeywordHandler(event.target.value)
                                }
                            />
                        </InputGroup>
                    </FormControl>
                    <Box
                        p={"2"}
                        mr={"5"}
                        color="#E07A5F"
                        borderRadius="10px"
                        as="b"
                        _hover={{
                            background: "white",
                            color: "#E07A5F",
                            transition: "all 1000ms ease",
                            cursor: "pointer",
                        }}
                    >
                        <Link to="/login">Login</Link>
                    </Box>
                </Flex>
            </Box>
            <Box h={"100px"} mt={"10px"} bgColor={"#F4F1DE"}>
                Banner
            </Box>
            <SimpleGrid
                columns={"4"}
                spacing={5}
                textAlign={"center"}
                alignItems={"center"}
                bgColor={"white"}
                p={"5"}
                mt={"10px"}
            >
                {categories.slice(0, 7).map((item) => {
                    return (
                        <Box display={"grid"}>
                            <Image
                                justifySelf={"center"}
                                src={item.icon}
                                w={"50px"}
                                alignItems={"center"}
                            />
                            <Text fontSize={"xs"}>{item.name}</Text>
                        </Box>
                    )
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
    )
}

export default Home
