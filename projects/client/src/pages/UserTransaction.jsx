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
import filterIcon from "../assets/funnel.png";
import sortIcon from "../assets/sort.png";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import "../style/pagination.css";
import UserTransactionListCard from "../components/UserTransactionListCard";
import { useEffect } from "react";
import { useState } from "react";
import { axiosInstance } from "../api";
import { useFormik } from "formik";
import productNotFound from "../assets/feelsorry.png";
import { useRef } from "react";
import Navigation from "../components/NavigationBar";
import TransactionHeaderHome from "../components/TransactionHeaderHome";

const maxItemsPerPage = 12;

const UserTransactions = () => {
  const [userTransaction, setUserTransaction] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("ASC");
  const [filter, setFilter] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const divRef = useRef(null);

  const scrollToTop = () => {
    divRef.current.scroll({
      top: 0,
    });
  };

  const optionsSort = [
    { value: "createdAt ASC", label: "Latest" },
    { value: "createdAt DESC", label: "Oldest" },
  ];

  const optionsFilter = [
    { value: "", label: "All" },
    { value: "Waiting For Payment", label: "Waiting For Payment" },
    { value: "Waiting For Approval", label: "Waiting For Approval" },
    { value: "Payment Approved", label: "Payment Approved" },
    { value: "Product in Shipment", label: "Product in Shipment" },
    { value: "Success", label: "Success" },
    { value: "Cancel", label: "Cancelled" },
  ];

  const fetchUserTransaction = async () => {
    try {
      const response = await axiosInstance.get("/transaction/all-transaction", {
        params: {
          _sortBy: sortBy,
          _sortDir: sortDir,
          transaction_status: filter,
          username: currentSearch,
          _page: activePage,
          _limit: maxItemsPerPage,
        },
      });

      setUserTransaction(response.data.data);

      setTotalTransaction(response.data.dataCount);
    } catch (error) {
      console.log(error);
    }
  };

  const maxPage = Math.ceil(totalTransaction / maxItemsPerPage);

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;

    setActivePage(currentPage);
  };

  const sortProductHandler = (event) => {
    setSortBy(event.value.split(" ")[0]);
    setSortDir(event.value.split(" ")[1]);
  };

  const filterProductHandler = (event) => {
    setFilter(event.value);

    setActivePage(1);
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

  const renderAdminTransaction = () => {
    return userTransaction.map((val) => {
      return val.transaction_status ? (
        <UserTransactionListCard
          key={val.id.toString()}
          TransactionId={val.id}
          total_price={val.total_price}
          createdAt={val.createdAt}
          username={val.User.username}
          TransactionItems={val.TransactionItems}
          transaction_status={val.transaction_status}
        />
      ) : null;
    });
  };

  useEffect(() => {
    fetchUserTransaction();
    scrollToTop();
  }, [sortBy, sortDir, filter, currentSearch, activePage]);

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
        <Box>
          <TransactionHeaderHome />
        </Box>
        <Grid templateColumns="repeat(3, 1fr)" gap={2} mx={"15px"} mt={"80px"}>
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
                  options={optionsFilter}
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

      {!userTransaction.length ? (
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
        <Box>{renderAdminTransaction()}</Box>
      )}
      {!userTransaction.length ? null : (
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
      <Box>
        <Navigation />
      </Box>
    </Box>
  );
};

export default UserTransactions;
