import {
  Box,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Image,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import grocerinLogo from "../assets/grocerin_logo_aja.png";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const [keywordHandler, setKeywordHandler] = useState("");
  const authSelector = useSelector((state) => state.auth);

  return (
    <Box
      pt={"10px"}
      backgroundColor={"#81B29A"}
      height={"75px"}
      position={"fixed"}
      top={"0"}
      right={"0"}
      left={"0"}
      fontWeight={"bold"}
      zIndex={"4"}
      margin={"auto"}
      maxWidth={"480px"}
    >
      <Flex display={"flex"}>
        <FormControl pt={"5px"}>
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
              bgColor={"white"}
              size="md"
              placeholder="Search product name"
              name="input"
              value={keywordHandler}
              onChange={(event) => setKeywordHandler(event.target.value)}
            />
          </InputGroup>
        </FormControl>
        {!authSelector.RoleId == "1" ? (
          <Box
            p={"3"}
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
        ) : (
          <Image
            src={grocerinLogo}
            alt="logo"
            height={"50px"}
            display={"block"}
            marginLeft={"auto"}
            marginRight={5}
          />
        )}
      </Flex>
    </Box>
  );
};

export default SearchBar;
