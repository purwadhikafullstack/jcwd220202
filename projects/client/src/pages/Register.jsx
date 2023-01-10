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
import { axiosInstance } from "../api";

const Register = () => {
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
      phoneNumber: "",
      referralCode: "",
    },
    onSubmit: async ({ email, password, phoneNumber, referralCode }) => {
      try {
        const response = await axiosInstance.post("/register/user", {
          email: email,
          password: password,
          phone_number: phoneNumber,
          referral_code: referralCode,
        });

        toast({
          title: "Registration Successful",
          description: response.data.message,
          status: "success",
        });

        navigate("/login/user");
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
      phoneNumber: Yup.string()
        .required("phone number is a required field")
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid"
        )
        .min(10, "phone number must be contained 10 to 14 characters")
        .max(14, "phone number must be contained 10 to 14 characters"),
      referralCode: Yup.string(),
    }),
    validateOnChange: false,
  });
  const formChangeHandler = ({ target }) => {
    const { name, value } = target;
    formik.setFieldValue(name, value);
  };

  return (
    <>
      <Box height={"932px"} border={"2px solid lightgrey"}>
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
          />
        </Box>
        <Box
          marginLeft={"50px"}
          marginRight={"50px"}
          marginTop={0}
          fontFamily={"Roboto"}
        >
          <form onSubmit={formik.handleSubmit}>
            <FormControl mt={"10px"} isInvalid={formik.errors.email}>
              <FormLabel fontWeight={"bold"}>Email</FormLabel>
              <Input
                type="text"
                placeholder="Enter your email"
                _placeholder={{ color: "black.500" }}
                value={formik.values.email}
                name="email"
                borderRadius={"15px"}
                bgColor={"#D9D9D9"}
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
            <FormControl mt={"10px"} isInvalid={formik.errors.phoneNumber}>
              <FormLabel fontWeight={"bold"}>Phone Number</FormLabel>
              <Input
                type="text"
                placeholder="Enter your phone number"
                value={formik.values.phoneNumber}
                name="phoneNumber"
                borderRadius={"15px"}
                _placeholder={{ color: "black.500" }}
                bgColor={"#D9D9D9"}
                onChange={formChangeHandler}
              />
              <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
            </FormControl>
            <FormControl mt={"10px"} isInvalid={formik.errors.referralCode}>
              <FormLabel fontWeight={"bold"} display={"flex"}>
                <Text>Referral Code</Text>
                <Text
                  marginLeft={"10px"}
                  fontStyle={"italic"}
                  color={"#E07A5F"}
                >
                  - Optional
                </Text>
              </FormLabel>
              <Input
                type="text"
                placeholder="Enter referral code"
                name="referralCode"
                value={formik.values.referralCode}
                borderRadius={"15px"}
                _placeholder={{ color: "black.500" }}
                bgColor={"#D9D9D9"}
                onChange={formChangeHandler}
              />
              <FormErrorMessage>{formik.errors.referralCode}</FormErrorMessage>
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
                isDisabled={formik.isSubmitting}
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

export default Register;
