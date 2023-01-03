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
