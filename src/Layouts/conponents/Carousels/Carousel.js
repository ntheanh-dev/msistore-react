import React from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import ProductSkeleton from "~/components/ProductSkeleton";
import Product from "~/components/Product";
const Carousel = () => {
    const { items } = useSelector(state => state.products)

    let isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

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
                breakpoint: 1224,
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
            {items.length > 0 ? (
                items.map((ele, index) => (
                    <Product
                        key={index}
                        primary
                        data={ele}
                    />
                ))
            ) : (
                Array(isTabletOrMobile ? 4 : 6)
                    .fill()
                    .map((item, index) => {
                        return (
                            <ProductSkeleton key={index} />
                        )
                    })
            )}
        </Slider>
    );
}

export default Carousel