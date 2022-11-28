import { Box, Heading, Text, SimpleGrid, Image } from "@chakra-ui/react";
import { categories } from "../components/category";
import Navigation from "../components/NavigationBar";

const CategoryList = () => {
  return (
    <Box h={"932px"} bgColor={"#F4F1DE"}>
      <Box>
        <Heading p={"30px"} size="md">
          Category
        </Heading>
        <SimpleGrid
          columns={"4"}
          spacing={5}
          textAlign={"center"}
          alignItems={"center"}
        >
          {categories.map((item) => {
            return (
              <Box display={"grid"}>
                <Image
                  justifySelf={"center"}
                  src={item.icon}
                  w={"50px"}
                  alignItems={"center"}
                />
                <Text fontSize={"xs"}>{item.name}</Text>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
      <Navigation />
    </Box>
  );
};

export default CategoryList;
