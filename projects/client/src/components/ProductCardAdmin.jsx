import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProductCardAdmin = ({
  product_image,
  product_price,
  product_name,
  CategoryId,
  stock,
  discount_amount_nominal,
  discount_amount_percentage,
  ProductId,
}) => {
  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const showPrice = () => {
    if (discount_amount_nominal === 0 && discount_amount_percentage === 0) {
      return (
        <Text
          fontWeight={"bold"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          width={"110px"}
        >
          {formatRupiah(product_price) || "Rp. 1.000.000"}
        </Text>
      );
    }

    if (discount_amount_nominal === 0) {
      const countDiscount =
        product_price - (product_price * discount_amount_percentage) / 100;

      return (
        <>
          <Text
            fontWeight={"bold"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            width={"110px"}
            textDecoration={"line-through"}
          >
            {formatRupiah(product_price) || "Rp. 1.000.000"}
          </Text>
          <Text
            fontWeight={"bold"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            width={"110px"}
          >
            {formatRupiah(countDiscount) || "Rp. 1.000.000"}
          </Text>
        </>
      );
    }

    if (discount_amount_percentage === 0) {
      const countDiscount = product_price - discount_amount_nominal;

      return (
        <>
          <Text
            fontWeight={"bold"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            width={"110px"}
            textDecoration={"line-through"}
          >
            {formatRupiah(product_price) || "Rp. 1.000.000"}
          </Text>
          <Text
            fontWeight={"bold"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            width={"110px"}
          >
            {formatRupiah(countDiscount) < 0
              ? 0
              : formatRupiah(countDiscount) || "Rp. 1.000.000"}
          </Text>
        </>
      );
    }
  };

  const showDiscount = () => {
    if (discount_amount_nominal === 0 && discount_amount_percentage === 0) {
      return (
        <Text
          fontSize={"14px"}
          color={"#E07A5F"}
          fontWeight={"bold"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          width={"110px"}
        >
          Disc: {"-"}
        </Text>
      );
    } else if (discount_amount_nominal === 0) {
      return (
        <Text
          fontSize={"14px"}
          color={"#E07A5F"}
          fontWeight={"bold"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          width={"110px"}
        >
          Disc: {`${discount_amount_percentage} %`}
        </Text>
      );
    } else if (discount_amount_percentage === 0) {
      return (
        <Text
          fontSize={"14px"}
          color={"#E07A5F"}
          fontWeight={"bold"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          width={"110px"}
        >
          Disc: {formatRupiah(discount_amount_nominal)}
        </Text>
      );
    }
  };

  const showStock = () => {
    if (stock === 0) {
      return (
        <Text
          fontSize={"14px"}
          color={"#E07A5F"}
          fontWeight={"bold"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          width={"110px"}
        >
          Stock: {0}
        </Text>
      );
    } else {
      return (
        <Text
          fontSize={"14px"}
          color={"#E07A5F"}
          fontWeight={"bold"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          width={"110px"}
        >
          Stock: {stock}
        </Text>
      );
    }
  };

  return (
    <>
      <Box marginTop={"20px"} mx={"20px"}>
        <Flex
          fontFamily={"roboto"}
          maxHeight={"185px"}
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
            <Box marginY={"20px"} p={"5px"}>
              <Text
                fontWeight={"bold"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                maxWidth={"130px"}
              >
                {product_name || "Batagor ori asli 100%"}
              </Text>
              {showPrice()}
              <Text
                fontWeight={"bold"}
                color={"#E07A5F"}
                fontSize={"15px"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                maxWidth={"130px"}
              >
                {CategoryId || "Snacks"}
              </Text>
              {showStock()}
              {showDiscount()}
            </Box>
          </Box>
          <Box flex="1.2">
            <Link to={`/admin/product/${ProductId}`}>
              <Button
                borderRadius={"10px"}
                my={"70px"}
                marginRight={"10px"}
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
        </Flex>
      </Box>
    </>
  );
};

export default ProductCardAdmin;
