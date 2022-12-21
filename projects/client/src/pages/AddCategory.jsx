import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { axiosInstance } from "../api";
import { useRef, useState } from "react";
import * as Yup from "yup";
import SuperAdminNavbar from "../components/SuperAdminNavbar";
import UpperBarSprAdm from "../components/UpperBarSprAdm";
import uploadImage from "../assets/upload_image.png";
import CategoryListBar from "../components/CategoryListBar";

const AddCategory = () => {
  const toast = useToast();
  const inputFileRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(uploadImage);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      category_name: "",
      icon_url: null,
    },
    onSubmit: async (values) => {
      try {
        let newData = new FormData();

        newData.append("category_name", values.category_name);
        newData.append("icon_url", values.icon_url);

        await axiosInstance.post("/category", newData);

        formik.setFieldValue("category_name", "");
        formik.setFieldValue("icon_url", null);

        toast({
          title: "Add category successful",
          status: "success",
        });
      } catch (err) {
        console.log(err);
        toast({
          title: "Failed to add",
          status: "error",
        });
      }
    },
    validationSchema: Yup.object({
      icon_url: Yup.mixed()
        .nullable()
        .required("a file is required")
        .test(
          "format",
          "extension file doesn't match",
          (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
        )
        .test(
          "file size",
          "Uploaded file is too big.",
          (value) => !value || (value && value.size <= FILE_SIZE)
        ),
      category_name: Yup.string()
        .required()
        .min(5, "category name must be at least 5 characters")
        .max(30, "category name must be at most 30 characters"),
    }),
    validateOnChange: false,
  });

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const FILE_SIZE = 1282810;

  //   const validateInput = () => {
  //     if (formik.validateForm()) {
  //       return;
  //     } else {
  //       onOpen();
  //     }
  //   };

  const refreshPage = () => {
    formik.handleSubmit();
    // window.location.reload();
  };

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  return (
    <Box
      backgroundColor={"#F4F1DE"}
      height={"932px"}
      fontFamily={"roboto"}
      fontSize={"16px"}
    >
      <Box>
        <CategoryListBar />
      </Box>
      <Box display={"grid"}>
        <VStack spacing={4} align="stretch" mt={"90px"}>
          <Box h="300px" display={"flex"} justifyContent={"center"}>
            <Image
              src={
                formik?.values?.icon_url === null ? uploadImage : selectedImage
              }
              alt="search"
              objectFit={"contain"}
              height={"100%"}
              maxW={"300px"}
            />
          </Box>
          <Box h="auto" px={"30px"}>
            <FormControl isInvalid={formik.errors.icon_url}>
              <FormLabel fontWeight={"bold"}>Icon:</FormLabel>
              <Input
                ref={inputFileRef}
                display={"none"}
                type="file"
                name="icon_url"
                accept="image/*"
                onChange={(event) => {
                  formik.setFieldValue("icon_url", event.target.files[0]);

                  if (
                    !event.target.files.length &&
                    event.target.files.length === 0
                  ) {
                    return setSelectedImage(uploadImage);
                  }

                  setSelectedImage(URL.createObjectURL(event.target.files[0]));
                }}
                _placeholder={{ color: "black.500" }}
                bgColor={"white"}
              />
              <Button
                fontWeight={"normal"}
                width={"100%"}
                bgColor={"#81B29A"}
                color={"white"}
                onClick={() => {
                  inputFileRef.current.click();
                }}
                _hover={{ bgColor: "#81B29A" }}
              >
                <Text
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  width={"250px"}
                >
                  {formik?.values?.icon_url?.name || "Upload Icon"}
                </Text>
              </Button>
              <FormErrorMessage>{formik.errors.icon_url}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.category_name} mt={"5px"}>
              <FormLabel fontWeight={"bold"}>Category Name:</FormLabel>
              <Input
                value={formik.values.category_name}
                name="category_name"
                onChange={formChangeHandler}
                size="md"
                bgColor={"white"}
              />
              <FormErrorMessage>{formik.errors.category_name}</FormErrorMessage>
            </FormControl>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Button
              bgColor={"#81B29A"}
              borderRadius={"15px"}
              _hover={{
                bgColor: "#81B29A",
              }}
              onClick={formik.handleSubmit}
              color={"white"}
              width={"100%"}
              marginX={"30px"}
              mt={"10px"}
              //   isDisabled={
              //     !formik.values.category_name || !formik.values.icon_url
              //   }
            >
              Add Category
            </Button>
          </Box>
        </VStack>
      </Box>

      {/* modal */}
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={"400px"}>
          <ModalHeader>Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid
              columns={"4"}
              spacing={5}
              textAlign={"center"}
              alignItems={"center"}
              bgColor={"white"}
              p={"5"}
              mt={"10px"}
            >
              <Box display={"grid"}>
                <Image
                  justifySelf={"center"}
                  src={selectedImage}
                  w={"50px"}
                  alignItems={"center"}
                />
                <Text fontSize={"xs"}>{formik.values.category_name}</Text>
              </Box>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button bgColor={"#81B29A"} onClick={refreshPage}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Box>
  );
};

export default AddCategory;
