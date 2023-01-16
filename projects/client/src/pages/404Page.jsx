import { Button, Text, Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import notFound from "../assets/404Error.png";

const NotFound = () => {
  return (
    <Box py={"50%"} height={"932px"} border={"2px solid lightgrey"}>
      <Box display={"flex"} justifyContent={"center"}>
        <Image src={notFound} alt={"404"} w={"300px"} />
      </Box>
      <Box textAlign="center">
        <Text fontSize="20px" mt="3" mb="2" fontWeight="bold">
          Page Not Found
        </Text>
        <Text color="gray" mb="6">
          We can't seem to find the page you're looking for.
        </Text>
        <Link to="/">
          <Button bgColor={"#E07A5F"} color="white">
            Go to Home Page
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default NotFound;
