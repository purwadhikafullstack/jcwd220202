import {
    Box,
    Button,
    Flex,
    HStack,
    Image,
    Input,
    Select,
    Spacer,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { axiosInstance } from "../api"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { logout } from "../redux/features/authSlice"
import Navigation from "../components/NavigationBar"

const ProfilePage = () => {
    const [userData, setUserData] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toast = useToast()
    const [updateProfile, setUpdateProfile] = useState(false)
    const [picture, setPicture] = useState()

    const fetchProfile = async () => {
        try {
            const response = await axiosInstance.get(`/profile`)

            console.log(response)
            setUserData(response.data.data)

            formik.setFieldValue("username", response.data.data.username)
            formik.setFieldValue("gender", response.data.data.gender)
            formik.setFieldValue("birth", response.data.data.birth)

            setPicture(response.data.data.profile_image_url)
        } catch (err) {
            console.log(err)
        }
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            gender: "",
            birth: "",
            profile_picture: "",
        },
        onSubmit: async (values) => {
            try {
                const userData = new FormData()

                userData.append("username", values.username)
                userData.append("gender", values.gender)
                userData.append("birth", values.birth)
                userData.append("profile_picture", values.profile_picture)

                await axiosInstance.patch(`/profile`, userData)

                setUpdateProfile(false)
                fetchProfile()
            } catch (err) {
                console.log(err)
            }
        },
    })

    const formChangeHandler = ({ target }) => {
        const { name, value } = target
        formik.setFieldValue(name, value)
    }

    const logoutBtnHandler = () => {
        localStorage.removeItem("auth_token")
        dispatch(logout())
        navigate("/login/user")
        toast({
            status: "info",
            title: "User logout",
        })
    }

    useEffect(() => {
        fetchProfile()
    }, [])
    return (
        <Box height="932px" bgColor="#F4F1DE">
            <Box ml={5}>
                <Text fontSize={"lg"}>Hello, {userData.username}</Text>
                <Box width="80px" height="100px">
                    <Image
                        src={
                            picture ||
                            "https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484__480.png"
                        }
                        w={"100%"}
                        h={"100%"}
                    />
                </Box>
                <Button
                    w="50px"
                    h="30px"
                    bgColor="#81B29A"
                    onClick={() => setUpdateProfile(true)}
                >
                    Edit
                </Button>
            </Box>
            {!updateProfile ? (
                // display
                <Stack spacing={3} margin="10">
                    <Text fontWeight={"bold"}>
                        Username: {userData.username}
                    </Text>
                    <Text fontWeight={"bold"}>Gender: {userData.gender}</Text>
                    <Text fontWeight={"bold"}>
                        Date of Birth: {userData.birth}
                    </Text>
                </Stack>
            ) : (
                // Edit mode
                <Stack spacing={3} margin="10">
                    <Text fontWeight={"bold"}>Username:</Text>
                    <Input
                        value={formik.values.username}
                        name="username"
                        onChange={formChangeHandler}
                        placeholder={userData.username}
                        size="md"
                        bgColor={"white"}
                    />
                    <Text fontWeight={"bold"}>Gender:</Text>
                    <Input
                        value={formik.values.gender}
                        name="gender"
                        onChange={formChangeHandler}
                        placeholder={userData.gender}
                        size="md"
                        bgColor={"white"}
                    />
                    <Text fontWeight={"bold"}>Date of Birth:</Text>
                    <Input
                        value={formik.values.birth}
                        name="birth"
                        onChange={formChangeHandler}
                        placeholder={userData.birth}
                        size="md"
                        bgColor={"white"}
                    />
                    <Text fontWeight={"bold"}>Profile Picture:</Text>
                    <Input
                        accept="image/*"
                        type="file"
                        onChange={(event) =>
                            formik.setFieldValue(
                                "profile_picture",
                                event.target.files[0]
                            )
                        }
                        name="profile_picture"
                    />
                    <Box marginTop={"20px"} textAlign={"center"}>
                        <Button
                            mt={"15px"}
                            color={"white"}
                            type="logout"
                            fontWeight={"bold"}
                            borderRadius={"20px"}
                            bgColor="#81B29A"
                            width={"100px"}
                            height={"35px"}
                            onClick={formik.handleSubmit}
                        >
                            Save
                        </Button>
                    </Box>
                </Stack>
            )}

            <Stack spacing={3} margin="10">
                <Text fontWeight={"bold"}>Address:</Text>
                <Select
                    placeholder="Jalan apa hayooo"
                    size="md"
                    bgColor={"white"}
                >
                    <option value="option1">Jalan aja</option>
                    <option value="option2">Jalan yuk</option>
                    <option value="option3">Jalan deh yaaaa</option>
                    <option value="option3">+ </option>
                    <Text>halo</Text>
                </Select>

                <Text fontWeight={"bold"}>Email:</Text>
                <HStack>
                    <Text fontSize={"16"}>{userData.email}</Text>
                    <Spacer />
                    <Link to="/address">
                        <Text fontStyle={"italic"}>Change email</Text>
                    </Link>
                </HStack>
                <Text fontWeight={"bold"}>Password:</Text>
                <Flex>
                    <Text fontWeight={"extrabold"}>**********</Text>
                    <Spacer />
                    <Text fontStyle={"italic"}>Change password</Text>
                </Flex>
                <Text fontWeight={"bold"}>Referral Code:</Text>
                <Text fontWeight={"bold"}>H4J12030</Text>
            </Stack>

            <Box marginTop={"20px"} textAlign={"center"}>
                <Button
                    mt={"15px"}
                    color={"white"}
                    type="logout"
                    fontWeight={"bold"}
                    borderRadius={"20px"}
                    bgColor={"#F84040"}
                    width={"100px"}
                    height={"35px"}
                    onClick={logoutBtnHandler}
                >
                    Logout
                </Button>
            </Box>
            <Navigation />
        </Box>
    )
}

export default ProfilePage
