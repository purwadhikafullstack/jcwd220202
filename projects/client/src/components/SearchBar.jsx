import {
    Box,
    Flex,
    FormControl,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import { useState } from "react"

const SearchBar = () => {
    const [keywordHandler, setKeywordHandler] = useState("")

    return (
        <Box
            pt={"15px"}
            backgroundColor={"#81B29A"}
            height={"70px"}
            position={"fixed"}
            top={"0"}
            right={"0"}
            left={"0"}
            fontWeight={"bold"}
            zIndex={"4"}
        >
            <Flex display={"flex"}>
                <FormControl>
                    <InputGroup size="md">
                        <InputRightElement
                            pointerEvents="none"
                            children={<SearchIcon color="F2CC8F" />}
                            size="md"
                            mr={"5"}
                        />
                        <Input
                            ml={"5"}
                            mr={"5"}
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
                    <Link to="/login/user">Login</Link>
                </Box>
            </Flex>
        </Box>
    )
}

export default SearchBar
