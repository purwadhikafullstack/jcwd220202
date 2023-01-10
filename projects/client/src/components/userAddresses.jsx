import { Button, Td, Text, Tr } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { axiosInstance } from "../api"

const AddressList = ({}) => {
    const [address, setAddress] = useState([])

    const fetchAddress = async () => {
        try {
            const response = await axiosInstance.get("/profile/address")

            setAddress(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAddress()
    }, [])

    return (
        <>
            <Text>{address}</Text>
            <Button>klik!</Button>
        </>
    )
}

export default AddressList
