import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { BsFillStarFill, BsFillCheckCircleFill, BsFillTelephoneXFill, BsFillBarChartFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TiDeleteOutline, TiPencil } from "react-icons/ti";
import { HiOutlineHeart } from "react-icons/hi";
import { memo } from "react";
import { Row, Col } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive'

import style from './Product.module.scss'
import Button from "../Button";
const cx = classNames.bind(style)

function Product({
    data,

    primary,
    isHorver,
    isInCart

}) {
    // isPrimary
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < data.review) {
            stars.push('star-color')
        } else {
            stars.push('star-no-color')
        }
    }

    // Item in cart
    const total = data.newPrice * 1
    let isMobile = useMediaQuery({ query: '(max-width: 426px)' })


    return (
        <Link to="/product">
            {primary &&
                (<div className={cx("product")}>
                    {
                        data.condition.includes("in stock")
                            ? <div>
                                <BsFillCheckCircleFill className={cx('stock-icon')} />
                                <div className={cx('tilte')}>{data.condition}</div>
                            </div>
                            : <div>
                                <BsFillTelephoneXFill className={cx('phone-icon')} />
                                <div className={cx('tilte')}>{data.condition}</div>
                            </div>
                    }
                    <div className={cx("img")}>
                        <img src={data.images[0]} alt="" />
                    </div>
                    <div className={cx("reviews")}>
                        <div className={cx("stars")}>
                            {
                                stars.map((star, index) => (
                                    <BsFillStarFill key={index} className={cx(star, "icon")} />
                                ))
                            }
                        </div>
                        <div className={cx("review-quanti")}>
                            Reviews ({data.review})
                        </div>
                    </div>
                    <div className={cx("name")}>
                        {data.title}data.
                    </div>
                    <div className={cx("prices")}>
                        <div className={cx("old")}>${data.oldPrice}</div>
                        <div className={cx("new")}>${data.newPrice}</div>
                    </div>
                    <div className={cx('layout-hover')}>
                        <div className={cx('actions')}>
                            <HiOutlineHeart className={cx('icon-isHover')} />
                            <BsFillBarChartFill className={cx('icon-isHover')} />
                        </div>
                        <Button primary>Add to cart</Button>
                    </div>
                </div>)
            }

            {isHorver &&
                (<Link className={cx('wrapper-isHover')}>
                    <div className={cx('quanti-isHover')}>{1}<span>x</span></div>
                    <div className={cx('img-isHover')}>
                        <img src={data.images[0]} alt="img" />
                    </div>
                    <div className={cx('name-isHover')}>{data.title}</div>
                    <div className={cx('actions')}>
                        <TiDeleteOutline className={cx('icon-isHover')} />
                        <TiPencil className={cx('icon-isHover')} />
                    </div>
                </Link>)
            }

            {isInCart &&
                (<Row className={cx('wrapper-isInCart')}>
                    <Col md={2} className={cx('img-isInCart')}>
                        <img src={data.images[0]} alt="alt" />
                    </Col>

                    <Col md={4} className={cx('name-isInCart')}>
                        <span>{data.title}</span>
                    </Col>

                    <Col md={2} className={cx('price-isInCart')}>
                        {isMobile && <div className={cx('priceInMobile')}>Price</div>}
                        ${data.newPrice}
                    </Col>

                    <Col md={1} className={cx('quanti-isInCart')}>
                        <span className={cx('number')}>{1}</span>
                        <div className={cx('wrap-icon')}>
                            <IoIosArrowUp />
                            <IoIosArrowDown />
                        </div>
                    </Col>

                    <Col md={2} className={cx('total-isInCart')}>
                        {isMobile && <div className={cx('totalInMobile')}>Subtotal</div>}
                        <div>${total}</div>
                    </Col>

                    <Col md={1} className={cx('control-isInCart')}>
                        <TiDeleteOutline />
                        <TiPencil />
                    </Col>

                </Row>)
            }
        </Link>
    );
}

Product.propTypes = {
    data: PropTypes.object.isRequired,
    primary: PropTypes.bool,
    isHorver: PropTypes.bool,
    isInCart: PropTypes.bool
}

export default memo(Product);