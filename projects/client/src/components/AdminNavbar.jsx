import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import homeLogo from "../assets/home.png";
import productLogo from "../assets/product.png";
import orderLogo from "../assets/order.png";
import otherLogo from "../assets/other_list.png";
import OtherMenuBar from "./OtherMenuBar";
import { Link, useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const location = useLocation();

  const closeModal = () => {
    setModalIsOpen(false);

    document.body.style.overflow = "unset";
  };

  const openModal = () => {
    setModalIsOpen(true);

    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <Box
        backgroundColor={"#E07A5F"}
        height={"75px"}
        position={"fixed"}
        bottom={"0"}
        right={"0"}
        left={"0"}
        fontWeight={"bold"}
        maxWidth={"480px"}
        margin={"auto"}
        zIndex={"3"}
      >
        <Grid templateColumns="repeat(4, 1fr)" gap={1} margin={"5px"}>
          {location.pathname === "/admin/dashboard" ? (
            <GridItem h="65px">
              <Link to={"/admin/dashboard"}>
                <Box display={"grid"} bgColor={"#F4F1DE"} borderRadius={"5px"}>
                  <Image
                    src={homeLogo}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Home
                  </Text>
                </Box>
              </Link>
            </GridItem>
          ) : (
            <GridItem h="65px">
              <Link to={"/admin/dashboard"}>
                <Box display={"grid"}>
                  <Image
                    src={homeLogo}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Home
                  </Text>
                </Box>
              </Link>
            </GridItem>
          )}
          {location.pathname === "/admin/product" ? (
            <GridItem h="65px">
              <Link to={"/admin/product"}>
                <Box display={"grid"} bgColor={"#F4F1DE"} borderRadius={"5px"}>
                  <Image
                    src={productLogo}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Product
                  </Text>
                </Box>
              </Link>
            </GridItem>
          ) : (
            <GridItem h="65px">
              <Link to={"/admin/product"}>
                <Box display={"grid"}>
                  <Image
                    src={productLogo}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Product
                  </Text>
                </Box>
              </Link>
            </GridItem>
          )}
          {location.pathname === "/admin/transaction" ? (
            <GridItem h="65px">
              <Link to={"/admin/transaction"}>
                <Box display={"grid"} bgColor={"#F4F1DE"} borderRadius={"5px"}>
                  <Image
                    src={orderLogo}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Order
                  </Text>
                </Box>
              </Link>
            </GridItem>
          ) : (
            <GridItem h="65px">
              <Link to={"/admin/transaction"}>
                <Box display={"grid"}>
                  <Image
                    src={orderLogo}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Order
                  </Text>
                </Box>
              </Link>
            </GridItem>
          )}
          {location.pathname === "/admin/statistic" ||
          location.pathname === "/admin/voucher" ||
          location.pathname === "/admin/product-mutation" ? (
            <GridItem h="65px" display={"grid"} onClick={openModal}>
              <Box display={"grid"} bgColor={"#F4F1DE"} borderRadius={"5px"}>
                <Image
                  src={otherLogo}
                  alt="logo"
                  height={"40px"}
                  justifySelf={"center"}
                />
                <Text textAlign={"center"} fontFamily={"roboto"}>
                  Other
                </Text>
              </Box>
            </GridItem>
          ) : (
            <GridItem h="65px" display={"grid"} onClick={openModal}>
              <Box display={"grid"}>
                <Image
                  src={otherLogo}
                  alt="logo"
                  height={"40px"}
                  justifySelf={"center"}
                />
                <Text textAlign={"center"} fontFamily={"roboto"}>
                  Other
                </Text>
              </Box>
            </GridItem>
          )}
        </Grid>
        <OtherMenuBar isOpen={modalIsOpen} closeModal={closeModal} />
      </Box>
    </>
  );
};

export default AdminNavbar;
