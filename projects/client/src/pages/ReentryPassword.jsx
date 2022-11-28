import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import backIcon from "../assets/back_icon.png";
import grocerinLogoWithText from "../assets/grocerin_logo.png";
import shoppingPic from "../assets/frozen_food_shopping.png";
import { axiosInstance } from "../api";

const ReentryPassword = () => {
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
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ password }) => {
      try {
      } catch (error) {
        console.log(error.response);
      }
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      confirmPassword: Yup.string()
        .required("please retype your password.")
        .oneOf([Yup.ref("password")], "Your passwords do not match."),
    }),
    validateOnChange: false,
  });

  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  return (
    <>
      <Box height={"932px"}>
        <Box marginTop={"20px"} marginLeft={"20px"}>
          <Image
            objectFit="cover"
            src={backIcon}
            alt="back"
            height={"40px"}
            onClick={() => navigate(-1)}
          />
        </Box>
        <Box>
          <Image
            src={grocerinLogoWithText}
            alt="logo"
            height={"240px"}
            width={"317px"}
            display={"block"}
            marginLeft={"auto"}
            marginRight={"auto"}
            marginTop={"60px"}
          />
        </Box>
        <Box
          marginLeft={"50px"}
          marginRight={"50px"}
          marginTop={0}
          fontFamily={"Roboto"}
        >
          <form onSubmit={formik.handleSubmit}>
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
                  bgColor={"#D9D9D9"}
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
                  bgColor={"#D9D9D9"}
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
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
        <Box display={"grid"} my={"50px"}>
          <Image
            src={shoppingPic}
            alt="logo"
            height={"200px"}
            justifySelf={"center"}
          />
        </Box>
      </Box>
    </>
  );
};

export default ReentryPassword;
