import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react"
import home from "../assets/home.png"
import profile from "../assets/profile.png"
import cart from "../assets/cart.png"
import order from "../assets/order.png"
import { Link } from "react-router-dom"

const items = [
    {
        icon: home,
        label: "Home",
        path: "/",
    },
    {
        icon: cart,
        label: "Cart",
        path: "",
    },
    {
        icon: order,
        label: "Order",
        path: "",
    },
    {
        icon: profile,
        label: "Profile",
        path: "/profile",
    },
]

const Navigation = () => {
    const renderIcon = () => {
        return items.map((item) => {
            return (
                <GridItem h="65px">
                    <Link to={item.path}>
                        <Box display={"grid"}>
                            <Image
                                src={item.icon}
                                alt="logo"
                                height={"40px"}
                                justifySelf={"center"}
                            />
                            <Text textAlign={"center"} fontFamily={"roboto"}>
                                {item.label}
                            </Text>
                        </Box>
                    </Link>
                </GridItem>
            )
        })
    }

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
            >
                <Grid templateColumns="repeat(4, 1fr)" gap={1} margin={"5px"}>
                    {renderIcon()}
                </Grid>
            </Box>
        </>
    )
}

export default Navigation
