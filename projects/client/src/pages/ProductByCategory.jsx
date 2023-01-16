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
  Text,
  useToast,
} from "@chakra-ui/react";

import searchIcon from "../assets/search.png";
import sortIcon from "../assets/sort.png";
import ProductListBar from "../components/ProductListBar";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { axiosInstance } from "../api";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import ReactPaginate from "react-paginate";
import "../style/pagination.css";
import productNotFound from "../assets/feelsorry.png";
import ProductCardUser from "../components/ProductCardUser";
import NavigationBar from "../components/NavigationBar";
import { useSelector } from "react-redux";

const maxItemsPerPage = 12;

const ProductByCategory = () => {
  const [product, setProduct] = useState([]);
  const [sortBy, setSortBy] = useState("product_name");
  const [sortDir, setSortDir] = useState("ASC");
  const [currentSearch, setCurrentSearch] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [productPusat, setProductPusat] = useState([]);
  const authSelector = useSelector((state) => state.auth);

  const toast = useToast();

  const optionsSort = [
    { value: "product_name ASC", label: "A to Z" },
    { value: "product_name DESC", label: "Z to A" },
    { value: "product_price ASC", label: "Lowest to Highest price" },
    { value: "product_price DESC", label: "Highest to Lowest Price" },
  ];

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
      fontSize: "15px",
      width: "150px",
      color: "black",
      zIndex: 3,
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

  const search = useLocation().search;
  const category_id = new URLSearchParams(search).get("category_id");

  const fetchProducts = async () => {
    if (authSelector.id === 0) {
      try {
        const response = await axiosInstance.get(
          `/product/product-category/guest?category_id=${category_id}`
        );

        setProductPusat(response.data.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await axiosInstance.get(
          `/product/nearest/${category_id}`,
          {
            params: {
              _sortBy: sortBy,
              _sortDir: sortDir,
              product_name: currentSearch,
              _page: activePage,
              _limit: maxItemsPerPage,
            },
          }
        );

        setProduct(response.data.data[0].ProductBranches);
        setTotalProducts(response.data.dataCount);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const maxPage = Math.ceil(totalProducts / maxItemsPerPage);

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;

    setActivePage(currentPage);
  };

  const sortProductHandler = (event) => {
    setSortBy(event.value.split(" ")[0]);
    setSortDir(event.value.split(" ")[1]);
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

  const renderProducts = () => {
    return product.map((val) => {
      return (
        <ProductCardUser
          key={val.id.toString()}
          product_name={val.Product.product_name}
          product_price={val.Product.product_price}
          product_description={val.Product.product_description}
          product_image={val.Product.product_image}
          id={val.ProductId}
        />
      );
    });
  };

  const renderProductsWithoutUser = () => {
    return productPusat.map((val) => {
      return (
        <ProductCardUser
          key={val.id.toString()}
          id={val.id}
          product_name={val.product_name}
          product_price={val.product_price}
          product_description={val.product_description}
          product_image={val.product_image}
        />
      );
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [sortBy, sortDir, currentSearch, activePage]);

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
        </Grid>
      </Box>
      {!product.length ? null : (
        <Box marginTop={"20px"}>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={maxPage}
            marginPagesDisplayed={5}
            pageRangeDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
          />
        </Box>
      )}
      {/* {!product.length ? (
        <Box display={"grid"} mt={"15vh"}>
          <Text textAlign={"center"} fontWeight={"bold"}>
            No item(s) found
          </Text>
          <Image
            src={productNotFound}
            alt="not found"
            width={"70%"}
            objectFit={"contain"}
            justifySelf={"center"}
          />
        </Box>
      ) : ( */}
      <Box>
        {renderProductsWithoutUser()}
        {renderProducts()}
      </Box>
      {/* )} */}
    </Box>
  );
};

export default ProductByCategory;
