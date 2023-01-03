import {
  Box,
  Stack,
  FormControl,
  Input,
  Button,
  useToast,
  Text,
  FormErrorMessage,
  Image,
  FormLabel,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { axiosInstance } from "../api";
import { useFormik } from "formik";
import * as Yup from "yup";
import UpperBarSprAdm from "../components/UpperBarSprAdm";
import SuperAdminNavbar from "../components/SuperAdminNavbar";
import CategoryListBar from "../components/CategoryListBar";
import uploadImage from "../assets/upload_image.png";

const CategoryEdit = () => {
  const [category, setCategory] = useState({});
  const [selectedImage, setSelectedImage] = useState(uploadImage);

  const params = useParams();
  const inputFileRef = useRef(null);
  const navigate = useNavigate();

  const fetchCategory = async () => {
    try {
      const response = await axiosInstance.get(`/category/${params.id}`);

      setCategory(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const toast = useToast();

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const FILE_SIZE = 1282810;

  const formik = useFormik({
    initialValues: {
      category_name: category.category_name,
      icon_url: null,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const categoryData = new FormData();

        if (
          values.category_name &&
          values.category_name !== category.category_name
        ) {
          categoryData.append("category_name", values.category_name);
        }

        if (values.icon_url) {
          categoryData.append("icon_url", values.icon_url);
        }

        await axiosInstance.patch(`/category/${params.id}`, categoryData);

        fetchCategory();

        toast({ title: "Category Edited", status: "success" });
      } catch (err) {
        toast({ title: "Network Error", status: "error" });
        console.log(err);
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
        .required("category name is a required field")
        .min(5, "category name must be at least 5 characters")
        .max(30, "category name must be at most 30 characters"),
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
      height={"932px"}
      fontFamily={"roboto"}
      fontSize={"16px"}
    >
      <Box>
        <CategoryListBar />
      </Box>
      <Stack spacing={3} p={"30px"} pt={"100px"}>
        <Box h="300px" display={"flex"} justifyContent={"center"}>
          <Image
            src={
              formik?.values?.icon_url === null
                ? category.icon_url
                : selectedImage
            }
            alt="search"
            objectFit={"contain"}
            height={"100%"}
            maxW={"300px"}
          />
        </Box>
        <Box pt={"40px"}>
          <FormControl>
            <Input
              ref={inputFileRef}
              display="none"
              name="icon_url"
              type="file"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue("icon_url", event.target.files[0]);

                setSelectedImage(URL.createObjectURL(event.target.files[0]));
              }}
            />
            <Button
              onClick={() => {
                inputFileRef.current.click();
              }}
              width="100%"
              bgColor={"#81B29A"}
              _hover={{
                bgColor: "#81B29A",
              }}
              color="white"
              fontWeight={"normal"}
            >
              {formik?.values?.icon_url?.name || "Upload Icon"}
            </Button>
            <FormErrorMessage>{formik.errors.icon_url}</FormErrorMessage>
          </FormControl>
          <FormControl mt={"5px"} isInvalid={formik.errors.category_name}>
            <FormLabel fontWeight={"bold"}>Category Name:</FormLabel>
            <Input
              type="text"
              placeholder="Enter product name"
              _placeholder={{ color: "black.500" }}
              name="category_name"
              bgColor={"white"}
              value={formik?.values?.category_name || ""}
              onChange={formChangeHandler}
            />
            <FormErrorMessage>{formik.errors.category_name}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box display={"flex"} justifyContent={"space-evenly"}>
          <Button
            bgColor={"#E07A5F"}
            borderRadius={"15px"}
            _hover={{
              bg: "#E07A5F",
            }}
            color={"white"}
            width={"100%"}
            onClick={() => navigate(-1)}
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
            width={"100%"}
            ml={"30px"}
            onClick={formik.handleSubmit}
            isDisabled={formik.isSubmitting}
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default CategoryEdit;
