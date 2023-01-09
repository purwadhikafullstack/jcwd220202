import { Box, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";

const Carousel = () => {
    const images = [
        {
            src: banner2,
            alt: "Promotion 1",
        },
        {
            src: banner3,
            alt: "Promotion 2 ",
        },
        {
            src: banner4,
            alt: "Promotion 3",
        },
    ];

    const settings = {
        infinite: true,
        // dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
    };

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
            );
        });
    };

    return (
        <Box>
            <Slider {...settings}>{renderImage()}</Slider>
        </Box>
    );
};

export default Carousel;
