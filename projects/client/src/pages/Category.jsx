import { Box, Heading, Text, SimpleGrid, Image } from "@chakra-ui/react";
import Navigation from "../components/NavigationBar";
import { axiosInstance } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryListBar from "../components/CategoryListBar";

const CategoryList = () => {
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await axiosInstance.get(`/category`);

      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const navigate = useNavigate();

  const redirectCategory = (id) => {
    let path = `/product/filter/category?category_id=${id}`;
    navigate(path);
  };

  return (
    <Box h={"932px"} bgColor={"#F4F1DE"} fontFamily={"roboto"}>
      <Box>
        <CategoryListBar />
      </Box>
      <Box>
        {/* <Heading p={"30px"} size="md">
          Category
        </Heading> */}
        <SimpleGrid
          px={"10px"}
          columns={"4"}
          spacing={5}
          textAlign={"center"}
          alignItems={"center"}
          pt={"110px"}
        >
          {category.map((item) => {
            return (
              <Box
                key={item.id}
                display={"grid"}
                onClick={() => {
                  redirectCategory(item.id);
                }}
              >
                <Image
                  justifySelf={"center"}
                  src={item.icon_url}
                  w={"50px"}
                  alignItems={"center"}
                />
                <Text fontSize={"sm"}>{item.category_name}</Text>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default CategoryList;
