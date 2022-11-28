import { Box, Flex, Image, Spacer } from "@chakra-ui/react"
import grocerinLogo from "../assets/grocerin_logo_aja.png"

const UpperBarAdmin = () => {
    return (
        <Box
            backgroundColor={"#D9D9D9"}
            height={"75px"}
            position={"fixed"}
            top={"0"}
            right={"0"}
            left={"0"}
            fontWeight={"bold"}
        >
            <Flex fontSize={"18px"} fontFamily={"roboto"}>
                <Box margin={"25px"}>TOKO GROCERIN</Box>
                <Spacer />
                <Box>
                    <Image
                        src={grocerinLogo}
                        alt="logo"
                        height={"55px"}
                        marginRight={"20px"}
                        marginTop={"7px"}
                    />
                </Box>
            </Flex>
        </Box>
    )
}

export default UpperBarAdmin
