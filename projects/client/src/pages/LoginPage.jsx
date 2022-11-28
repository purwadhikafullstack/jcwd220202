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
import backIcon from "../assets/back_icon.png";
import grocerinLogoWithText from "../assets/grocerin_logo.png";
import shoppingPic from "../assets/online_grocery.png";
import { useFormik } from "formik";
import { axiosInstance } from "../api";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
      try {
        const response = await axiosInstance.post("/user/login", {
          email,
          password,
        });
        console.log(response);

        localStorage.setItem("auth_token", response.data.token);
        dispatch(
          login({
            username: response.data.data.username,
            email: response.data.data.email,
            id: response.data.data.id,
            RoleId: response.data.data.RoleId,
          })
        );
        navigate("/");
        toast({
          status: "success",
          title: "Login success",
          description: response.data.message,
        });
      } catch (err) {
        console.log(err);
        toast({
          status: "error",
          title: "Login failed",
          description: err.response.data.message,
        });
      }
    },
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
        <Box marginTop={"10px"}>
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
          fontFamily={"roboto"}
        >
          <form onSubmit={formik.handleSubmit}>
            <FormControl mt={"10px"}>
              <FormLabel fontWeight={"bold"}>Email</FormLabel>
              <Input
                value={formik.values.email}
                type="text"
                placeholder="Enter your email"
                _placeholder={{ color: "black.500" }}
                name="email"
                borderRadius={"15px"}
                bgColor={"#D9D9D9"}
                onChange={formChangeHandler}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl mt={"10px"}>
              <FormLabel fontWeight={"bold"}>Password</FormLabel>
              <InputGroup>
                <Input
                  value={formik.values.password}
                  type={show ? "text" : "password"}
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
                    bg={"#1b3c4b"}
                    color={"white"}
                    borderRadius={"20px"}
                    bgColor={"#81B29A"}
                    fontSize={"16px"}
                    onClick={handleClick}
                  >
                    Show
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <Box
              marginTop={"10px"}
              fontSize={"14px"}
              fontWeight={"bold"}
              color={"#E07A5F"}
            >
              <Flex>
                <Link to={"/register/user"}>
                  <Box>Register</Box>
                </Link>
                <Spacer />
                <Link to={"/forgot-password"}>
                  <Box>Forgot Password</Box>
                </Link>
              </Flex>
            </Box>
            <Box marginTop={"15px"} textAlign={"right"}>
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
        <Box display={"grid"} mt={"60px"}>
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

export default LoginPage;
