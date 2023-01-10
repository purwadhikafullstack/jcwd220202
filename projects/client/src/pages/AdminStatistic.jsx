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
import StatisticListBar from "../components/StatiscticListBar";
import searchIcon from "../assets/search.png";
import Select from "react-select";
import { axiosInstance } from "../api";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import ReactPaginate from "react-paginate";
import "../style/pagination.css";
import productNotFound from "../assets/feelsorry.png";
import sortIcon from "../assets/sort.png";
import SalesHistoryCard from "../components/SalesHistoryCard";
import AdminNavbar from "../components/AdminNavbar";
import { DatePicker } from "antd";
import moment from "moment";
import LineChartAdmin from "../components/LineChartAdmin";
import { useRef } from "react";

const maxItemsPerPage = 12;

const AdminStatistic = () => {
  const [sales, setSales] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("DESC");
  const [currentSearch, setCurrentSearch] = useState("");
  const [totalSalesCount, setTotalSalesCount] = useState(0);
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
    { value: "createdAt ASC", label: "oldest" },
    { value: "createdAt DESC", label: "latest" },
    { value: "total_price ASC", label: "Lowest to Highest Selling" },
    { value: "total_price DESC", label: "Highest to Lowest Selling" },
  ];

  const fetchBranchSalesHistory = async () => {
    try {
      const response = await axiosInstance.get("/admin-sales/branch", {
        params: {
          _sortBy: sortBy,
          _sortDir: sortDir,
          username: currentSearch,
          _page: activePage,
          _limit: maxItemsPerPage,
          _startDate: startDate,
          _endDate: endDate,
        },
      });

      setSales(response.data.data);

      setTotalSalesCount(response.data.dataCount);
    } catch (error) {
      console.log(error);
    }
  };

  const maxPage = Math.ceil(totalSalesCount / maxItemsPerPage);

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

  const renderSalesHistory = () => {
    return sales.map((val) => {
      return (
        <SalesHistoryCard
          key={val.id.toString()}
          branch_name={val.Branch.branch_name}
          username={val.User.username}
          total_quantity={val.total_quantity}
          transaction_items={val.TransactionItems}
          createdAt={val.createdAt}
          total_price={val.total_price}
          TransactionId={val.id}
        />
      );
    });
  };

  useEffect(() => {
    fetchBranchSalesHistory();
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
    >
      <Box>
        <StatisticListBar />
      </Box>
      <Box>
        <Box
          mx={"20px"}
          pt={"100px"}
          fontWeight={"bold"}
          borderBottom={"3px solid #E07A5F"}
          height={"140px"}
        >
          Branch Insight
        </Box>
        <Box
          backgroundColor={"white"}
          marginTop={"20px"}
          padding={"5px"}
          marginX={"30px"}
          boxShadow={"1px 1px 1px grey"}
          borderRadius={"10px"}
          style={{
            height: "250px",
          }}
        >
          <LineChartAdmin />
        </Box>
        <Box
          mx={"20px"}
          fontWeight={"bold"}
          borderBottom={"3px solid #E07A5F"}
          height={"40px"}
          mt={"20px"}
          mb={"10px"}
          ref={divRef}
        >
          Sales History
        </Box>
        <Flex>
          <Box p={"2"} width={"100%"} mr={"8px"}>
            <FormControl>
              <InputGroup>
                <Input
                  name="search"
                  placeholder="Search Username"
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
                let newStartDate = moment(new Date(value)).format("YYYY-MM-DD");

                if (newStartDate === "1970-01-01") {
                  newStartDate = null;
                }

                setStartDate(newStartDate);
              }}
            />
          </GridItem>
          <GridItem w="100%" h="10">
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
          </GridItem>
        </Grid>
        {!sales.length ? (
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
        ) : (
          <Box>{renderSalesHistory()}</Box>
        )}
        {!sales.length ? null : (
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
      </Box>
      <Box>
        <AdminNavbar />
      </Box>
    </Box>
  );
};

export default AdminStatistic;
