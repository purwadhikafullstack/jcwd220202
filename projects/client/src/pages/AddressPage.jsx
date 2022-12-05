// import {
//   Box,
//   Button,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   HStack,
//   Image,
//   Input,
//   InputGroup,
//   InputRightElement,
//   Radio,
//   RadioGroup,
//   Stack,
//   Tbody,
//   Text,
//   useToast,
// } from "@chakra-ui/react"
// import { useFormik } from "formik"
// import { axiosInstance } from "../api"
// import { useState, useEffect } from "react"
// import AddressList from "../components/userAddresses"
// import axios from "axios"

// const AddressPage = () => {
//   const [address, setAddress] = useState([])

//   const fetchAddress = async () => {
//     try {
//       const response =
//         await `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=deb63d3699474864a43143c467b64441&language=en&pretty=1`

//       console.log(response.data)
//       setAddress(response.data.data)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const renderAddress = () => {
//     return address.map((val) => {
//       return <AddressList key={val.id.toString()} address={val.address} />
//     })
//   }

//   useEffect(() => {
//     fetchAddress()
//   }, [])
//   return (
//     <>
//       <Box width="430px" height="932px" bgColor="#F4F1DE">
//         <Text>Pilih alamat kamu yang mana:</Text>
//         {/* <RadioGroup onChange={setAddress} value={address}>
//           <Stack direction="column">
//             <Radio value="1">alamat 1</Radio>
//             <Radio value="2">alamat 2</Radio>
//             <Radio value="3">alamat 3</Radio> */}
//         {/* </Stack> */}
//         {renderAddress()}
//         <Button fontSize={"medium"} fontWeight={"extrabold"}>
//           + add address
//         </Button>
//         {/* </RadioGroup> */}
//       </Box>
//     </>
//   )
// }

// export default AddressPage
