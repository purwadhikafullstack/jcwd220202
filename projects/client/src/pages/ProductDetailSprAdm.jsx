import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import ProductListBar from "../components/ProductListBar";
import uploadProduct from "../assets/product_upload.png";
import { useRef, useState, useEffect } from "react";
import Select from "react-select";
import { axiosInstance } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const ProductDetailSprAdm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editMode, setEditMode] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [category, setCategory] = useState([]);

  const params = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const inputFileRef = useRef(null);

  const startEdit = () => {
    setEditMode(true);
  };

  const stopEdit = () => {
    setEditMode(false);
  };

  const openDeleteAlert = () => {
    onOpen();

    document.body.style.overflow = "hidden";
  };

  const closeDeleteAlert = () => {
    onClose();

    document.body.style.overflow = "unset";
  };

  const fetchProductDetail = async () => {
    try {
      const response = await axiosInstance.get(
        `/admin-product/super-admin/${params.id}`
      );

      setProductDetail(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(productDetail);

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

  const colourStyles = {
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "grey",
        paddingLeft: "10px",
      };
    },
  };

  const deleteBtnHandler = async () => {
    try {
      await axiosInstance.delete(`/admin-product/super-admin/${params.id}`);

      navigate("/super-admin/product");
      closeDeleteAlert();
      toast({
        title: "Product Deleted",
        status: "info",
        position: "top",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Server Error",
        status: "error",
        position: "top",
      });
    }
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const FILE_SIZE = 1282810;

  const formik = useFormik({
    initialValues: {
      product_name: productDetail.product_name,
      product_price: productDetail.product_price,
      product_description: productDetail.product_description,
      product_image: null,
      CategoryId: null,
    },
    enableReinitialize: true,
    onSubmit: async ({
      product_description,
      product_image,
      product_name,
      product_price,
      CategoryId,
    }) => {
      try {
        const productData = new FormData();

        if (product_name && product_name !== productDetail.product_name) {
          productData.append("product_name", product_name);
        }

        if (
          product_description &&
          product_description !== productDetail.product_description
        ) {
          productData.append("product_description", product_description);
        }

        if (product_price && product_price !== productDetail.product_price) {
          productData.append("product_price", product_price);
        }

        if (CategoryId && CategoryId !== productDetail.CategoryId) {
          productData.append("CategoryId", CategoryId.value);
        }

        if (product_image) {
          productData.append("product_image", product_image);
        }

        await axiosInstance.patch(
          `/admin-product/super-admin/${productDetail.id}`,
          productData
        );

        fetchProductDetail();
        setEditMode(false);

        toast({
          title: "Product Updated",
          status: "info",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Product not Edited",
          description: error.response.data.message,
          status: "error",
        });
      }
    },
    validationSchema: Yup.object({
      product_image: Yup.mixed()
        .nullable()
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
      product_name: Yup.string(),
      product_price: Yup.number().min(1, "value must be greater than 0"),
      CategoryId: Yup.mixed().nullable(),
      product_description: Yup.string()
        .min(1)
        .max(240, "product description must not exceed 240 chars"),
    }),
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

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

      {editMode ? (
        <Box display={"grid"}>
          <VStack spacing={4} align="stretch" mt={"90px"}>
            <Box h="300px" display={"flex"} justifyContent={"center"}>
              <Image
                src={
                  formik?.values?.product_image
                    ? selectedImage
                    : productDetail.product_image
                }
                alt="search"
                objectFit={"contain"}
                height={"100%"}
                maxW={"300px"}
              />
            </Box>
            <Box h="auto" px={"30px"}>
              <FormControl isInvalid={formik.errors.product_image}>
                <FormLabel fontWeight={"bold"}>Product Image:</FormLabel>
                <Input
                  type="file"
                  ref={inputFileRef}
                  display={"none"}
                  name="product_image"
                  accept="image/*"
                  _placeholder={{ color: "black.500" }}
                  bgColor={"white"}
                  onChange={(event) => {
                    formik.setFieldValue(
                      "product_image",
                      event.target.files[0]
                    );

                    setSelectedImage(
                      URL.createObjectURL(event.target.files[0])
                    );
                  }}
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
                    {formik?.values?.product_image?.name || "Choose Image"}
                  </Text>
                </Button>
                <FormErrorMessage>
                  {formik.errors.product_image}
                </FormErrorMessage>
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
                <FormErrorMessage>
                  {formik.errors.product_name}
                </FormErrorMessage>
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
                <FormErrorMessage>
                  {formik.errors.product_price}
                </FormErrorMessage>
              </FormControl>
              <FormControl mt={"5px"} isInvalid={formik.errors.CategoryId}>
                <FormLabel fontWeight={"bold"}>Category:</FormLabel>
                <Select
                  // value={formik.values.CategoryId || null}
                  value={
                    formik.values.CategoryId === null
                      ? renderCategory.find(
                          ({ value }) => value === productDetail.CategoryId
                        )
                      : formik.values.CategoryId
                  }
                  options={renderCategory}
                  styles={colourStyles}
                  name="CategoryId"
                  onChange={(event) => {
                    formik.setFieldValue("CategoryId", event);
                  }}
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
                  overflowY={"scroll"}
                  name="product_description"
                  value={formik.values.product_description}
                  onChange={formChangeHandler}
                  height={"120px"}
                />
                <FormErrorMessage>
                  {formik.errors.product_description}
                </FormErrorMessage>
              </FormControl>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Button
                bgColor={"#E07A5F"}
                borderRadius={"15px"}
                _hover={{
                  bg: "#E07A5F",
                }}
                color={"white"}
                marginLeft={"30px"}
                width={"100%"}
                onClick={stopEdit}
              >
                Cancel
              </Button>
              <Button
                bgColor={"#81B29A"}
                borderRadius={"15px"}
                _hover={{
                  bgColor: "#81B29A",
                }}
                color={"white"}
                marginX={"30px"}
                width={"100%"}
                onClick={formik.handleSubmit}
                isDisabled={formik.isSubmitting}
              >
                Submit
              </Button>
            </Box>
          </VStack>
        </Box>
      ) : (
        // not edit mode
        <Box display={"grid"}>
          <VStack spacing={4} align="stretch" mt={"90px"}>
            <Box h="300px" display={"flex"} justifyContent={"center"}>
              <Image
                src={productDetail?.product_image || "Loading...'"}
                alt="Picture"
                objectFit={"contain"}
                height={"100%"}
                maxW={"300px"}
                border={"1px solid #E07A5F"}
                borderRadius={"5px"}
              />
            </Box>
            <Box px={"30px"}>
              <Box fontWeight={"bold"}>Product Name:</Box>
              <Box
                bgColor={"white"}
                height={"40px"}
                py={"8px"}
                mt={"8px"}
                border={"1px solid #E07A5F"}
                borderRadius={"5px"}
              >
                <Text
                  ml={"16px"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                  width={"280px"}
                >
                  {productDetail?.product_name || "Loading..."}
                </Text>
              </Box>
              <Box fontWeight={"bold"} mt={"5px"}>
                Product Price:
              </Box>
              <Box
                bgColor={"white"}
                border={"1px solid #E07A5F"}
                borderRadius={"5px"}
                height={"40px"}
                py={"8px"}
                mt={"8px"}
                display={"flex"}
              >
                <Text ml={"16px"}>
                  {productDetail.product_price
                    ? formatRupiah(productDetail?.product_price)
                    : "Loading..."}
                </Text>
              </Box>
              <Box fontWeight={"bold"} mt={"5px"}>
                Category:
              </Box>
              <Box
                bgColor={"white"}
                border={"1px solid #E07A5F"}
                borderRadius={"5px"}
                height={"40px"}
                py={"8px"}
                mt={"8px"}
              >
                <Text ml={"16px"}>
                  {productDetail?.Category?.category_name || "Loading..."}
                </Text>
              </Box>
              <Box fontWeight={"bold"} mt={"5px"}>
                Description:
              </Box>
              <Box
                bgColor={"white"}
                border={"1px solid #E07A5F"}
                borderRadius={"5px"}
                height={"120px"}
                py={"8px"}
                mt={"8px"}
                overflowY={"scroll"}
                maxWidth={"420px"}
              >
                <Text mx={"16px"}>
                  {productDetail.product_description || "Loading..."}
                </Text>
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Button
                bgColor={"#E07A5F"}
                borderRadius={"15px"}
                _hover={{
                  bgColor: "#E07A5F",
                }}
                color={"white"}
                width={"100%"}
                marginLeft={"30px"}
                onClick={openDeleteAlert}
              >
                Delete
              </Button>
              <Button
                bgColor={"#81B29A"}
                borderRadius={"15px"}
                _hover={{
                  bgColor: "#81B29A",
                }}
                color={"white"}
                marginX={"30px"}
                width={"100%"}
                onClick={startEdit}
              >
                Edit
              </Button>
            </Box>
          </VStack>
        </Box>
      )}

      {/* alert for delete */}
      <AlertDialog isOpen={isOpen} onClose={closeDeleteAlert}>
        <AlertDialogOverlay>
          <AlertDialogContent
            mt={"35vh"}
            fontFamily={"roboto"}
            fontSize={"16px"}
            bgColor={"#F4F1DE"}
          >
            <AlertDialogHeader
              fontSize={"16px"}
              fontWeight="bold"
              ml={"10px"}
              mt={"10px"}
            >
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody ml={"10px"}>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter display={"contents"}>
              <Button
                onClick={closeDeleteAlert}
                mx={"30px"}
                mt={"10px"}
                borderRadius={"15px"}
                bgColor={"#81B29A"}
                color={"white"}
                _hover={{
                  bgColor: "green.500",
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={deleteBtnHandler}
                mx={"30px"}
                mt={"10px"}
                mb={"40px"}
                borderRadius={"15px"}
                bgColor={"#E07A5F"}
                _hover={{
                  bgColor: "red.500",
                }}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {/* alert for delete */}
    </Box>
  );
};

export default ProductDetailSprAdm;
