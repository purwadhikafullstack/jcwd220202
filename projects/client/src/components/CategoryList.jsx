import { Image, Td, Tr } from "@chakra-ui/react";

const CategoryList = ({ id, category_name }) => {
  return (
    <>
      <Tr>
        <Td>{id}</Td>
        <Td>{category_name}</Td>
      </Tr>
    </>
  );
};

export default CategoryList;
