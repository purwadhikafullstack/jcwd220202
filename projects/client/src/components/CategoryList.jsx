import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Td,
    Tr,
    useDisclosure,
} from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import { useNavigate, useParams } from "react-router-dom"

const CategoryList = ({ no, category_name, onDelete, id }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const params = useParams()

    let navigate = useNavigate()
    const editCategory = () => {
        let path = `/category/${id}`
        navigate(path)
    }

    const confirmDeleteBtnHandler = () => {
        onClose()
        onDelete()
    }

    return (
        <>
            <Tr>
                <Td>{no}</Td>
                <Td>{category_name}</Td>
                <Td>
                    <Menu>
                        <MenuButton>
                            <Icon as={BsThreeDots} boxSize="20px" />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={editCategory}>Edit</MenuItem>
                            <MenuItem onClick={onOpen}>Delete</MenuItem>
                        </MenuList>
                    </Menu>
                </Td>
            </Tr>
            <AlertDialog isCentered isOpen={isOpen} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent w={"400px"}>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Post
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button
                                colorScheme="red"
                                onClick={confirmDeleteBtnHandler}
                                ml={3}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default CategoryList
