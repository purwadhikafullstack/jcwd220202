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
} from "@chakra-ui/react";
import { useState } from "react";
import logoutLogo from "../assets/logout.png";
import statisticLogo from "../assets/statistic.png";

const OtherMenuBarSuperAdm = ({ isOpen, closeModal }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {/* ini yang disamadenganin adalah props yang akan dipassing */}
        <ModalOverlay />
        <ModalContent
          position={"fixed"}
          height={"60%"}
          //   bottom={"0"}
          //   right={"0"}
          //   left={"0"}
          bottom={"-20"}
          marginLeft={"60%"}
          fontFamily={"roboto"}
          fontSize={"16px"}
          fontWeight={"bold"}
          border={"5px solid"}
          borderRadius={"15px"}
          borderColor={"white"}
          backgroundColor={"#E07A5F"}
        >
          <ModalHeader>Other</ModalHeader>
          <ModalBody>
            <Box display={"flex"}>
              <Image src={statisticLogo} height={"40px"} />
              <Text
                marginLeft={"10px"}
                marginTop={"10px"}
                marginBottom={"10px"}
              >
                Statistic
              </Text>
            </Box>
            <Box display={"flex"}>
              <Image src={logoutLogo} height={"40px"} />
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
