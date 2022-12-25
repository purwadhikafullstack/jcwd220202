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
import AdminNavbar from "../components/AdminNavbar";
import TransactionListBar from "../components/TransactionListBar";
import TransactionCardAdmin from "../components/TransactionCardAdmin";
import { useEffect } from "react";
import { useState } from "react";
import { axiosInstance } from "../api";
import { useFormik } from "formik";
import productNotFound from "../assets/feelsorry.png";

const maxItemsPerPage = 12;

const AdminTransaction = () => {
  const [adminTransaction, setAdminTransaction] = useState([]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("ASC");
  const [filter, setFilter] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const optionsSort = [
    { value: "createdAt ASC", label: "Latest" },
    { value: "createdAt DESC", label: "Oldest" },
  ];

  const optionsFilter = [
    { value: "", label: "All" },
    { value: "Waiting For Payment", label: "Waiting For Payment" },
    { value: "Payment Approved", label: "Payment Approved" },
    { value: "Product in Shipment", label: "Product in Shipment" },
    { value: "Success", label: "Success" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  const fetchAdminTransaction = async () => {
    try {
      const response = await axiosInstance.get("/admin-transaction", {
        params: {
          _sortBy: sortBy,
          _sortDir: sortDir,
          transaction_status: filter,
          username: currentSearch,
          _page: activePage,
          _limit: maxItemsPerPage,
        },
      });

      setAdminTransaction(response.data.data);

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
    return adminTransaction.map((val) => {
      return val.transaction_status || val.transaction_status === null ? (
        <TransactionCardAdmin
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
    fetchAdminTransaction();
  }, [sortBy, sortDir, filter, currentSearch, activePage]);

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
        <TransactionListBar />
      </Box>
      <Box>
        <Flex>
          <Box p={"2"} marginTop={"80px"} width={"100%"} mr={"8px"}>
            <FormControl isInvalid={formik.errors.search}>
              <InputGroup>
                <Input
                  name="search"
                  placeholder="Search By Username"
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
      {!adminTransaction.length ? null : (
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

      {!adminTransaction.length ? (
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
      <Box>
        <AdminNavbar />
      </Box>
    </Box>
  );
};

export default AdminTransaction;
