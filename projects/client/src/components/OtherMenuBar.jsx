import {
    Box,
    Button,
    HStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react"
import analytics from "../assets/analytics.png"
import voucher from "../assets/voucher.png"
import logout from "../assets/logout.png"

const OtherMenuBar = ({ isOpen, closeModal }) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={closeModal}>
                {/* ini yang disamadenganin adalah props yang akan dipassing */}
                <ModalOverlay />
                <ModalContent
                    position={"fixed"}
                    height={"60%"}
                    bottom={"-20"}
                    marginLeft={"60%"}
                    fontFamily={"roboto"}
                    fontSize={"16px"}
                    fontWeight={"bold"}
                    border={"5px solid"}
                    borderRadius={"15px"}
                    borderColor={"white"}
                    backgroundColor={"#E07A5F"}
                >
                    <ModalHeader fontSize={"2xl"}>Other</ModalHeader>
                    <ModalBody>
                        <Stack direction={"column"} spacing={3} fontSize={"xl"}>
                            <HStack>
                                <Image src={analytics} />
                                <Text>Statistic</Text>
                            </HStack>
                            <HStack>
                                <Image src={voucher} />
                                <Text>Voucher</Text>
                            </HStack>
                            <HStack>
                                <Image src={logout} />
                                <Text>Logout</Text>
                            </HStack>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default OtherMenuBar
