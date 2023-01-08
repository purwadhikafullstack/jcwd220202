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
} from "@chakra-ui/react";
import searchIcon from "../assets/search.png";
import sortIcon from "../assets/sort.png";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import "../style/pagination.css";
import AdminNavbar from "../components/AdminNavbar";
import ProductMutationListBar from "../components/ProductMutationListBar";
import AdminProductMutationCard from "../components/AdminProductMutationCard";
import { axiosInstance } from "../api";
import { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { DatePicker } from "antd";
import moment from "moment";
import productNotFound from "../assets/feelsorry.png";
import { useRef } from "react";

const maxItemsPerPage = 12;

const AdminProductMutation = () => {
  const [productHistory, setProductHistory] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("DESC");
  const [currentSearch, setCurrentSearch] = useState("");
  const [totalProductHistory, setTotalProductHistory] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const divRef = useRef(null);

  const scrollToTop = () => {
    divRef.current.scroll({
      top: 0,
    });
  };

  const optionsSort = [
    { value: "createdAt DESC", label: "Latest" },
    { value: "createdAt ASC", label: "Oldest" },
  ];

  const fetchProduHistory = async () => {
    try {
      const response = await axiosInstance.get("/product-history", {
        params: {
          _sortBy: sortBy,
          _sortDir: sortDir,
          product_name: currentSearch,
          _page: activePage,
          _limit: maxItemsPerPage,
          _startDate: startDate,
          _endDate: endDate,
        },
      });

      setProductHistory(response.data.data);

      setTotalProductHistory(response.data.dataCount);
    } catch (error) {
      console.log(error);
    }
  };

  const maxPage = Math.ceil(totalProductHistory / maxItemsPerPage);

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

  const renderProductHistory = () => {
    return productHistory.map((val) => {
      return (
        <AdminProductMutationCard
          key={val.id.toString()}
          branch_name={val.Branch.branch_name}
          TransactionItemId={val.TransactionItemId}
          product_name={val.Product.product_name}
          createdAt={val.createdAt}
          remarks={val.remarks}
          stock_movement={val.stock_movement}
          initial_stock={val.initial_stock}
          current_stock={val.current_stock}
          ProductId={val.ProductId}
        />
      );
    });
  };

  useEffect(() => {
    fetchProduHistory();
    scrollToTop();
  }, [sortBy, sortDir, currentSearch, activePage, endDate, startDate]);

  return (
    <Box
      backgroundColor={"#F4F1DE"}
      height={"100vh"}
      fontFamily={"roboto"}
      fontSize={"16px"}
      overflow={"scroll"}
      pb={"120px"}
      ref={divRef}
    >
      <Box>
        <ProductMutationListBar />
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
          <GridItem w="100%" h="5"></GridItem>
          <GridItem
            w="100%"
            h="5"
            pl={"5px"}
            fontWeight={"bold"}
            fontSize={"14px"}
          >
            From:
          </GridItem>
          <GridItem
            w="100%"
            h="5"
            pl={"5px"}
            fontWeight={"bold"}
            fontSize={"14px"}
          >
            To:
          </GridItem>
        </Grid>
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
            <Box>
              <DatePicker
                style={{ fontFamily: "roboto" }}
                placement="topLeft"
                placeholder="Start Date"
                size="large"
                popupStyle={{
                  size: "small",
                  fontSize: "14px",
                  position: "revert",
                  width: "280px",
                }}
                onChange={(value) => {
                  let newStartDate = moment(new Date(value)).format(
                    "YYYY-MM-DD"
                  );

                  if (newStartDate === "1970-01-01") {
                    newStartDate = null;
                  }

                  setStartDate(newStartDate);
                }}
              />
            </Box>
          </GridItem>
          <GridItem w="100%" h="10">
            <Box>
              <DatePicker
                style={{ fontFamily: "roboto" }}
                placement="topRight"
                placeholder="End Date"
                size="large"
                popupStyle={{
                  size: "small",
                  fontSize: "14px",
                  position: "revert",
                  width: "280px",
                }}
                onChange={(value) => {
                  let newEndDate = moment(new Date(value))
                    .add(1, "days")
                    .format("YYYY-MM-DD");

                  if (newEndDate === "1970-01-02") {
                    newEndDate = null;
                  }
                  setEndDate(newEndDate);
                }}
              />
            </Box>
          </GridItem>
        </Grid>
      </Box>
      {!productHistory.length ? (
        <Box display={"grid"} mt={"15vh"}>
          <Text textAlign={"center"} fontWeight={"bold"}>
            No Histories Found
          </Text>
          <Image
            src={productNotFound}
            alt="not found"
            width={"70%"}
            objectFit={"contain"}
            justifySelf={"center"}
          />
        </Box>
      ) : (
        <Box>{renderProductHistory()}</Box>
      )}
      {!productHistory.length ? null : (
        <Box marginTop={"20px"}>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={maxPage}
            marginPagesDisplayed={5}
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
          />
        </Box>
      )}
      <Box>
        <AdminNavbar />
      </Box>
    </Box>
  );
};

export default AdminProductMutation;
