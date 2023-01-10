import {
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Tr,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const CategoryList = ({ category_name, id, onOpenAlert }) => {
  let navigate = useNavigate();
  const editCategory = () => {
    let path = `/category/${id}`;
    navigate(path);
  };

  const openDeleteAlert = () => {
    onOpenAlert();

    console.log(onOpenAlert());
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <Tr height={"80px"}>
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
