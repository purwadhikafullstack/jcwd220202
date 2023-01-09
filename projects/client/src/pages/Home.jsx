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
  Grid,
  GridItem,
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import Navigation from "../components/NavigationBar";
import { categories } from "../components/category";
import other from "../assets/4square.png";
import banner1 from "../assets/banner1.png";
import searchIcon from "../assets/search.png";
import filterIcon from "../assets/funnel.png";
import sortIcon from "../assets/sort.png";
import { axiosInstance } from "../api";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import ProductCardAdmin from "../components/ProductCardAdmin";
import ProductBox from "../components/ProductBox";
import SearchBar from "../components/SearchBar";
import Carousel from "../components/Banner";

const Home = () => {
  const [keywordHandler, setKeywordHandler] = useState("");
  const [order, setOrder] = useState("");
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [sortBy, setSortBy] = useState("product_name");
  const [sortDir, setSortDir] = useState("ASC");
  const [filter, setFilter] = useState("All");
  const [currentSearch, setCurrentSearch] = useState("");
  const optionsSort = [
    { value: "product_name ASC", label: "A to Z" },
    { value: "product_name DESC", label: "Z to A" },
    { value: "product_price ASC", label: "Lowest to Highest price" },
    { value: "product_price DESC", label: "Highest to Lowest Price" },
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

  useEffect(() => {
    fetchCategory();
}, []);

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

  const fetchAdminProduct = async () => {
    const maxItemsPerPage = 12;

    try {
      const response = await axiosInstance.get("/product/nearest", {
        params: {
          _sortBy: sortBy,
          _sortDir: sortDir,
          CategoryId: filter,
          product_name: currentSearch,
          // _page: activePage,
          // _limit: maxItemsPerPage,
        },
      });
      // setActivePage(activePage + 1);

      // setProduct([...product, ...response.data.data[0].ProductBranches]);
      setProduct(response.data.data[0].ProductBranches);

      // console.log(response.data.data[0].ProductBranches);
      // setTotalCount(response.data.dataCount);
      // setMaxPage(Math.ceil(response.data.dataCount / maxItemsPerPage));

      // console.log(response.data.dataCount);
    } catch (error) {
      console.log(error);
    }
  };

  const sortProductHandler = (event) => {
    setSortBy(event.value.split(" ")[0]);
    setSortDir(event.value.split(" ")[1]);
  };

  const filterProductHandler = (event) => {
    setFilter(event.value);
  };

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: ({ search }) => {
      setCurrentSearch(search);
    },
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  const renderAdminProduct = () => {
    return product.map((val) => {
      return (
        <ProductCardAdmin
          key={val.id.toString()}
          product_image={val.Product.product_image}
          product_name={val.Product.product_name}
          product_price={val.Product.product_price}
          CategoryId={val.Product.Category.category_name}
          stock={val.stock}
          discount_amount_nominal={val.discount_amount_nominal}
          discount_amount_percentage={val.discount_amount_percentage}
          ProductId={val.Product.id}
        />
      );
    });
  };
  const renderProduct = () => {
    return product.map((val) => {
      return (
        <ProductBox
          key={val.id.toString()}
          id={val.Product.id}
          product_image={val.Product.product_image}
          product_name={val.Product.product_name}
          product_price={val.Product.product_price}
          CategoryId={val.Product.Category.category_name}
          stock={val.stock}
          discount_amount_nominal={val.discount_amount_nominal}
          discount_amount_percentage={val.discount_amount_percentage}
          ProductId={val.Product.id}
        />
      );
    });
  };

  useEffect(() => {
    fetchAdminProduct();
  }, [sortBy, sortDir, filter, currentSearch]);

  return (
    <Box bgColor={"#81B29A"} mt={"20px"}>
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
        bgColor={"#F4F1DE"}
        mt={"10px"}
        position={"relative"}
        h={"100vh"}
        overflow={"scroll"}
      >
        <Box ml={"5"} mt={"5"} position={"absolute"}>
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
                    onChange={sortProductHandler}
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
                    onChange={filterProductHandler}
                  />
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem w="100%" h="10"></GridItem>
          </Grid>
          <SimpleGrid minChildWidth="180px" spacing="10px">
            {renderProduct()}
          </SimpleGrid>
        </Box>
      </Box>

      <Navigation />
    </Box>
  );
};

export default Home;
