import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import backIcon from "../assets/back_icon.png";
import grocerinLogoWithText from "../assets/grocerin_logo.png";
import { axiosInstance } from "../api";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/NavigationBar";
import ProductBox from "../components/ProductBox";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductPage = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [keywordHandler, setKeywordHandler] = useState("");
  const [lastId, setLastId] = useState(0);
  const [limit, setLimit] = useState(5);
  const [tempId, setTempId] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get("/product", {
        params: {
          _lastId: lastId,
          _keywordHandler: keyword,
          _limit: limit,
          _order: "",
        },
      });
      const nextProduct = response.data.result;
      setProduct([...product, ...nextProduct]);
      setTempId(response.data.lastId);
      setHasMore(response.data.hasMore);

      console.log(response.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMoreProduct = () => {
    console.log("fetching prod");
    setLastId(tempId);
  };

  const renderProduct = () => {
    return product.map((product, index) => {
      return (
        <ProductBox
          key={index}
          id={product.id}
          product_name={product.product_name}
          product_price={product.product_price}
          distance={product.distance}
          product_description={product.product_description}
          product_image={product.product_image}
        />
      );
    });
  };

  const searchKey = (event) => {
    event.preventDefault();
    setLastId(0);
    setProduct([]);
    setKeyword(keywordHandler);
  };

  useEffect(() => {
    fetchProduct();
  }, [lastId, keyword]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box bgColor={"#81B29A"}>
      <Box pt={"10px"}>
        <Flex display={"flex"}>
          <form>
            <FormControl>
              <InputGroup size="md" w={"340px"}>
                <InputRightElement pointerEvents="none" size="md" />
                <Input
                  w={"340px"}
                  ml={"5"}
                  variant="outline"
                  size="md"
                  placeholder={``}
                  name="input"
                  value={keywordHandler}
                  onChange={(event) => setKeywordHandler(event.target.value)}
                />
              </InputGroup>
            </FormControl>
          </form>
          <Box
            p={"2"}
            mr={"5"}
            color="#E07A5F"
            borderRadius="10px"
            as="b"
            _hover={{
              background: "white",
              color: "#E07A5F",
              transition: "all 1000ms ease",
              cursor: "pointer",
            }}
          >
            <Button onClick={searchKey}>Search</Button>
          </Box>
        </Flex>
      </Box>
      <Box h={"100px"} mt={"10px"} bgColor={"#F4F1DE"}>
        Banner
      </Box>
      <Box h={"600px"} bgColor={"#F4F1DE"} mt={"10px"} position={"relative"}>
        <Box ml={"5"} mt={"5"} position={"absolute"}></Box>

        <Container w={"430px"} height={"400px"} bgColor="white">
          <Grid templateColumns={"repeat(3, 1fr"} mt={15}>
            <GridItem>
              {!product.length ? (
                <Alert status="warning">
                  <AlertIcon />
                  <AlertTitle>Barangnya gak ade, jangan ngadi-ngadi</AlertTitle>
                </Alert>
              ) : null}
            </GridItem>
          </Grid>
          <InfiniteScroll
            dataLength={product.length}
            next={fetchMoreProduct}
            hasMore={hasMore}
            loader={<h4>Loadinggggg...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <SimpleGrid minChildWidth="180px" spacing="10px">
              {renderProduct()}
            </SimpleGrid>
          </InfiniteScroll>
        </Container>
      </Box>
      {/* <Navigation /> */}
    </Box>
  );
};

export default ProductPage;
