import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import AdminNavbar from "../components/AdminNavbar";
import { useFormik } from "formik";
import { axiosInstance } from "../api";
import { useRef } from "react";
import * as Yup from "yup";

const AddCategory = () => {
  const toast = useToast();
  const inputFileRef = useRef(null);

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
      category_name: Yup.string().required().min(5).max(20),
    }),
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  return (
    <Box bgColor={"#81B29A"} h={"932px"}>
      <Stack spacing={3} p={10}>
        <FormControl isInvalid={formik.errors.category_name}>
          <Text fontSize={"md"} as={"b"}>
            Category:
          </Text>
          <Input
            value={formik.values.category_name}
            name="category_name"
            onChange={formChangeHandler}
            size="md"
            bgColor={"white"}
          />
          <FormErrorMessage>{formik.errors.category_name}</FormErrorMessage>
        </FormControl>
        <Input
          ref={inputFileRef}
          display="none"
          name="icon_url"
          type="file"
          accept="image/*"
          onChange={(event) => {
            formik.setFieldValue("icon_url", event.target.files[0]);
          }}
        />
        <Button
          onClick={() => {
            inputFileRef.current.click();
          }}
          width="100%"
        >
          {formik?.values?.icon_url?.name || "Upload icon"}
        </Button>
        <Box pt={"5"} textAlign={"right"}>
          <Button
            onClick={formik.handleSubmit}
            isDisabled={formik.isSubmitting}
          >
            Add
          </Button>
        </Box>
      </Stack>
      <AdminNavbar />
    </Box>
  );
};

export default AddCategory;
