import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import home from "../assets/home.png";
import profile from "../assets/profile.png";
import cart from "../assets/cart.png";
import order from "../assets/order.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const authSelector = useSelector((state) => state.auth);

  const toLoginPage = () => {
    if (authSelector.id === 0) {
      return (
        <Grid templateColumns="repeat(4, 1fr)" gap={1} margin={"5px"}>
          <GridItem h="65px" onClick={() => navigate("/login/user")}>
            <Box display={"grid"} bgColor={"#F4F1DE"} borderRadius={"5px"}>
              <Image
                src={home}
                alt="logo"
                height={"40px"}
                justifySelf={"center"}
              />
              <Text textAlign={"center"} fontFamily={"roboto"} color={"black"}>
                Home
              </Text>
            </Box>
          </GridItem>
          <GridItem h="65px" onClick={() => navigate("/login/user")}>
            <Box display={"grid"}>
              <Image
                src={cart}
                alt="logo"
                height={"40px"}
                justifySelf={"center"}
              />
              <Text textAlign={"center"} fontFamily={"roboto"} color={"black"}>
                Cart
              </Text>
            </Box>
          </GridItem>
          <GridItem h="65px" onClick={() => navigate("/login/user")}>
            <Box display={"grid"}>
              <Image
                src={order}
                alt="logo"
                height={"40px"}
                justifySelf={"center"}
              />
              <Text textAlign={"center"} fontFamily={"roboto"} color={"black"}>
                Order
              </Text>
            </Box>
          </GridItem>
          <GridItem h="65px" onClick={() => navigate("/login/user")}>
            <Box display={"grid"}>
              <Image
                src={profile}
                alt="logo"
                height={"40px"}
                justifySelf={"center"}
              />
              <Text textAlign={"center"} fontFamily={"roboto"} color={"black"}>
                Profile
              </Text>
            </Box>
          </GridItem>
        </Grid>
      );
    }

    if (authSelector.id !== 0) {
      return (
        <Grid templateColumns="repeat(4, 1fr)" gap={1} margin={"5px"}>
          {location.pathname === "/" ? (
            <GridItem h="65px">
              <Link to={"/"}>
                <Box display={"grid"} bgColor={"#F4F1DE"} borderRadius={"5px"}>
                  <Image
                    src={home}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Home
                  </Text>
                </Box>
              </Link>
            </GridItem>
          ) : (
            <GridItem h="65px">
              <Link to={"/"}>
                <Box display={"grid"}>
                  <Image
                    src={home}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Home
                  </Text>
                </Box>
              </Link>
            </GridItem>
          )}
          {location.pathname === "/user/cart" ? (
            <GridItem h="65px">
              <Link to={"/user/cart"}>
                <Box display={"grid"} bgColor={"#F4F1DE"} borderRadius={"5px"}>
                  <Image
                    src={cart}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Cart
                  </Text>
                </Box>
              </Link>
            </GridItem>
          ) : (
            <GridItem h="65px">
              <Link to={"/user/cart"}>
                <Box display={"grid"}>
                  <Image
                    src={cart}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Cart
                  </Text>
                </Box>
              </Link>
            </GridItem>
          )}
          {location.pathname === "/user/transaction-list" ? (
            <GridItem h="65px">
              <Link to={"/user/transaction-list"}>
                <Box display={"grid"} bgColor={"#F4F1DE"} borderRadius={"5px"}>
                  <Image
                    src={order}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Order
                  </Text>
                </Box>
              </Link>
            </GridItem>
          ) : (
            <GridItem h="65px">
              <Link to={"/user/transaction-list"}>
                <Box display={"grid"}>
                  <Image
                    src={order}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Order
                  </Text>
                </Box>
              </Link>
            </GridItem>
          )}
          {location.pathname === "/profile" ? (
            <GridItem h="65px">
              <Link to={"/profile"}>
                <Box display={"grid"} bgColor={"#F4F1DE"} borderRadius={"5px"}>
                  <Image
                    src={profile}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Profile
                  </Text>
                </Box>
              </Link>
            </GridItem>
          ) : (
            <GridItem h="65px">
              <Link to={"/profile"}>
                <Box display={"grid"}>
                  <Image
                    src={profile}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Profile
                  </Text>
                </Box>
              </Link>
            </GridItem>
          )}
        </Grid>
      );
    }
  };

  return (
    <>
      <Box
        backgroundColor={"#E07A5F"}
        height={"75px"}
        position={"fixed"}
        bottom={"0"}
        right={"0"}
        left={"0"}
        fontWeight={"bold"}
        maxWidth={"480px"}
        margin={"auto"}
        zIndex={"3"}
      >
        {toLoginPage()}
        {/* <Grid templateColumns="repeat(4, 1fr)" gap={1} margin={"5px"}>
          {location.pathname === "/" ? (
            <GridItem h="65px">
              <Link to={"/"}>
                <Box display={"grid"} bgColor={"#F4F1DE"} borderRadius={"5px"}>
                  <Image
                    src={home}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Home
                  </Text>
                </Box>
              </Link>
            </GridItem>
          ) : (
            <GridItem h="65px">
              <Link to={"/"}>
                <Box display={"grid"}>
                  <Image
                    src={home}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Home
                  </Text>
                </Box>
              </Link>
            </GridItem>
          )}
          {location.pathname === "/user/cart" ? (
            <GridItem h="65px">
              <Link to={"/user/cart"}>
                <Box display={"grid"} bgColor={"#F4F1DE"} borderRadius={"5px"}>
                  <Image
                    src={cart}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Cart
                  </Text>
                </Box>
              </Link>
            </GridItem>
          ) : (
            <GridItem h="65px">
              <Link to={"/user/cart"}>
                <Box display={"grid"}>
                  <Image
                    src={cart}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Cart
                  </Text>
                </Box>
              </Link>
            </GridItem>
          )}
          {location.pathname === "/user/transaction-list" ? (
            <GridItem h="65px">
              <Link to={"/user/transaction-list"}>
                <Box display={"grid"} bgColor={"#F4F1DE"} borderRadius={"5px"}>
                  <Image
                    src={order}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Order
                  </Text>
                </Box>
              </Link>
            </GridItem>
          ) : (
            <GridItem h="65px">
              <Link to={"/user/transaction-list"}>
                <Box display={"grid"}>
                  <Image
                    src={order}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Order
                  </Text>
                </Box>
              </Link>
            </GridItem>
          )}
          {location.pathname === "/profile" ? (
            <GridItem h="65px">
              <Link to={"/profile"}>
                <Box display={"grid"} bgColor={"#F4F1DE"} borderRadius={"5px"}>
                  <Image
                    src={profile}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Profile
                  </Text>
                </Box>
              </Link>
            </GridItem>
          ) : (
            <GridItem h="65px">
              <Link to={"/profile"}>
                <Box display={"grid"}>
                  <Image
                    src={profile}
                    alt="logo"
                    height={"40px"}
                    justifySelf={"center"}
                  />
                  <Text
                    textAlign={"center"}
                    fontFamily={"roboto"}
                    color={"black"}
                  >
                    Profile
                  </Text>
                </Box>
              </Link>
            </GridItem>
          )}
        </Grid> */}
      </Box>
    </>
  );
};

export default Navigation;
