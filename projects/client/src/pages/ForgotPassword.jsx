import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Image,
    Input,
    useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"

import backIcon from "../assets/back_icon.png"
import grocerinLogoWithText from "../assets/grocerin_logo.png"
import shoppingPic from "../assets/frozen_food_shopping.png"
import { axiosInstance } from "../api"

const ForgotPassword = () => {
    const navigate = useNavigate()

    const toast = useToast()

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: async ({ email }) => {
            try {
                const response = await axiosInstance.post("/password/forgot", {
                    email: email,
                })

                toast({
                    title: "e-mail has been sent",
                    description: response.data.message,
                    status: "success",
                })
            } catch (error) {
                console.log(error.response)
                toast({
                    title: "Sending email failed",
                    description: error.response.data.message,
                    status: "error",
                })
            }
        },
        validationSchema: Yup.object({
            email: Yup.string().required().email(),
        }),
        validateOnChange: false,
    })

    const formChangeHandler = ({ target }) => {
        const { name, value } = target
        formik.setFieldValue(name, value)
    }

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
                        <FormControl
                            mt={"10px"}
                            isInvalid={formik.errors.email}
                        >
                            <FormLabel
                                fontWeight={"bold"}
                                textAlign={"center"}
                                fontFamily={"roboto"}
                                fontSize={"20px"}
                            >
                                FORGOT PASSWORD
                            </FormLabel>
                            <FormLabel
                                fontWeight={"bold"}
                                textAlign={"center"}
                                fontFamily={"roboto"}
                                fontSize={"16px"}
                            >
                                Please Enter Your Email
                            </FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter your email"
                                _placeholder={{ color: "black.500" }}
                                value={formik.values.email}
                                name="email"
                                borderRadius={"15px"}
                                bgColor={"#D9D9D9"}
                                onChange={formChangeHandler}
                                marginTop={"10px"}
                            />
                            <FormErrorMessage>
                                {formik.errors.email}
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
                <Box display={"grid"} my={"70px"}>
                    <Image
                        src={shoppingPic}
                        alt="logo"
                        height={"200px"}
                        justifySelf={"center"}
                    />
                </Box>
            </Box>
        </>
    )
}

export default ForgotPassword
