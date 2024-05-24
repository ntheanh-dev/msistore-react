import React from 'react';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';

import ProductSkeleton from '~/components/ProductSkeleton';
import Product from '~/components/Product';
import { useState, useEffect } from 'react';
import API, { endpoints, endpointsV2 } from '~/configs/API';
const Carousel = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [categoryId, setCategoryId] = useState(0);
    const [fromPrice, setFromPrice] = useState(0);
    const [toPrice, setToPrice] = useState(0);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await API.get(endpointsV2['get-products'], {
                    params: {
                        page: page,
                        pageSize: pageSize,
                    },
                });
                setProducts(res.data.results);
            } catch (e) {
                console.log(e);
            }
        };
        fetchApi();
    }, []);

    let isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });

    var settings = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1800,
        autoplaySpeed: 2000,
        dots: true,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1224,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                },
            },
        ],
    };
    return (
        <Slider {...settings}>
            {products.length > 0
                ? products.map((ele, index) => <Product key={index} primary data={ele} />)
                : Array(isTabletOrMobile ? 4 : 6)
                      .fill()
                      .map((item, index) => {
                          return <ProductSkeleton key={index} />;
                      })}
        </Slider>
    );
};

export default Carousel;
