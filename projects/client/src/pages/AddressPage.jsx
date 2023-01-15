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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  Toast,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { axiosInstance } from "../api";
import { useState, useEffect } from "react";
import AddressList from "../components/userAddresses";
import axios from "axios";
import Navigation from "../components/NavigationBar";
import grocerinLogo from "../assets/grocerin_logo_aja.png";
import backIcon from "../assets/back_icon.png";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
const cityCodeData = require("../local-json/CityCode.json");

const AddressPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");
  const [cityDetails, setCityDetails] = useState({});
  const [selectedAddress, setSelectedAddress] = useState("");

  const fetchAddress = async () => {
    try {
      const response = await axiosInstance.get("/profile/address");

      setAddress(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const formChangeHandler = async (value) => {
    try {
      // const { name, value } = target;
      // formik.setFieldValue(name, value);
      setSelectedAddress(value);
      // console.log(selectedAddress);
      const cityName = selectedAddress.value;

      const thisCity = await axiosInstance.post("/geocode/userloc", {
        cityName,
      });

      setCityDetails(thisCity.data.data);
      console.log(cityDetails);

      // onOpen();
    } catch (err) {
      console.log(err);
    }
  };

  // const formik = useFormik({
  //   initialValues: {
  //     cityName: "",
  //   },
  //   onSubmit: async ({ cityName }) => {
  //     try {
  //       const thisCity = await axiosInstance.post("/geocode/userloc", {
  //         cityName,
  //       });
  //       setCityDetails(thisCity.data.data);
  //       onOpen();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  // });
  // console.log(selectedAddress.value)

  const searchAddress = async () => {
    try {
      const cityName = selectedAddress?.value;

      const thisCity = await axiosInstance.post("/geocode/userloc", {
        cityName,
      });
      console.log(thisCity.data.data);

      setCityDetails(thisCity.data.data);
      onOpen();
    } catch (err) {
      console.log(err);
    }
    // console.log(cityDetails.data.formatted);
  };

  const onlyKota = cityCodeData.filter((val) => {
    return val.type === "Kota";
  });

  const renderAddressAvailable = onlyKota.map((val) => {
    return {
      value: val.city_name,
      label: val.city_name,
    };
  });

  const addThisAddress = async (id) => {
    try {
      const response = await axiosInstance.patch(
        `/profile/selectAddress/${id}`
      );
      console.log(response);
      toast({ title: "Address has been changed" }, { status: "success" });
    } catch (err) {
      console.log(err);
      toast({ title: "Failed to change address" }, { status: "error" });
    }
  };
  const submitAddress = async () => {
    try {
      const newAddressDetails = {
        address: cityDetails.formatted,
        latitude: cityDetails.geometry.lat,
        longitude: cityDetails.geometry.lng,
      };
      await axiosInstance.post("/profile/newAddress", newAddressDetails);
      // console.log(newAddressDetails)
      onClose();
      fetchAddress();
      toast({
        title: "New address has been added",
        status: "success",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to add address",
        status: "error",
      });
    }
  };
  const deleteAddressHandler = async (id) => {
    try {
      await axiosInstance.delete(`/profile/${id}`);

      fetchAddress();
      toast({ title: "Address deleted", status: "info" });
    } catch (err) {
      console.log(err);
      toast({ title: "Failed to delete address", status: "error" });
    }
  };

  const renderAddress = () => {
    return address.map((val) => {
      const confirmAddress = () => {
        addThisAddress(val.id);
      };

      const deleteButton = () => {
        deleteAddressHandler(val.id);
      };
      return (
        <>
          <Grid
            key={val.id.toString()}
            h="100px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={4}
          >
            <GridItem
              rowSpan={2}
              colSpan={2}
              onClick={confirmAddress}
              fontWeight={"bold"}
              mx={"5"}
            >
              <Text>{val.address}</Text>
              <Text>Lat: {val.latitude}</Text>
              <Text>Long: {val.longitude}</Text>
            </GridItem>

            <GridItem colSpan={2} bg="papayawhip">
              <Button colorScheme="red" onClick={deleteButton} ml={2}>
                Delete
              </Button>
            </GridItem>
            <GridItem colSpan={4} bg="tomato"></GridItem>
          </Grid>
        </>
      );
    });
  };

  useEffect(() => {
    fetchAddress();
  }, []);
  return (
    <>
      <Flex backgroundColor={"#81B29A"} fontSize={"18px"} fontFamily={"roboto"}>
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
        <Box margin={"25px"} fontFamily={"roboto"}>
          Address
        </Box>
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
      <Box
        backgroundColor={"#F4F1DE"}
        height={"1150px"}
        fontFamily={"roboto"}
        fontSize={"16px"}
      >
        <Box
          backgroundColor={"#F4F1DE"}
          height={"100vh"}
          fontFamily={"roboto"}
          fontSize={"16px"}
          overflow={"scroll"}
          pb={"120px"}
        >
          <Box
            backgroundColor={"#F4F1DE"}
            height={"100vh"}
            fontFamily={"roboto"}
            fontSize={"16px"}
            overflow={"scroll"}
            pb={"120px"}
          >
            <Select
              placeholder={"Search city"}
              options={renderAddressAvailable}
              isClearable={() => {
                setSelectedAddress(null);
              }}
              onChange={(value) => formChangeHandler(value)}
            />
            <Button onClick={searchAddress}>+ add address</Button>

            {/* modal address */}
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Address</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text fontWeight="bold" mb="1rem">
                    You want to add this address?
                  </Text>
                  <Text fontWeight="light" mb="1rem">
                    City: {cityDetails.formatted}
                  </Text>
                  <Text fontWeight="light" mb="1rem">
                    Latitude: {cityDetails?.geometry?.lat}
                  </Text>
                  <Text fontWeight="light" mb="1rem">
                    Longitude: {cityDetails?.geometry?.lng}
                  </Text>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button onClick={submitAddress}>Add this address</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {renderAddress()}
          </Box>
        </Box>

        <Navigation />
      </Box>
    </>
  );
};

export default AddressPage;
