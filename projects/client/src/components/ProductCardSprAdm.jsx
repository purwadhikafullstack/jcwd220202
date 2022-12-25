import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../api";

const ProductCardSprAdm = ({
  product_name,
  product_price,
  product_description,
  product_image,
  CategoryId,
  ProductId,
  is_Deleted,
  fetchProducts,
}) => {
  const truncate = (string, length) => {
    if (string.length > length) return string.substring(0, length) + "...";
    else return string;
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const toast = useToast();

  const showDeletedProduct = () => {
    if (is_Deleted === false) {
      return (
        <Box flex="1.2" mr={"5px"}>
          <Link to={`/super-admin/product/${ProductId}`}>
            <Button
              borderRadius={"10px"}
              my={"70px"}
              marginRight={"5px"}
              bgColor={"#81B29A"}
              _hover={{
                bgColor: "#81B29A",
                color: "white",
              }}
            >
              Details
            </Button>
          </Link>
        </Box>
      );
    }

    if (is_Deleted === true) {
      const restoreBtnHandler = async () => {
        try {
          await axiosInstance.get(
            `/admin-product/super-admin/restore/${ProductId}`
          );

          fetchProducts();

          toast({
            title: "Product Restored",
            status: "success",
            position: "top",
          });
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <Box flex="1.2" my={"55px"} mr={"5px"}>
          <Stack>
            <Badge colorScheme="red" textAlign={"center"} mr={"5px"} mt={"5px"}>
              Deleted
            </Badge>
          </Stack>
          <Button
            borderRadius={"10px"}
            marginRight={"5px"}
            bgColor={"#81B29A"}
            _hover={{
              bgColor: "#81B29A",
              color: "white",
            }}
            mt={"10px"}
            onClick={restoreBtnHandler}
          >
            Restore
          </Button>
        </Box>
      );
    }
  };

  const lengthDesc = 40;

  return (
    <>
      <Box marginTop={"20px"} mx={"20px"}>
        <Flex
          maxHeight={"185px"}
          fontFamily={"roboto"}
          color={"black"}
          border={"2px solid #E07A5F"}
          borderRadius={"15px"}
          boxShadow={"1px 1px 4px #E07A5F"}
        >
          <Box flex="1.6">
            <Image
              src={
                product_image ||
                "https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
              }
              alt="pic"
              objectFit={"cover"}
              height={"100%"}
              width={"100%"}
              px={"10px"}
              py={"30px"}
            />
          </Box>
          <Box flex="2">
            <Box marginY={"25px"} p={"5px"}>
              <Text
                fontWeight={"bold"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                maxWidth={"120px"}
              >
                {product_name || "Batagor ori asli 100%"}
              </Text>
              <Text
                fontWeight={"bold"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                maxWidth={"120px"}
              >
                {formatRupiah(product_price) || "Rp. 1.000.000"}
              </Text>
              <Text
                fontWeight={"bold"}
                color={"#E07A5F"}
                fontSize={"15px"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                maxWidth={"120px"}
              >
                {CategoryId || "snacks"}
              </Text>
              <Text
                fontSize={"13px"}
                color={"black"}
                overflow={"hidden"}
                textOverflow={"----"}
              >
                {truncate(product_description, lengthDesc) ||
                  truncate(
                    "Batagor merupakan lorem ipsum handnakdnknkaedaskaksnkanksnakskans",
                    lengthDesc
                  )}
              </Text>
            </Box>
          </Box>
          {showDeletedProduct()}
        </Flex>
      </Box>
    </>
  );
};

export default ProductCardSprAdm;
