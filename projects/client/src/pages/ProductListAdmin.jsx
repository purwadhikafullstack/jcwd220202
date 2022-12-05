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
import { useFormik } from "formik";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductListAdmin = () => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [sortBy, setSortBy] = useState("product_name");
  const [sortDir, setSortDir] = useState("ASC");
  const [filter, setFilter] = useState("All");
  const [currentSearch, setCurrentSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [maxPage, setMaxPage] = useState(1);

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

  renderCategory.unshift({ value: "All", label: "All" });

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
      const response = await axiosInstance.get("/admin-product/branch", {
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

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    fetchAdminProduct();
  }, [sortBy, sortDir, filter, currentSearch]);

  return (
    <Box
      backgroundColor={"#F4F1DE"}
      height={"100vh"}
      fontFamily={"roboto"}
      fontSize={"16px"}
      overflow={"scroll"}
      pb={"120px"}
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
                  name="search"
                  placeholder="Search Product"
                  _placeholder={{ color: "black.500" }}
                  value={formik.values.search}
                  onChange={formChangeHandler}
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
                    onClick={formik.handleSubmit}
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
      </Box>
      {/* <InfiniteScroll
        dataLength={product.length}
        next={fetchAdminProduct}
        hasMore={activePage < maxPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      > */}
      <Box>{renderAdminProduct()}</Box>
      {/* </InfiniteScroll> */}
      <Box>
        <AdminNavbar />
      </Box>
    </Box>
  );
};

export default ProductListAdmin;
