import React from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";

import Product from "~/components/Product";
const Carousel = () => {
    const { items } = useSelector(state => state.products)
    var settings = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1800,
        autoplaySpeed: 2000,
        dots: true,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                }
            }
        ]
    };
    return (
        <Slider {...settings}>
            {items.map((ele, index) => (
                <Product
                    key={index}
                    primary
                    data={ele}
                />
            ))}
        </Slider>
    );
}

export default Carousel