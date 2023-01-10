import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoutLogo from "../assets/logout.png";
import statisticLogo from "../assets/statistic.png";
import { logout } from "../redux/features/authSlice";
import productMutation from "../assets/history.png";
import voucherLogo from "../assets/voucher.png";

const OtherMenuBar = ({ isOpen, closeModal }) => {
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

  const toBranchStatistic = () => {
    navigate("/admin/statistic");

    closeModal();
  };

  const toVoucher = () => {
    navigate("/admin/voucher");

    closeModal();
  };

  const toProductHistory = () => {
    navigate("/admin/product-mutation");

    closeModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent
          position={"fixed"}
          height={"350px"}
          marginX={"auto"}
          mt={"25vh"}
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
            <Box display={"flex"} p={"5px"} onClick={toBranchStatistic}>
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
            <Box display={"flex"} p={"5px"} onClick={toVoucher}>
              <Image src={voucherLogo} height={"40px"} />
              <Text
                marginLeft={"10px"}
                marginTop={"10px"}
                marginBottom={"10px"}
                color={"black"}
              >
                Voucher
              </Text>
            </Box>
            <Box display={"flex"} p={"5px"} onClick={toProductHistory}>
              <Image src={productMutation} height={"40px"} />
              <Text
                marginLeft={"10px"}
                marginTop={"10px"}
                marginBottom={"10px"}
                color={"black"}
              >
                Product History
              </Text>
            </Box>
            <Box
              bgColor={"#F84040"}
              width={"130px"}
              p={"5px"}
              border={"2px solid white"}
              borderRadius={"10px"}
              onClick={logoutBtnHandler}
              mt={"10px"}
              display={"flex"}
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

export default OtherMenuBar;
