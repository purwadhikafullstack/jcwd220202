import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import homeLogo from "../assets/home.png";
import productLogo from "../assets/product.png";
import userLogo from "../assets/user.png";
import otherLogo from "../assets/other_list.png";
import OtherMenuBarSuperAdm from "./OtherMenuBarSuperAdm";
import { Link } from "react-router-dom";
import { RemoveScrollBar, zeroRightClassName } from "react-remove-scroll-bar";
import App from "../App";

const SuperAdminNavbar = () => {
  const [menu, setMenu] = useState([
    {
      icon: homeLogo,
      text: "Home",
      link: "/super-admin/dashboard",
    },
    {
      icon: productLogo,
      text: "Product",
      link: "/super-admin/product",
    },
    {
      icon: userLogo,
      text: "Branch",
      link: "/super-admin/branch",
    },
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);

    document.body.style.overflow = "unset";
  };

  const openModal = () => {
    setModalIsOpen(true);

    document.body.style.overflow = "hidden";
  };

  const renderIcon = () => {
    return menu.map((val) => {
      return (
        <GridItem h="65px" key={val.icon}>
          <Link to={val.link}>
            <Box display={"grid"}>
              <Image
                src={val.icon}
                alt="logo"
                height={"40px"}
                justifySelf={"center"}
              />
              <Text textAlign={"center"} fontFamily={"roboto"} color={"black"}>
                {val.text}
              </Text>
            </Box>
          </Link>
        </GridItem>
      );
    });
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
      >
        <Grid templateColumns="repeat(4, 1fr)" gap={1} margin={"5px"}>
          {renderIcon()}
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
        </Grid>
        <OtherMenuBarSuperAdm isOpen={modalIsOpen} closeModal={closeModal} />
      </Box>
    </>
  );
};

export default SuperAdminNavbar;
