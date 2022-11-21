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
  } from "@chakra-ui/react"
  import { useFormik } from "formik"
  import { axiosInstance } from "axios"
import { Link } from "react-router-dom"
  
  const HomePage = () => {
    return (
        <Box>
            <Link to="/profile" >
            go to profile
            </Link>
        </Box>
    )
  }
  
  export default HomePage
  