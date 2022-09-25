import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiOutlineHeart } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";
import { memo, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";

import slide from '~/assets/images/detail-slide.png'
import img1 from '~/assets/images/laptops/lap1-1.png'
import img2 from '~/assets/images/laptops/lap1-2.png'
import img3 from '~/assets/images/laptops/lap1-3.png'
import Button from "../Button";
import Pageing from "../Pageing";
import style from './ProductDetail.module.scss'
const cx = classNames.bind(style)

function ProductDetail({
    name,
    price,
    quanti,

}) {
    const infos = [
        "Intel Core i7-10700F",
        "Intel H410",
        "WHITE",
        "NVIDIA MSI GeForce RTX 2060 SUPER 8GB AERO ITX GDDR6",
        "SO-DIMM 16GB (16GB x 1) DDR4 2666MHz",
        "2 total slots (64GB Max)",
        "512GB (1 x 512GB) M.2 NVMe PCIe GEN3x4 SSD 2TB (2.5) 5400RPM",
        "Gaming Keyboard GK30 + Gaming Mouse GM11",
        "3.5 HDD (0/0), 2.5 HDD/SSD(1/0), M.2 (1/0)",
        "Intel WGI219Vethernet (10/100/1000M)",
        "AX200 (WIFI 6)+BT5.1",
        "PSU 330W",
        "Fan Cooler"
    ]

    // Item in cart
    const [qty, setQty] = useState(quanti)
    const handleReduce = () => {
        qty > 0 && setQty(qty - 1)
    }
    const total = price * qty
    // isDetail
    const [detail, setDetail] = useState(false)

    const [img, setImg] = useState(img1)

    return (
        <Link>
            <Container>
                <Pageing pages={['Laptops']} />
                <div className={cx('head')}>
                    <div className={cx('category')}>
                        <Link
                            className={detail ? '' : cx('linkActive')}
                            onClick={() => setDetail(false)}
                        >
                            About Product
                        </Link>
                        <Link
                            className={detail ? cx('linkActive') : ''}
                            onClick={() => setDetail(true)}
                        >
                            Details
                        </Link>
                    </div>
                    <div className={cx('control')}>
                        <div className={cx('price')}>
                            <p>On Sale from</p>
                            <span>${total}</span>
                        </div>
                        <div className={cx('quanti')}>
                            <span className={cx('number')}>{qty}</span>
                            <div className={cx('wrap-icon')}>
                                <IoIosArrowUp onClick={() => setQty(qty + 1)} />
                                <IoIosArrowDown onClick={handleReduce} />
                            </div>
                        </div>
                        <Button primary to={"/yourcart"} >Add to Cart</Button>
                    </div>
                </div>
            </Container>
            <div className={cx('body')}>
                <Container>
                    <Row className={cx('sm-flex-reserve')}>
                        <Col sm={12} md={6} className={cx('left')}>
                            <h1 className={cx('name')}>MSI MPG Trident 3</h1>
                            <p className={cx('title')}>Be the first to review this product</p>
                            {
                                detail ?
                                    (<ul className={cx('core-list')}>
                                        {infos.map((info, index) => (
                                            <li>{info}</li>
                                        ))}
                                    </ul>)
                                    :
                                    <div className={cx('desc')}>
                                        MSI MPG Trident 3 10SC-005AU Intel i7 10700F, 2060 SUPER, 16GB RAM, 512GB SSD, 2TB HDD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty Gaming Desktop
                                    </div>
                            }
                            <div className={cx('types')}>
                                <div className={(img === img1) && cx('type-active')} onClick={() => setImg(img1)}></div>
                                <div className={(img === img2) && cx('type-active')} onClick={() => setImg(img2)}></div>
                                <div className={(img === img3) && cx('type-active')} onClick={() => setImg(img3)}></div>
                            </div>
                            <div className={cx('quote')}>
                                Have a Question
                                <Link to={'/contac'} className={cx('link-contact')}>Contact Us</Link>
                            </div>
                        </Col>
                        <Col sm={12} md={6} className={cx('right')}>
                            <div className={cx('img')}>
                                <img src={img} alt="alt" />
                                <div className={cx("icons")}>
                                    <HiOutlineHeart className={cx('icon')} />
                                    <BsFillBarChartFill className={cx('icon')} />
                                    <AiOutlineMail className={cx('icon')} />
                                </div>
                            </div>
                            <div className={cx('change-img')}>
                                <div className={img === img1 && cx('change-img-active')} onClick={() => setImg(img1)}></div>
                                <div className={img === img2 && cx('change-img-active')} onClick={() => setImg(img2)}></div>
                                <div className={img === img3 && cx('change-img-active')} onClick={() => setImg(img3)}></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={cx('slider')}>
                <Container>
                    <Row className={cx('slider-content')}>
                        <Col sm={12} md={6}>
                            <div className={cx('slider-desc')}>
                                <div className={cx('slider-heading')}>
                                    Outplay the Competittion
                                </div>
                                <div className={cx('slider-title')}>
                                    Experience a 40% boost in computing from last generation. MSI Desktop equips the 10th Gen. Intel® Core™ i7 processor with the upmost computing power to bring you an unparalleled gaming experience.

                                    *Performance compared to i7-9700. Specs varies by model.
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} md={6}>
                            <div className={cx('slider-img')}>
                                <img src={slide} alt="alt" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Link>
    );
}


export default memo(ProductDetail);