import { Box, Image } from "@chakra-ui/react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import React from "react"
import banner1 from "../assets/banner1.png"

const Carousel = () => {
    const images = [
        {
            src: banner1,
            alt: "Promotion 1",
        },
        {
            src: "https://cdn.pixabay.com/photo/2021/12/26/19/27/nature-6895756_1280.jpg",
            alt: "Promotion 2 ",
        },
        {
            src: "https://cdn.pixabay.com/photo/2022/11/29/15/18/sunset-7624720_1280.jpg",
            alt: "Promotion 3",
        },
    ]

    const settings = {
        infinite: true,
        // dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
    }

    const renderImage = () => {
        return images.map((item) => {
            return (
                <Box h={"200px"}>
                    <Image
                        src={item.src}
                        alt={item.alt}
                        w={"100%"}
                        h={"100%"}
                    />
                </Box>
            )
        })
    }

    return (
        <Box>
            <Slider {...settings}>{renderImage()}</Slider>
        </Box>
    )
}

export default Carousel
