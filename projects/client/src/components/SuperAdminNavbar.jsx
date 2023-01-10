import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import homeLogo from "../assets/home.png";
import productLogo from "../assets/product.png";
import userLogo from "../assets/user.png";
import otherLogo from "../assets/other_list.png";
import OtherMenuBarSuperAdm from "./OtherMenuBarSuperAdm";
import { Link, useLocation } from "react-router-dom";

const SuperAdminNavbar = () => {
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
        margin={"auto"}
        maxWidth={"480px"}
        zIndex={"3"}
      >
        <Grid templateColumns="repeat(4, 1fr)" gap={1} margin={"5px"}>
          {location.pathname === "/super-admin/dashboard" ? (
            <GridItem h="65px">
              <Link to={"/super-admin/dashboard"}>
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
              <Link to={"/super-admin/dashboard"}>
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
          {location.pathname === "/super-admin/product" ? (
            <GridItem h="65px">
              <Link to={"/super-admin/product"}>
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
              <Link to={"/super-admin/product"}>
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
          {location.pathname === "/super-admin/branch" ? (
            <GridItem h="65px">
              <Link to={"/super-admin/branch"}>
                <Box display={"grid"} bgColor={"#F4F1DE"} borderRadius={"5px"}>
                  <Image
                    src={userLogo}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Branch
                  </Text>
                </Box>
              </Link>
            </GridItem>
          ) : (
            <GridItem h="65px">
              <Link to={"/super-admin/branch"}>
                <Box display={"grid"}>
                  <Image
                    src={userLogo}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Branch
                  </Text>
                </Box>
              </Link>
            </GridItem>
          )}
          {location.pathname === "/super-admin/statistic" ||
          location.pathname === "/super-admin/category" ? (
            <GridItem h="65px">
              <Box
                display={"grid"}
                onClick={openModal}
                bgColor={"#F4F1DE"}
                borderRadius={"5px"}
              >
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
            <GridItem h="65px">
              <Box display={"grid"} onClick={openModal}>
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
        <OtherMenuBarSuperAdm isOpen={modalIsOpen} closeModal={closeModal} />
      </Box>
    </>
  );
};

export default SuperAdminNavbar;
