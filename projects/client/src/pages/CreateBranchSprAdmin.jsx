import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import grocerinLogo from "../assets/grocerin_logo_aja.png";
import backIcon from "../assets/back_icon.png";
import signUp from "../assets/signup.png";
import { axiosInstance } from "../api";

const CreateBranch = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      cityName: "",
      branch_name: "",
    },
    onSubmit: async ({ email, password, cityName, branch_name }) => {
      try {
        const response = await axiosInstance.post("/create-admin", {
          email: email,
          password: password,
          cityName: cityName,
          branch_name: branch_name,
        });

        toast({
          title: "Registration Successful",
          description: response.data.message,
          status: "success",
        });
      } catch (error) {
        console.log(error.response);
        toast({
          title: "Registration Failed",
          description: error.response.data.message,
          status: "error",
        });
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      confirmPassword: Yup.string()
        .required("please retype your password.")
        .oneOf([Yup.ref("password")], "Your passwords do not match."),
      cityName: Yup.string().matches(/^[A-Z]/, "first letter must be capital"),
      branch_name: Yup.string(),
    }),
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  return (
    <>
      <Box height={"932px"} bgColor={"#F4F1DE"}>
        <Box
          backgroundColor={"#81B29A"}
          height={"75px"}
          position={"fixed"}
          top={"0"}
          right={"0"}
          left={"0"}
          fontWeight={"bold"}
          zIndex={"4"}
          margin={"auto"}
          maxWidth={"480px"}
        >
          <Flex fontSize={"18px"} fontFamily={"roboto"}>
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
            <Box margin={"25px"}>Register Admin</Box>
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
        </Box>
        <Box display={"flex"} justifyContent={"center"} pt={"20"}>
          <Image
            src={signUp}
            alt="search"
            objectFit={"contain"}
            height={"100%"}
            maxW={"250px"}
          />
        </Box>
        <Box
          marginLeft={"50px"}
          marginRight={"50px"}
          marginTop={0}
          fontFamily={"Roboto"}
        >
          <form
            onSubmit={formik.handleSubmit}
            // isDisabled={formik.isSubmitting}
          >
            <FormControl mt={"10px"} isInvalid={formik.errors.email}>
              <FormLabel fontWeight={"bold"}>Email</FormLabel>
              <Input
                bgColor={"white"}
                type="text"
                placeholder="Enter your email"
                _placeholder={{ color: "black.500" }}
                value={formik.values.email}
                name="email"
                borderRadius={"15px"}
                onChange={formChangeHandler}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl mt={"10px"} isInvalid={formik.errors.password}>
              <FormLabel fontWeight={"bold"}>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  name="password"
                  placeholder="Enter your password"
                  borderRadius={"15px"}
                  _placeholder={{ color: "black.500" }}
                  bgColor={"white"}
                  onChange={formChangeHandler}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    size="sm"
                    color={"white"}
                    borderRadius={"20px"}
                    bgColor={"#81B29A"}
                    fontSize={"16px"}
                    _hover={{
                      bgColor: "#81B29A",
                    }}
                    onClick={togglePassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <FormControl mt={"10px"} isInvalid={formik.errors.confirmPassword}>
              <FormLabel fontWeight={"bold"}>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  placeholder="Enter your password"
                  borderRadius={"15px"}
                  _placeholder={{ color: "black.500" }}
                  bgColor={"white"}
                  onChange={formChangeHandler}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    size="sm"
                    bg={"#1b3c4b"}
                    color={"white"}
                    borderRadius={"20px"}
                    bgColor={"#81B29A"}
                    fontSize={"16px"}
                    _hover={{
                      bgColor: "#81B29A",
                    }}
                    onClick={toggleConfirmPassword}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {formik.errors.confirmPassword}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={"10px"} isInvalid={formik.errors.cityName}>
              <FormLabel fontWeight={"bold"}>City Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your city name"
                value={formik.values.cityName}
                name="cityName"
                borderRadius={"15px"}
                _placeholder={{ color: "black.500" }}
                bgColor={"white"}
                onChange={formChangeHandler}
              />
              <FormErrorMessage>{formik.errors.cityName}</FormErrorMessage>
            </FormControl>
            <FormControl mt={"10px"} isInvalid={formik.errors.branch_name}>
              <FormLabel fontWeight={"bold"}>Branch Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your branch name"
                name="branch_name"
                value={formik.values.branch_name}
                borderRadius={"15px"}
                _placeholder={{ color: "black.500" }}
                bgColor={"white"}
                onChange={formChangeHandler}
              />
              <FormErrorMessage>{formik.errors.branch_name}</FormErrorMessage>
            </FormControl>
            <Box marginTop={"20px"} textAlign={"right"}>
              <Button
                mt={"15px"}
                color={"white"}
                type="submit"
                fontWeight={"bold"}
                borderRadius={"20px"}
                bgColor={"#81B29A"}
                width={"100px"}
                height={"35px"}
                onClick={formik.handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default CreateBranch;
