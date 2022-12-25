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
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

const CategoryList = ({ no, category_name, onDelete, id, onOpenAlert }) => {
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  //   const params = useParams();

  let navigate = useNavigate();
  const editCategory = () => {
    let path = `/category/${id}`;
    navigate(path);
  };

  //   const confirmDeleteBtnHandler = () => {
  //     onClose();
  //     onDelete();
  //     document.body.style.overflow = "unset";
  //   };

  const openDeleteAlert = () => {
    onOpenAlert();

    console.log(onOpenAlert());
    document.body.style.overflow = "hidden";
  };

  //   const closeDeleteAlert = () => {
  //     onClose();

  //     document.body.style.overflow = "unset";
  //   };

  return (
    <>
      {/* alert for delete */}
      {/* <AlertDialog isOpen={isOpen} onClose={closeDeleteAlert}>
        <AlertDialogOverlay>
          <AlertDialogContent
            mt={"35vh"}
            fontFamily={"roboto"}
            fontSize={"16px"}
            bgColor={"#F4F1DE"}
          >
            <AlertDialogHeader
              fontSize={"16px"}
              fontWeight="bold"
              ml={"10px"}
              mt={"10px"}
            >
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody ml={"10px"}>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter display={"contents"}>
              <Button
                onClick={closeDeleteAlert}
                mx={"30px"}
                mt={"10px"}
                borderRadius={"15px"}
                bgColor={"#81B29A"}
                color={"white"}
                _hover={{
                  bgColor: "green.500",
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={confirmDeleteBtnHandler}
                mx={"30px"}
                mt={"10px"}
                mb={"40px"}
                borderRadius={"15px"}
                bgColor={"#E07A5F"}
                _hover={{
                  bgColor: "red.500",
                }}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog> */}
      {/* table body */}
      <Tr height={"80px"}>
        {/* <Td>{no}</Td> */}
        <Td fontWeight={"bold"}>{category_name || "Loading..."}</Td>
        <Td textAlign={"right"}>
          <Menu>
            <MenuButton>
              <Icon as={BsThreeDots} boxSize="20px" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={editCategory}>Edit</MenuItem>
              <MenuItem onClick={openDeleteAlert}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>
    </>
  );
};

export default CategoryList;
