import React from "react";
import Slider from "react-slick";

import Product from "~/components/Product";
import img from '~/assets/images/laptops/lap1-1.png'

const Carousel = () => {
    var settings = {
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        dots: true,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 768,
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
            <Product
                name={"This is name product"}
                img={img}
                oldPrice={500}
                newPrice={499}
                review={3}
                condition={"check for availble"}
            />
            <Product
                name={"This is name product"}
                img={img}
                oldPrice={500}
                newPrice={499}
                review={3}
                condition={"check for availble"}
            />
            <Product
                name={"This is name product"}
                img={img}
                oldPrice={500}
                newPrice={499}
                review={3}
                condition={"check for availble"}
            />
            <Product
                name={"This is name product"}
                img={img}
                oldPrice={500}
                newPrice={499}
                review={3}
                condition={"check for availble"}
            />
            <Product
                name={"This is name product"}
                img={img}
                oldPrice={500}
                newPrice={499}
                review={3}
                condition={"check for availble"}
            />
            <Product
                name={"This is name product"}
                img={img}
                oldPrice={500}
                newPrice={499}
                review={3}
                condition={"check for availble"}
            />
            <Product
                name={"This is name product"}
                img={img}
                oldPrice={500}
                newPrice={499}
                review={3}
                condition={"check for availble"}
            />
        </Slider>
    );
}

export default Carousel