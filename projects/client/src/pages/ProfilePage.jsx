import {
  Box,
  Button,
  Flex,
  HStack,
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
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { logout } from "../redux/features/authSlice"

const ProfilePage = () => {
  const authSelector = useSelector((state) => state.auth)
  const [userData, setUserData] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const params = useParams()
  const [updateProfile, setUpdateProfile] = useState(false)

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get(`/profile`)

      console.log(response)
      setUserData(response.data.data)

      formik.setFieldValue("username", response.data.data.username)
      formik.setFieldValue("gender", response.data.data.gender)
      formik.setFieldValue("birth", response.data.data.birth)
    } catch (err) {
      console.log(err)
    }
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      gender: "",
      birth: "",
    },
    onSubmit: async (values) => {
      try {
        let updateUser = {
          username: values.username,
          gender: values.gender,
          birth: values.birth,
        }
        await axiosInstance.patch(`/profile`, updateUser)

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
    <Box width="430px" height="932px" bgColor="#F4F1DE">
      <Text>hellop</Text>
      <Box width="50px" height="80px" bg="red"></Box>

      <Button
        w="50px"
        h="30px"
        bgColor="#81B29A"
        onClick={() => setUpdateProfile(true)}
      >
        Edit
      </Button>
      {!updateProfile ? (
        // display
        <Stack spacing={3} margin="10">
          <Text fontWeight={"bold"}>Username: {userData.username}</Text>
          <Text fontWeight={"bold"}>Gender: {userData.gender}</Text>
          <Text fontWeight={"bold"}>Date of Birth: {userData.birth}</Text>
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
        <Select placeholder="Jalan apa hayooo" size="md" bgColor={"white"}>
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
    </Box>
  )
}

export default ProfilePage
