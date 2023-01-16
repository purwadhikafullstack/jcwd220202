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
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import Navigation from "../components/NavigationBar";
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
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import grocerinLogo from "../assets/grocerin_logo_aja.png";
import { useRef } from "react";

const Home = () => {
  const [keywordHandler, setKeywordHandler] = useState("");
  const [order, setOrder] = useState("");
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [sortBy, setSortBy] = useState("product_name");
  const [sortDir, setSortDir] = useState("ASC");
  const [filter, setFilter] = useState("All");
  const [currentSearch, setCurrentSearch] = useState("");
  const [productPusat, setProductPusat] = useState([]);
  const authSelector = useSelector((state) => state.auth);
  const [activePage, setActivePage] = useState(1);
  const [totalProduct, setTotalProduct] = useState(0);

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

  const navigate = useNavigate();
  const myRef = useRef(null);

  const redirectCategory = (id) => {
    let path = `/product/filter/category?category_id=${id}`;
    navigate(path);
  };

  const maxItemsPerPage = 6;
  const fetchAdminProduct = async () => {
    if (authSelector.id === 0) {
      try {
        const response = await axiosInstance.get("/product/all-product/guest", {
          params: {
            _sortBy: sortBy,
            _sortDir: sortDir,
            CategoryId: filter,
            product_name: currentSearch,
            _page: activePage,
            _limit: maxItemsPerPage,
          },
        });
        setProductPusat(response.data.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await axiosInstance.get("/product/nearest", {
          params: {
            _sortBy: sortBy,
            _sortDir: sortDir,
            product_name: currentSearch,
            _page: activePage,
            _limit: maxItemsPerPage,
          },
        });
        setProduct(response.data.data[0].ProductBranches);
        setTotalProduct(response.data.dataCount);

        console.log("inii", response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const maxPage = Math.ceil(totalProduct / maxItemsPerPage);

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;

    setActivePage(currentPage);
    myRef.current.scrollIntoView();
  };
  console.log(activePage);
  console.log(product);

  const sortProductHandler = (e) => {
    setSortBy(e.split(" ")[0]);
    setSortDir(e.split(" ")[1]);
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

  const pagination = () => {
    return (
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={maxPage}
        marginPagesDisplayed={0}
        pageRangeDisplayed={0}
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
    );
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
  const renderProductWithoutUser = () => {
    return productPusat.map((val) => {
      return (
        <ProductBox
          key={val.id.toString()}
          id={val.id}
          product_image={val.product_image}
          product_name={val.product_name}
          product_price={val.product_price}
          CategoryId={val.category_name}
        />
      );
    });
  };
  useEffect(() => {
    fetchAdminProduct();
  }, [sortBy, sortDir, filter, currentSearch, activePage]);
  // useEffect(() => {
  //   stickyHeader();
  // }, []);
  return (
    <Box bgColor={"#81B29A"} mt={"20px"}>
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
                children={<SearchIcon color="F2CC8F" />}
                size="md"
                mr={"5"}
                onClick={formik.handleSubmit}
              />
              <Input
                ml={"5"}
                mr={"5"}
                variant="outline"
                bgColor={"white"}
                size="md"
                placeholder="Search product name"
                name="search"
                value={formik.values.search}
                onChange={formChangeHandler}
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
      <Box h={"200px"} bgColor={"#F4F1DE"} mt={"75px"}>
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
              <Box
                display={"grid"}
                onClick={() => {
                  redirectCategory(item.id);
                }}
              >
                <Image
                  justifySelf={"center"}
                  src={item.icon_url}
                  w={"50px"}
                  alignItems={"center"}
                />
                <Text fontSize={"xs"}>{item.category_name}</Text>
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
              <Box
                display={"grid"}
                onClick={() => {
                  redirectCategory(item.id);
                }}
              >
                <Image
                  justifySelf={"center"}
                  src={item.icon_url}
                  w={"50px"}
                  alignItems={"center"}
                />
                <Text fontSize={"14px"}>{item.category_name}</Text>
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
        mb={"80px"}
        // position={"relative"}
        // h={"100vh"}
        position={"sticky"}
        top={"80px"}
        // overflow={"scroll"}
        ref={myRef}
      >
        <Box px={"20px"}>
          <Grid templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem w="100%" h="10">
              <Grid
                templateColumns="repeat(1, 1fr)"
                textAlign={"Left"}
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
                    bgColor={"#81B29A"}
                    placeholder={"Sort"}
                    onChange={(e) => sortProductHandler(e.target.value)}
                  >
                    <option value="product_name ASC">A to Z</option>
                    <option value="product_name DESC">Z to A</option>
                    <option value="product_price ASC">
                      Lowest to Highest price
                    </option>
                    <option value="product_price DESC">
                      Highest to Lowest Price
                    </option>
                  </Select>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
          <SimpleGrid minChildWidth="180px" spacing="10px" mt={"30px"}>
            {renderProductWithoutUser()}
            {renderProduct()}
          </SimpleGrid>
          <Box marginTop={"20px"}>
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={maxPage}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
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
              activeClassName={"active"}
            />
          </Box>
        </Box>
      </Box>
      <Navigation />
    </Box>
  );
};

export default Home;
