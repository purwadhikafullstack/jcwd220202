import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoutLogo from "../assets/logout.png";
import statisticLogo from "../assets/statistic.png";
import { logout } from "../redux/features/authSlice";
import categoryLogo from "../assets/categoryIcon.png";

const OtherMenuBarSuperAdm = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const logoutBtnHandler = () => {
    localStorage.removeItem("auth_token");
    dispatch(logout());
    navigate("/login/admin");
    closeModal();
    toast({
      status: "info",
      title: "User Logout",
    });
  };

  const toSuperAdminStatistic = () => {
    navigate("/super-admin/statistic");

    closeModal();
  };

  const toCategory = () => {
    navigate("/super-admin/category");

    closeModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent
          position={"fixed"}
          height={"50vh"}
          marginX={"auto"}
          mt={"35vh"}
          right={"0"}
          left={"0"}
          fontFamily={"roboto"}
          fontSize={"16px"}
          fontWeight={"bold"}
          border={"2px solid"}
          borderRadius={"15px"}
          borderColor={"white"}
          backgroundColor={"#E07A5F"}
          overflowY={"scroll"}
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <ModalHeader>Other</ModalHeader>
          <ModalBody>
            <Box display={"flex"} p={"5px"} onClick={toSuperAdminStatistic}>
              <Image src={statisticLogo} height={"40px"} />
              <Text
                marginLeft={"10px"}
                marginTop={"10px"}
                marginBottom={"10px"}
                color={"black"}
              >
                Statistic
              </Text>
            </Box>
            <Box display={"flex"} p={"5px"} onClick={toCategory}>
              <Image src={categoryLogo} height={"40px"} />
              <Text
                marginLeft={"10px"}
                marginTop={"10px"}
                marginBottom={"10px"}
                color={"black"}
              >
                Category
              </Text>
            </Box>
            <Box
              display={"flex"}
              bgColor={"#F84040"}
              width={"130px"}
              p={"5px"}
              border={"2px solid white"}
              borderRadius={"10px"}
              onClick={logoutBtnHandler}
            >
              <Image src={logoutLogo} height={"40px"} ml={"5px"} />
              <Text
                marginLeft={"10px"}
                marginTop={"10px"}
                marginBottom={"10px"}
              >
                Logout
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OtherMenuBarSuperAdm;
