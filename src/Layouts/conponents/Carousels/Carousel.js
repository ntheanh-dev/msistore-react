import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import Product from "~/components/Product";
const Carousel = () => {

    const [data, setData] = useState(null)

    useEffect(() => {
        const fetAPI = async () => {
            const responceJSON = await fetch('https://msi-data.herokuapp.com/api/data')
            const responce = await responceJSON.json()
            setData(responce)
        }

        fetAPI()
    }, [])

    var settings = {
        infinite: true,
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
        <div>
            {data && (
                <Slider {...settings}>
                    {data.map((ele, index) => (
                        <Product
                            key={index}
                            primary
                            data={ele}
                        />
                    ))}
                </Slider>
            )}
        </div>
    );
}

export default Carousel