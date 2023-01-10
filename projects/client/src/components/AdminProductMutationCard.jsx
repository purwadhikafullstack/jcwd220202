import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import moment from "moment";

const AdminProductMutationCard = ({
  branch_name,
  TransactionItemId,
  product_name,
  createdAt,
  remarks,
  stock_movement,
  initial_stock,
  current_stock,
  ProductId,
}) => {
  const showTransItemId = () => {
    if (TransactionItemId === null) {
      return <Text ml={"5px"}>{"-" || "Loading"}</Text>;
    }

    if (TransactionItemId !== null) {
      return <Text ml={"5px"}>{TransactionItemId || "Loading"}</Text>;
    }
  };

  const showStockMovement = () => {
    if (initial_stock < current_stock) {
      return (
        <Text ml={"5px"} color={"green"}>
          {`+${stock_movement}` || 0}
        </Text>
      );
    }

    if (initial_stock > current_stock) {
      return (
        <Text ml={"5px"} color={"red"}>
          {stock_movement || 0}
        </Text>
      );
    }

    if (stock_movement === 0) {
      return (
        <Text ml={"5px"} color={"black"}>
          {`0` || 0}
        </Text>
      );
    }
  };

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
          height={"185px"}
          columnGap={"2"}
        >
          <Box flex="1" ml={"20px"} mt={"40px"}>
            <Box
              fontWeight={"bold"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              maxWidth={"180px"}
            >
              {branch_name || "branch name"}
            </Box>
            <Box
              fontWeight={"bold"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              maxWidth={"130px"}
            >
              {product_name || "xxxx"}
            </Box>
            <Box fontSize={"15px"} display={"flex"}>
              <Text>Product ID:</Text>
              <Text ml={"5px"}>{ProductId || "Loading..."}</Text>
            </Box>
            <Box fontSize={"15px"} display={"flex"}>
              <Text>Transc. Item ID:</Text>
              {showTransItemId()}
            </Box>
            <Box>
              {moment(createdAt).utcOffset("+07:00").format("YYYY-MM-DD") ||
                "Loading..."}
            </Box>
          </Box>
          <Box flex="1" mt={"40px"} mr={"10px"}>
            <Box>
              {remarks === "Warehouse Activity" ? (
                <Badge colorScheme="red">{remarks || "Loading..."}</Badge>
              ) : (
                <Badge colorScheme="green">{remarks || "Loading..."}</Badge>
              )}
            </Box>
            <Box fontWeight={"bold"}>{showStockMovement()}</Box>
            <Box fontWeight={"bold"} display={"flex"}>
              <Text>Initial Stock:</Text>
              <Text ml={"5px"} color={"red"}>
                {initial_stock || 0}
              </Text>
            </Box>
            <Box fontWeight={"bold"} display={"flex"}>
              <Text>Current Stock:</Text>
              <Text ml={"5px"} color={"green"}>
                {current_stock || 0}
              </Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AdminProductMutationCard;
