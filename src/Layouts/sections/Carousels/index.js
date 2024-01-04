import React from "react";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import Carousel from "./Carousel";
import style from './Carousels.module.scss'
import slide from '~/assets/images/slide1.png'

const cx = classNames.bind(style)

const Carousels = () => {
    var settings = {
        infinite: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <Container className={cx('wrapper')}>
            <Slider {...settings}>
                <div>
                    <img src={slide} alt="slide" />
                </div>
                <div>
                    <img src={slide} alt="slide" />
                </div>
                <div>
                    <img src={slide} alt="slide" />
                </div>
            </Slider>
            <div className={cx('head')}>
                <div className={cx('left')}>New Products</div>
                <Link className={cx('right')} to="/filter">See all products</Link>
            </div>

            <Carousel />
        </Container>
    );
}

export default Carousels