import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";

import addIcon from "../assets/add.png";
import ProductListBar from "../components/ProductListBar";
import uploadProduct from "../assets/product_upload.png";
import Select from "react-select";
import { axiosInstance } from "../api";
import { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddProductSprAdm = () => {
  const [category, setCategory] = useState([]);
  const [selectedImage, setSelectedImage] = useState(uploadProduct);
  const inputFileRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const colourStyles = {
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "grey",
        paddingLeft: "10px",
      };
    },
  };

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  const fetchCategory = async () => {
    try {
      const response = await axiosInstance.get(`/category`);

      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderCategory = category.map((val) => {
    return {
      value: val.id,
      label: val.category_name,
    };
  });

  const formik = useFormik({
    initialValues: {
      product_name: "",
      product_price: "",
      product_description: "",
      product_image: null,
      CategoryId: "",
    },
    onSubmit: async ({
      product_description,
      product_image,
      product_name,
      product_price,
      CategoryId,
    }) => {
      try {
        let newProduct = new FormData();

        newProduct.append("product_name", product_name);
        newProduct.append("product_price", product_price);
        newProduct.append("product_image", product_image);
        newProduct.append("product_description", product_description);
        newProduct.append("CategoryId", CategoryId);

        const response = await axiosInstance.post("/admin-product", newProduct);

        formik.setFieldValue("product_name", "");
        formik.setFieldValue("product_price", "");
        formik.setFieldValue("product_image", null);
        formik.setFieldValue("CategoryId", "");
        formik.setFieldValue("product_description", "");

        toast({
          title: "Product Created",
          description: response.data.message,
          status: "success",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Product not created",
          description: error.response.data.message,
          status: "error",
        });
      }
    },
    validationSchema: Yup.object({
      product_image: Yup.mixed()
        .nullable()
        .required("a file is required")
        .test(
          "format",
          "extension file doesn't match",
          (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
        ),
      product_name: Yup.string().required("product name is a required field"),
      product_price: Yup.number()
        .min(1, "value must be greater than 0")
        .required("product price is a required field"),
      CategoryId: Yup.number().required("category is a required field"),
      product_description: Yup.string()
        .min(1)
        .max(200)
        .required("product description is a required field"),
    }),
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <Box
      backgroundColor={"#F4F1DE"}
      height={"1050px"}
      fontFamily={"roboto"}
      fontSize={"16px"}
    >
      <Box>
        <ProductListBar />
      </Box>
      <Box display={"grid"}>
        <VStack spacing={4} align="stretch" mt={"90px"}>
          <Box h="300px" display={"flex"} justifyContent={"center"}>
            <Image
              src={selectedImage}
              alt="search"
              objectFit={"contain"}
              height={"100%"}
            />
          </Box>
          <Box h="auto" px={"30px"}>
            <FormControl isInvalid={formik.errors.product_image}>
              <FormLabel fontWeight={"bold"}>Product Image:</FormLabel>
              <Input
                ref={inputFileRef}
                display={"none"}
                type="file"
                name="product_image"
                accept="image/*"
                onChange={(event) => {
                  formik.setFieldValue("product_image", event.target.files[0]);

                  if (
                    !event.target.files.length &&
                    event.target.files.length === 0
                  ) {
                    return setSelectedImage(uploadProduct);
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
                {formik?.values?.product_image?.name || "Choose Image"}
              </Button>
              <FormErrorMessage>{formik.errors.product_image}</FormErrorMessage>
            </FormControl>
            <FormControl mt={"5px"} isInvalid={formik.errors.product_name}>
              <FormLabel fontWeight={"bold"}>Product Name:</FormLabel>
              <Input
                type="text"
                placeholder="Enter product name"
                _placeholder={{ color: "black.500" }}
                name="product_name"
                bgColor={"white"}
                value={formik.values.product_name}
                onChange={formChangeHandler}
              />
              <FormErrorMessage>{formik.errors.product_name}</FormErrorMessage>
            </FormControl>
            <FormControl mt={"5px"} isInvalid={formik.errors.product_price}>
              <FormLabel fontWeight={"bold"}>Product Price:</FormLabel>
              <InputGroup>
                <InputLeftAddon backgroundColor={"#81B29A"} color={"white"}>
                  Rp.
                </InputLeftAddon>
                <Input
                  type="number"
                  placeholder="Enter product price"
                  _placeholder={{ color: "black.500" }}
                  name="product_price"
                  bgColor={"white"}
                  value={formik.values.product_price}
                  onChange={formChangeHandler}
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.product_price}</FormErrorMessage>
            </FormControl>
            <FormControl mt={"5px"} isInvalid={formik.errors.CategoryId}>
              <FormLabel fontWeight={"bold"}>Category:</FormLabel>
              <Select
                options={renderCategory}
                styles={colourStyles}
                name="CategoryId"
                onChange={(event) =>
                  formik.setFieldValue("CategoryId", event.value)
                }
                placeholder={"Select Category"}
              />
              <FormErrorMessage>{formik.errors.CategoryId}</FormErrorMessage>
            </FormControl>
            <FormControl
              mt={"5px"}
              isInvalid={formik.errors.product_description}
            >
              <FormLabel fontWeight={"bold"}>Description:</FormLabel>
              <Textarea
                placeholder="Write product description"
                bgColor={"white"}
                overflow={"scroll"}
                value={formik.values.product_description}
                onChange={formChangeHandler}
                name="product_description"
              />
              <FormErrorMessage>
                {formik.errors.product_description}
              </FormErrorMessage>
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
              isDisabled={formik.isSubmitting}
              color={"white"}
              width={"100%"}
              marginX={"30px"}
            >
              Add Product
            </Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default AddProductSprAdm;
