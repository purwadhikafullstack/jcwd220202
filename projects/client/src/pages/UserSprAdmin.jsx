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
    Spacer,
    Table,
    TableContainer,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import searchIcon from "../assets/search.png";
import sortIcon from "../assets/sort.png";
import addIcon from "../assets/add.png";
import SuperAdminNavbar from "../components/SuperAdminNavbar";
import { Link } from "react-router-dom";
import Select from "react-select";
import { axiosInstance } from "../api";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import grocerinLogo from "../assets/grocerin_logo_aja.png";
import backIcon from "../assets/back_icon.png";
import { useNavigate } from "react-router-dom";
import BranchSprAdmin from "../components/BranchSprAdmin";
import ReactPaginate from "react-paginate";
import branchtNotFound from "../assets/feelsorry.png";

const maxItemsPerPage = 12;

const UserSprAdmin = () => {
    const [branch, setBranch] = useState([]);
    const [sortBy, setSortBy] = useState("branch_name");
    const [sortDir, setSortDir] = useState("ASC");
    const [totalBranch, setTotalBranch] = useState(0);
    const [currentSearch, setCurrentSearch] = useState("");
    const [activePage, setActivePage] = useState(1);

    const navigate = useNavigate();

    const fetchBranch = async () => {
        try {
            const response = await axiosInstance.get(`/admin-branch`, {
                params: {
                    _sortBy: sortBy,
                    _sortDir: sortDir,
                    branch_name: currentSearch,
                    _page: activePage,
                    _limit: maxItemsPerPage,
                },
            });

            setBranch(response.data.data);
            setTotalBranch(response.data.dataCount);
        } catch (error) {
            console.log(error);
        }
    };

    const maxPage = Math.ceil(totalBranch / maxItemsPerPage);

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

    const optionsSort = [
        { value: "branch_name ASC", label: "A to Z" },
        { value: "branch_name DESC", label: "Z to A" },
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

    const renderBranch = () => {
        return branch.map((val, index) => {
            return (
                <BranchSprAdmin
                    key={val.id.toString()}
                    branch_name={val.branch_name}
                    address={val.Address.address}
                    fetchBranch={fetchBranch}
                />
            );
        });
    };

    useEffect(() => {
        fetchBranch();
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
            <Box
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
                <Flex fontSize={"18px"} fontFamily={"roboto"}>
                    <Box marginLeft={"10px"} marginTop={"18px"}>
                        <Image
                            objectFit="cover"
                            src={backIcon}
                            alt="back"
                            height={"40px"}
                            onClick={() => navigate(-1)}
                        />
                    </Box>
                    <Spacer />
                    <Box margin={"25px"}>Branch</Box>
                    <Spacer />
                    <Box>
                        <Image
                            src={grocerinLogo}
                            alt="logo"
                            height={"55px"}
                            marginRight={"20px"}
                            marginTop={"7px"}
                        />
                    </Box>
                </Flex>
            </Box>
            {/* ============== */}
            <Box>
                <Flex>
                    <Box p={"2"} marginTop={"80px"} width={"100%"} mr={"8px"}>
                        <FormControl>
                            <InputGroup>
                                <Input
                                    name="search"
                                    placeholder="Search Branch"
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
                <Grid templateColumns="repeat(2, 1fr)" gap={2} mx={"15px"}>
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
                                ml={"8px"}
                            >
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
                    <Link to={"/super-admin/create-branch"}>
                        <GridItem w="100%" h="10">
                            <Grid
                                templateColumns="repeat(2, 1fr)"
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
                                        height={"16px"}
                                        mt={"12px"}
                                        ml={5}
                                    />
                                    <Box
                                        mt={"9px"}
                                        textAlign={"center"}
                                        fontWeight={"bold"}
                                        fontSize={"15px"}
                                        ml={4}
                                    >
                                        Register
                                    </Box>
                                </GridItem>
                            </Grid>
                        </GridItem>
                    </Link>
                </Grid>
            </Box>
            {/* =========== */}
            {!branch.length ? null : (
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
            {!branch.length ? (
                <Box display={"grid"} mt={"15vh"}>
                    <Text textAlign={"center"} fontWeight={"bold"}>
                        No Branches found
                    </Text>
                    <Image
                        src={branchtNotFound}
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
                            <Thead
                                width={"auto"}
                                borderBottom={"3px solid #E07A5F"}
                            >
                                <Tr>
                                    <Th fontSize={"15px"} fontFamily={"roboto"}>
                                        Branch
                                    </Th>
                                    <Th fontSize={"15px"} fontFamily={"roboto"}>
                                        Location
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody
                                width={"auto"}
                                borderBottom={"3px solid #E07A5F"}
                            >
                                {renderBranch()}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            )}

            <Box>
                <SuperAdminNavbar />
            </Box>
        </Box>
    );
};

export default UserSprAdmin;
