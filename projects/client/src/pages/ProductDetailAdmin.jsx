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
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import ProductListBar from "../components/ProductListBar";
import uploadProduct from "../assets/product_upload.png";
import { useState } from "react";
import { axiosInstance } from "../api";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ProductDetailAdmin = () => {
  const [selectedImage, setSelectedImage] = useState(uploadProduct);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editMode, setEditMode] = useState(false);
  const [stockAndDiscount, setStockAndDiscount] = useState({});
  const [productDetail, setProductDetail] = useState({});

  const params = useParams();

  const toast = useToast();

  const fetchProductDetail = async () => {
    try {
      const response = await axiosInstance.get(
        `/admin-product/branch/${params.id}`
      );

      setProductDetail(response.data.data);
      setStockAndDiscount(response.data.data.ProductBranches[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      stock: stockAndDiscount.stock,
      discount_amount_nominal: stockAndDiscount.discount_amount_nominal,
      discount_amount_percentage: stockAndDiscount.discount_amount_percentage,
    },
    enableReinitialize: true,
    onSubmit: async ({
      stock,
      discount_amount_nominal,
      discount_amount_percentage,
    }) => {
      try {
        await axiosInstance.patch(`/admin-product/branch/${params.id}`, {
          stock: stock,
          discount_amount_nominal: discount_amount_nominal,
          discount_amount_percentage: discount_amount_percentage,
        });

        fetchProductDetail();
        setEditMode(false);

        toast({
          title: "Product Updated",
          status: "info",
        });
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: Yup.object({
      stock: Yup.number()
        .moreThan(-1, "stock must be 0 or more than 0")
        .required("at least put 0 if stock doesnt exist"),
      discount_amount_nominal: Yup.number()
        .min(0, "discount must be at least 0")
        .required("at least put 0 if discount doesnt exist"),
      discount_amount_percentage: Yup.number()
        .lessThan(100, "discount must be less than 100")
        .moreThan(-1, "discount must be at least 0 or more than 0")
        .required("at least put 0 if discount doesnt exist"),
    }),
    validateOnChange: false,
  });

  const discountPercentageHandler = (value) => {
    formik.setFieldValue("discount_amount_percentage", value);

    formik.setFieldValue("discount_amount_nominal", 0);
  };

  const discountNominalHandler = ({ target }) => {
    const { value } = target;
    formik.setFieldValue("discount_amount_nominal", value);

    formik.setFieldValue("discount_amount_percentage", 0);
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const showDiscount = () => {
    if (
      stockAndDiscount.discount_amount_nominal === 0 &&
      stockAndDiscount.discount_amount_percentage === 0
    ) {
      return (
        <Box
          bgColor={"white"}
          border={"1px solid #E07A5F"}
          borderRadius={"5px"}
          height={"40px"}
          py={"8px"}
          mt={"8px"}
        >
          <Text ml={"16px"}>{"0" || "Loading..."}</Text>
        </Box>
      );
    } else if (stockAndDiscount.discount_amount_nominal === 0) {
      return (
        <Box
          bgColor={"white"}
          border={"1px solid #E07A5F"}
          borderRadius={"5px"}
          height={"40px"}
          py={"8px"}
          mt={"8px"}
        >
          <Text ml={"16px"}>
            {`${stockAndDiscount?.discount_amount_percentage} %` ||
              "Loading..."}
          </Text>
        </Box>
      );
    } else if (stockAndDiscount.discount_amount_percentage === 0) {
      return (
        <Box
          bgColor={"white"}
          border={"1px solid #E07A5F"}
          borderRadius={"5px"}
          height={"40px"}
          py={"8px"}
          mt={"8px"}
        >
          <Text ml={"16px"}>
            {formatRupiah(stockAndDiscount?.discount_amount_nominal) ||
              "Loading..."}
          </Text>
        </Box>
      );
    } else {
      return (
        <Box
          bgColor={"white"}
          border={"1px solid #E07A5F"}
          borderRadius={"5px"}
          height={"40px"}
          py={"8px"}
          mt={"8px"}
        >
          <Text ml={"16px"}>{"Loading..."}</Text>
        </Box>
      );
    }
  };

  const showStock = () => {
    if (stockAndDiscount.stock === 0) {
      return (
        <Box
          bgColor={"white"}
          border={"1px solid #E07A5F"}
          borderRadius={"5px"}
          height={"40px"}
          py={"8px"}
          mt={"8px"}
        >
          <Text ml={"16px"}>{"0" || "Loading..."}</Text>
        </Box>
      );
    } else {
      return (
        <Box
          bgColor={"white"}
          border={"1px solid #E07A5F"}
          borderRadius={"5px"}
          height={"40px"}
          py={"8px"}
          mt={"8px"}
        >
          <Text ml={"16px"}>{stockAndDiscount?.stock || "Loading..."}</Text>
        </Box>
      );
    }
  };

  const startEdit = () => {
    setEditMode(true);
  };

  const stopEdit = () => {
    setEditMode(false);
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  return (
    <Box
      backgroundColor={"#F4F1DE"}
      height={"1200px"}
      fontFamily={"roboto"}
      fontSize={"16px"}
    >
      <Box>
        <ProductListBar />
      </Box>

      {editMode ? (
        // edit mode
        <Box display={"grid"}>
          <VStack spacing={4} align="stretch" mt={"90px"}>
            <Box h="300px" display={"flex"} justifyContent={"center"}>
              <Image
                src={productDetail?.product_image || selectedImage}
                alt="search"
                objectFit={"contain"}
                height={"100%"}
                maxW={"300px"}
              />
            </Box>
            <Box px={"30px"}>
              <Box fontWeight={"bold"} display={"flex"}>
                <Text>Product Name:</Text>
                <Text
                  marginLeft={"10px"}
                  fontStyle={"italic"}
                  color={"#E07A5F"}
                  fontSize={"14px"}
                  mt={"2px"}
                >
                  - Not editable by Admin
                </Text>
              </Box>
              <Box
                bgColor={"lightgrey"}
                borderRadius={"5px"}
                border={"1px solid lightgrey"}
                height={"40px"}
                py={"8px"}
                mt={"8px"}
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
              <Box fontWeight={"bold"} display={"flex"} mt={"5px"}>
                <Text>Product Price:</Text>
                <Text
                  marginLeft={"10px"}
                  fontStyle={"italic"}
                  color={"#E07A5F"}
                  fontSize={"14px"}
                  mt={"2px"}
                >
                  - Not editable by Admin
                </Text>
              </Box>
              <Box
                bgColor={"lightgrey"}
                borderRadius={"5px"}
                border={"1px solid lightgrey"}
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
              <Box fontWeight={"bold"} display={"flex"} mt={"5px"}>
                <Text>Category:</Text>
                <Text
                  marginLeft={"10px"}
                  fontStyle={"italic"}
                  color={"#E07A5F"}
                  fontSize={"14px"}
                  mt={"2px"}
                >
                  - Not editable by Admin
                </Text>
              </Box>
              <Box
                bgColor={"lightgrey"}
                borderRadius={"5px"}
                border={"1px solid lightgrey"}
                height={"40px"}
                py={"8px"}
                mt={"8px"}
              >
                <Text ml={"16px"}>
                  {productDetail?.Category?.category_name || "Loading..."}
                </Text>
              </Box>
              <Box fontWeight={"bold"} display={"flex"} mt={"5px"}>
                <Text>Description:</Text>
                <Text
                  marginLeft={"10px"}
                  fontStyle={"italic"}
                  color={"#E07A5F"}
                  fontSize={"14px"}
                  mt={"2px"}
                >
                  - Not editable by Admin
                </Text>
              </Box>
              <Box
                bgColor={"lightgrey"}
                borderRadius={"5px"}
                border={"1px solid lightgrey"}
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
              <FormControl
                mt={"5px"}
                borderRadius={"5px"}
                isInvalid={formik.errors.stock}
              >
                <FormLabel fontWeight={"bold"}>Stock:</FormLabel>
                <NumberInput
                  // min={0}
                  bgColor={"white"}
                  mt={"8px"}
                  borderRadius={"5px"}
                  name="stock"
                  value={formik.values.stock}
                  onChange={(event) => formik.setFieldValue("stock", event)}
                >
                  <NumberInputField placeholder="Enter product stock" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>{formik.errors.stock}</FormErrorMessage>
              </FormControl>
              <FormControl
                mt={"5px"}
                isInvalid={formik.errors.discount_amount_nominal}
              >
                <FormLabel fontWeight={"bold"} display={"flex"}>
                  <Text>Discount:</Text>
                  <Text
                    marginLeft={"10px"}
                    fontStyle={"italic"}
                    color={"#E07A5F"}
                    fontSize={"14px"}
                    mt={"2px"}
                  >
                    - Fill one of type discount below
                  </Text>
                </FormLabel>
                <InputGroup mt={"8px"}>
                  <InputLeftAddon
                    backgroundColor={"#81B29A"}
                    color={"white"}
                    width={"52px"}
                  >
                    Rp.
                  </InputLeftAddon>
                  <Input
                    type="number"
                    placeholder="Enter product discount"
                    _placeholder={{ color: "black.500" }}
                    name="discount_amount_nominal"
                    bgColor={"white"}
                    value={formik.values.discount_amount_nominal}
                    onChange={discountNominalHandler}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {formik.errors.discount_amount_nominal}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                mt={"5px"}
                isInvalid={formik.errors.discount_amount_percentage}
              >
                <InputGroup>
                  <NumberInput
                    // min={0}
                    bgColor={"white"}
                    mt={"10px"}
                    borderRadius={"5px"}
                    width={"100%"}
                    name="discount_amount_percentage"
                    placeholder="Enter product discount"
                    // defaultValue={formik.values.discount_amount_percentage}
                    value={formik.values.discount_amount_percentage}
                    onChange={discountPercentageHandler}
                    // max={99}
                  >
                    <NumberInputField
                      width={"100%"}
                      borderRightRadius={"0"}
                      placeholder="Enter product discount"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <InputRightAddon
                    backgroundColor={"#81B29A"}
                    mt={"10px"}
                    maxWidth={"auto"}
                    color={"white"}
                  >
                    %
                  </InputRightAddon>
                </InputGroup>
                <FormErrorMessage>
                  {formik.errors.discount_amount_percentage}
                </FormErrorMessage>
              </FormControl>
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
                src={productDetail?.product_image || selectedImage}
                alt="search"
                objectFit={"contain"}
                height={"100%"}
                maxW={"300px"}
                border={"2px solid #E07A5F"}
                borderRadius={"10px"}
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
                height={"40px"}
                py={"8px"}
                mt={"8px"}
                display={"flex"}
                border={"1px solid #E07A5F"}
                borderRadius={"5px"}
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
                height={"40px"}
                py={"8px"}
                mt={"8px"}
                border={"1px solid #E07A5F"}
                borderRadius={"5px"}
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
                height={"120px"}
                py={"8px"}
                mt={"8px"}
                overflowY={"scroll"}
                maxWidth={"420px"}
                border={"1px solid #E07A5F"}
                borderRadius={"5px"}
              >
                <Text mx={"16px"}>
                  {productDetail?.product_description || "Loading..."}
                </Text>
              </Box>
              <Box fontWeight={"bold"} mt={"5px"}>
                Stock:
              </Box>
              {showStock()}
              <Box fontWeight={"bold"} mt={"5px"}>
                Discount:
              </Box>
              {showDiscount()}
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
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

      {/* alert for submit */}
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent
            mt={"150px"}
            fontFamily={"roboto"}
            fontSize={"16px"}
            bgColor={"#F4F1DE"}
          >
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              ml={"10px"}
              mt={"10px"}
            >
              Submit Edit
            </AlertDialogHeader>

            <AlertDialogBody ml={"10px"}>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter display={"contents"}>
              <Button
                onClick={onClose}
                mx={"30px"}
                mt={"10px"}
                borderRadius={"15px"}
                bgColor={"#81B29A"}
                color={"white"}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={onClose}
                mx={"30px"}
                mt={"10px"}
                mb={"40px"}
                borderRadius={"15px"}
                bgColor={"#E07A5F"}
              >
                Submit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {/* alert for submit edit */}
    </Box>
  );
};

export default ProductDetailAdmin;
