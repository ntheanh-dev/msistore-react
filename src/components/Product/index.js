import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { BsFillStarFill, BsFillCheckCircleFill, BsFillTelephoneXFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { memo } from "react";
import { TiDeleteOutline, TiPencil } from "react-icons/ti";
import { Row, Col } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive'
import { Fragment } from "react";

import Button from "../Button";
import Pageing from "../Pageing";
import style from './Product.module.scss'
const cx = classNames.bind(style)

function Product({
    name,
    img,
    oldPrice,
    newPrice,
    price,
    review,
    condition,
    quanti,

    primary,
    isHorver,
    isDetail,
    isInCart

}) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < review) {
            stars.push('star-color')
        } else {
            stars.push('star-no-color')
        }
    }

    // Item in cart
    const total = price * quanti
    let isMobile = useMediaQuery({ query: '(max-width: 426px)' })

    return (
        <Link to="/product">
            {primary &&
                (<div className={cx("product")}>
                    {
                        condition.includes("in stock")
                            ? <div>
                                <BsFillCheckCircleFill className={cx('stock-icon')} />
                                <div className={cx('tilte')}>{condition}</div>
                            </div>
                            : <div>
                                <BsFillTelephoneXFill className={cx('phone-icon')} />
                                <div className={cx('tilte')}>{condition}</div>
                            </div>
                    }
                    <div className={cx("img")}>
                        <img src={img} alt="" />
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
                            Reviews ({review})
                        </div>
                    </div>
                    <div className={cx("name")}>
                        {name}
                    </div>
                    <div className={cx("prices")}>
                        <div className={cx("old")}>${oldPrice}</div>
                        <div className={cx("new")}>${newPrice}</div>
                    </div>
                </div>)
            }

            {isHorver &&
                (<Link className={cx('wrapper-isHover')}>
                    <div className={cx('quanti-isHover')}>{quanti}<span>x</span></div>
                    <div className={cx('img-isHover')}>
                        <img src={img} alt="img" />
                    </div>
                    <div className={cx('name-isHover')}>{name}</div>
                    <div className={cx('actions')}>
                        <TiDeleteOutline className={cx('icon-isHover')} />
                        <TiPencil className={cx('icon-isHover')} />
                    </div>
                </Link>)
            }
            {isInCart &&
                (<Row className={cx('wrapper-isInCart')}>
                    <Col md={2} className={cx('img-isInCart')}>
                        <img src={img} alt="alt" />
                    </Col>

                    <Col md={4} className={cx('name-isInCart')}>
                        <span>{name}</span>
                    </Col>

                    <Col md={2} className={cx('price-isInCart')}>
                        {isMobile && <div className={cx('priceInMobile')}>Price</div>}
                        ${price}
                    </Col>

                    <Col md={1} className={cx('quanti-isInCart')}>
                        <span className={cx('number')}>{quanti}</span>
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

            {isDetail &&
                (<Fragment>
                    <Pageing pages={['Laptops']} />
                    <div className={cx('head-isDetail')}>
                        <div className={cx('category')}>
                            <Link className={cx('linkActive')}>About Product</Link>
                            <Link>Details</Link>
                        </div>
                        <div className={cx('control-isDetail')}>
                            <div className={cx('price-isDetail')}>
                                <p>On Sale from</p>
                                <span>${total}</span>
                            </div>
                            <div className={cx('quanti-Detail')}>
                                <span className={cx('number-isDetail')}>{quanti}</span>
                                <div className={cx('wrap-icon')}>
                                    <IoIosArrowUp />
                                    <IoIosArrowDown />
                                </div>
                            </div>
                            <Button primary >Add to Cart</Button>
                        </div>
                    </div>
                </Fragment>)
            }
        </Link>
    );
}

Product.propTypes = {
    name: PropTypes.string.isRequired,
    img: PropTypes.node.isRequired,
    oldPrice: PropTypes.number,
    newPrice: PropTypes.number,
    review: PropTypes.number,
    condition: PropTypes.string
}

export default memo(Product);