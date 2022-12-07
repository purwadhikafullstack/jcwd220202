import {
    Box,
    Stack,
    FormControl,
    Input,
    Button,
    useToast,
    Text,
    FormErrorMessage,
} from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { axiosInstance } from "../api"
import { useFormik } from "formik"
import * as Yup from "yup"
import UpperBarSprAdm from "../components/UpperBarSprAdm"
import SuperAdminNavbar from "../components/SuperAdminNavbar"

const CategoryEdit = () => {
    const [category, setCategory] = useState({})
    const params = useParams()
    const inputFileRef = useRef(null)

    const fetchCategory = async () => {
        try {
            const response = await axiosInstance.get(`/category/${params.id}`)

            setCategory(response.data)

            formik.setFieldValue("category_name", response.data.category_name)
            formik.setFieldValue("icon_url", response.data.icon_url)
        } catch (err) {
            console.log(err)
        }
    }

    const toast = useToast()

    const formik = useFormik({
        initialValues: {
            category_name: "",
            icon_url: "",
        },
        onSubmit: async (values) => {
            try {
                const categoryData = new FormData()

                categoryData.append("category_name", values.category_name)
                categoryData.append("icon_url", values.icon_url)

                const response = await axiosInstance.patch(
                    `/category/${params.id}`,
                    categoryData
                )

                console.log(response.data)

                fetchCategory()
                toast({ title: "Category Edited", status: "success" })
            } catch (err) {
                toast({ title: "Network Error", status: "error" })
                console.log(err)
            }
        },
        validationSchema: Yup.object({
            category_name: Yup.string().required().min(5).max(20),
        }),
        validateOnChange: false,
    })

    const formChangeHandler = ({ target }) => {
        const { name, value } = target

        formik.setFieldValue(name, value)
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <Box bgColor={"#81B29A"} h={"932px"}>
            <UpperBarSprAdm />
            <Stack spacing={3} p={10} pt={"100px"}>
                <FormControl isInvalid={formik.errors.category_name}>
                    <Text fontSize={"md"} as={"b"}>
                        Category Name:
                    </Text>
                    <Input
                        value={formik.values.category_name}
                        name="category_name"
                        onChange={formChangeHandler}
                        size="md"
                        bgColor={"white"}
                    />
                    <FormErrorMessage>
                        {formik.errors.category_name}
                    </FormErrorMessage>
                </FormControl>
                <Input
                    ref={inputFileRef}
                    display="none"
                    name="icon_url"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        formik.setFieldValue("icon_url", event.target.files[0])
                    }}
                />
                <Button
                    onClick={() => {
                        inputFileRef.current.click()
                    }}
                    width="100%"
                >
                    {formik?.values?.icon_url?.name || "Upload Icon"}
                </Button>
                <Box pt={"5"} textAlign={"right"}>
                    <Button
                        onClick={formik.handleSubmit}
                        isDisabled={formik.isSubmitting}
                    >
                        Edit Category
                    </Button>
                </Box>
            </Stack>
            <SuperAdminNavbar />
        </Box>
    )
}

export default CategoryEdit
