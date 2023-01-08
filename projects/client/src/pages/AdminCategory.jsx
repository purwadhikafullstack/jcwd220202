import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../api";
import CategoryList from "../components/CategoryList";
import CategoryListBar from "../components/CategoryListBar";
import SuperAdminNavbar from "../components/SuperAdminNavbar";
import searchIcon from "../assets/search.png";
import addIcon from "../assets/add.png";
import ReactPaginate from "react-paginate";
import "../style/pagination.css";
import Select from "react-select";
import sortIcon from "../assets/sort.png";
import { useFormik } from "formik";
import productNotFound from "../assets/feelsorry.png";
import { useRef } from "react";

const maxItemsPerPage = 12;

const AdminCategory = () => {
  const [category, setCategory] = useState([]);
  const [alert, setAlert] = useState(null);
  const [sortDir, setSortDir] = useState("ASC");
  const [sortBy, setSortBy] = useState("category_name");
  const [currentSearch, setCurrentSearch] = useState("");
  const [totalCategory, setTotalCategory] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const divRef = useRef(null);

  const scrollToTop = () => {
    divRef.current.scroll({
      top: 0,
    });
  };

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchCategory = async () => {
    try {
      const response = await axiosInstance.get("/category/active/all", {
        params: {
          _sortBy: sortBy,
          _sortDir: sortDir,
          category_name: currentSearch,
          _page: activePage,
          _limit: maxItemsPerPage,
        },
      });

      setCategory(response.data.data);

      setTotalCategory(response.data.dataCount);
    } catch (err) {
      console.log(err);
    }
  };

  const maxPage = Math.ceil(totalCategory / maxItemsPerPage);

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

      setActivePage(1);
    },
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  const deleteBtnHandler = async (id) => {
    try {
      await axiosInstance.delete(`/category/${id}`);

      fetchCategory();
      toast({ title: "Category deleted", status: "info" });
    } catch (err) {
      console.log(err);
    }
  };

  const closeDeleteAlert = () => {
    onClose();

    document.body.style.overflow = "unset";
  };

  const confirmDeleteBtnHandler = () => {
    deleteBtnHandler(alert.id);
    onClose();
    setAlert(null);
    document.body.style.overflow = "unset";
  };

  const optionsSort = [
    { value: "category_name ASC", label: "A to Z" },
    { value: "category_name DESC", label: "Z to A" },
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

  const renderCategory = () => {
    return category.map((val, index) => {
      return (
        <CategoryList
          key={val.id.toString()}
          no={index + 1}
          id={val.id}
          category_name={val.category_name}
          onDelete={() => deleteBtnHandler(val.id)}
          onOpenAlert={() => onOpen(setAlert(val))}
        />
      );
    });
  };

  useEffect(() => {
    fetchCategory();
    scrollToTop();
  }, [sortBy, sortDir, currentSearch, activePage]);

  return (
    <Box
      backgroundColor={"#F4F1DE"}
      height={"100vh"}
      fontFamily={"roboto"}
      fontSize={"16px"}
      overflow={"scroll"}
      pb={"80px"}
      ref={divRef}
    >
      <Box>
        <CategoryListBar />
      </Box>
      <Box>
        <Flex>
          <Box p={"2"} marginTop={"80px"} width={"100%"} mr={"8px"}>
            <FormControl>
              <InputGroup>
                <Input
                  name="search"
                  placeholder="Search Category"
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
          <GridItem w="100%" h="10"></GridItem>
          <Link to={"/super-admin/category/add"}>
            <GridItem w="100%" h="10">
              <Grid
                templateColumns="repeat(1, 1fr)"
                textAlign={"Left"}
                bgColor={"#81B29A"}
                borderRadius={"5px"}
              >
                <GridItem
                  w="100%"
                  h="10"
                  display={"flex"}
                  justifyContent={"space-evenly"}
                >
                  <Image
                    src={addIcon}
                    alt="search"
                    height={"20px"}
                    mt={"10px"}
                  />
                  <Box
                    mt={"9px"}
                    textAlign={"center"}
                    fontWeight={"bold"}
                    fontSize={"15px"}
                    color={"black"}
                  >
                    Category
                  </Box>
                </GridItem>
              </Grid>
            </GridItem>
          </Link>
        </Grid>
      </Box>

      {!category.length ? (
        <Box display={"grid"} mt={"15vh"}>
          <Text textAlign={"center"} fontWeight={"bold"}>
            No Categories found
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
        <Box>
          <TableContainer mt={"10px"} px={"20px"} pb={"40px"}>
            <Table
              sx={{ tableLayout: "fixed" }}
              maxWidth={"420px"}
              variant="striped"
              colorScheme={"red"}
            >
              <Thead width={"auto"} borderBottom={"3px solid #E07A5F"}>
                <Tr>
                  {/* <Th>No</Th> */}
                  <Th fontSize={"15px"} fontFamily={"roboto"}>
                    Category
                  </Th>
                  <Th
                    textAlign={"right"}
                    fontSize={"16px"}
                    fontFamily={"roboto"}
                  >
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody width={"auto"} borderBottom={"3px solid #E07A5F"}>
                {renderCategory()}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {!category.length ? null : (
        <Box>
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
        <SuperAdminNavbar />
      </Box>

      {/* alert delete*/}
      <AlertDialog isOpen={isOpen} onClose={closeDeleteAlert}>
        <AlertDialogOverlay>
          <AlertDialogContent
            mt={"35vh"}
            fontFamily={"roboto"}
            fontSize={"16px"}
            bgColor={"#F4F1DE"}
          >
            <AlertDialogHeader
              fontSize={"16px"}
              fontWeight="bold"
              ml={"10px"}
              mt={"10px"}
            >
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody ml={"10px"}>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter display={"contents"}>
              <Button
                onClick={closeDeleteAlert}
                mx={"30px"}
                mt={"10px"}
                borderRadius={"15px"}
                bgColor={"#81B29A"}
                color={"white"}
                _hover={{
                  bgColor: "green.500",
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={confirmDeleteBtnHandler}
                mx={"30px"}
                mt={"10px"}
                mb={"40px"}
                borderRadius={"15px"}
                bgColor={"#E07A5F"}
                _hover={{
                  bgColor: "red.500",
                }}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default AdminCategory;
