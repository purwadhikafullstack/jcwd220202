import {
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import searchIcon from "../assets/search.png";
import filterIcon from "../assets/funnel.png";
import sortIcon from "../assets/sort.png";
import ProductListBar from "../components/ProductListBar";
import { Link } from "react-router-dom";
import Select from "react-select";
import { axiosInstance } from "../api";
import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import ProductCardAdmin from "../components/ProductCardAdmin";

const ProductListAdmin = () => {
  const [category, setCategory] = useState([]);

  const optionsSort = [
    { value: "A to Z", label: "A to Z" },
    { value: "Z to A", label: "Z to A" },
    { value: "Lowest to Highest price", label: "Lowest to Highest price" },
    { value: "Highest to Lowest Price", label: "Highest to Lowest Price" },
  ];

  const fetchCategory = async () => {
    try {
      const response = await axiosInstance.get(`/category`);

      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderCategory = category.map((val) => {
    return {
      value: val.id,
      label: val.category_name,
    };
  });

  const colourStyles = {
    control: (base) => ({
      ...base,
      height: "40px",
      width: "90px",
      color: "red",
      backgroundColor: "none",
      border: "none",
      boxShadow: "none",
      paddingRight: "15px",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "black",
      display: "none",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    menu: (base) => ({
      ...base,
      fontFamily: "roboto",
      fontSize: "14px",
      width: "150px",
      color: "black",
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "black",
        fontWeight: "bold",
        fontSize: "15px",
        fontFamily: "roboto",
        paddingLeft: "5px",
      };
    },
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <Box
      backgroundColor={"#F4F1DE"}
      height={"932px"}
      fontFamily={"roboto"}
      fontSize={"16px"}
    >
      <Box>
        <ProductListBar />
      </Box>
      <Box>
        <Flex>
          <Box p={"2"} marginTop={"80px"} width={"100%"} mr={"8px"}>
            <FormControl>
              <InputGroup>
                <Input
                  type={"text"}
                  name="password"
                  placeholder="Search Product"
                  _placeholder={{ color: "black.500" }}
                  bgColor={"white"}
                  height={"40px"}
                  marginLeft={"6px"}
                />
                <InputRightElement marginRight={"5px"}>
                  <Button
                    size="sm"
                    color={"white"}
                    bgColor={"#F2CC8F"}
                    fontSize={"16px"}
                    _hover={{
                      bgColor: "#F2CC8F",
                    }}
                  >
                    <Image
                      src={searchIcon}
                      alt="search"
                      width={"40px"}
                      objectFit={"contain"}
                    />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Box>
        </Flex>
        <Grid templateColumns="repeat(3, 1fr)" gap={2} mx={"15px"}>
          <GridItem w="100%" h="10">
            <Grid
              templateColumns="repeat(1, 1fr)"
              textAlign={"Left"}
              bgColor={"#81B29A"}
              borderRadius={"5px"}
            >
              <GridItem w="100%" h="10" display={"flex"} ml={"8px"}>
                <Image
                  src={sortIcon}
                  alt="search"
                  height={"20px"}
                  ml={"10px"}
                  mt={"10px"}
                />
                <Select
                  options={optionsSort}
                  styles={colourStyles}
                  placeholder={"Sort"}
                />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem w="100%" h="10">
            <Grid
              templateColumns="repeat(1, 1fr)"
              textAlign={"Left"}
              bgColor={"#81B29A"}
              borderRadius={"5px"}
            >
              <GridItem w="100%" h="10" display={"flex"} ml={"8px"}>
                <Image
                  src={filterIcon}
                  alt="search"
                  height={"20px"}
                  ml={"10px"}
                  mt={"10px"}
                />
                <Select
                  options={renderCategory}
                  styles={colourStyles}
                  placeholder={"Filter"}
                />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem w="100%" h="10"></GridItem>
        </Grid>
      </Box>
      <Box>
        <ProductCardAdmin />
      </Box>
      <Box>
        <AdminNavbar />
      </Box>
    </Box>
  );
};

export default ProductListAdmin;
