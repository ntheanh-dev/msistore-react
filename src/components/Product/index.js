import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { BsFillStarFill, BsFillCheckCircleFill, BsFillTelephoneXFill, BsFillBarChartFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TiDeleteOutline, TiPencil } from "react-icons/ti";
import { HiOutlineHeart } from "react-icons/hi";
import { memo } from "react";
import { Row, Col } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"

import style from './Product.module.scss'
import Button from "../Button";
// import { addToCart, removeCart, increaseCart, decreaseCart } from "~/redux/shoppingCart";
import { addToCart, removeCart, increaseCart, decreaseCart } from "~/redux/userSlice";
const cx = classNames.bind(style)

function Product({
    data,

    primary,
    isHorver,
    isInCart,
    isSerachResult

}) {
    const { id } = useSelector(state => state.user.value)
    const navigate = useNavigate()
    const dispath = useDispatch()
    const handleAddToCart = (data, e) => {
        e.stopPropagation()
        if (id) {
            dispath(addToCart(data))
        } else {
            toast.warn(`Please login to add product`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
        }
    }
    const handleRemove = (data) => {
        dispath(removeCart(data))
    }
    const handleIncrease = (data) => {
        dispath(increaseCart(data))
    }
    const handleDecrease = (data) => {
        dispath(decreaseCart(data))
    }
    const handleClickItem = (id) => {
        navigate(`/product/${id}`)
    }
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
    let isMobile = useMediaQuery({ query: '(max-width: 426px)' })

    return (
        <div>
            {primary &&
                (<div className={cx("product")} onClick={() => handleClickItem(data.id)}>
                    <div >
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
                            {data.title}
                        </div>
                        <div className={cx("prices")}>
                            <div className={cx("old")}>${data.oldPrice}</div>
                            <div className={cx("new")}>${data.newPrice}</div>
                        </div>
                    </div>
                    <div className={cx('layout-hover')}>
                        <div className={cx('actions')}>
                            <HiOutlineHeart className={cx('icon-isHover')} />
                            <BsFillBarChartFill className={cx('icon-isHover')} />
                        </div>
                        <Button onClick={(e) => handleAddToCart(data, e)} primary>Add to cart</Button>
                    </div>
                </div>)
            }
            {isHorver &&
                (<div className={cx('wrapper-isHover')}>
                    <div className={cx('quanti-isHover')}>{data.cartQuantity}<span>x</span></div>
                    <div className={cx('img-isHover')}>
                        <img src={data.images[0]} alt="img" />
                    </div>
                    <div className={cx('name-isHover')}>{data.title}</div>
                    <div className={cx('actions')}>
                        <TiDeleteOutline className={cx('icon-isHover')} onClick={() => handleRemove(data)} />
                        <TiPencil className={cx('icon-isHover')} />
                    </div>
                </div>)
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
                        <span className={cx('number')}>{data.cartQuantity}</span>
                        <div className={cx('wrap-icon')}>
                            <IoIosArrowUp onClick={() => handleIncrease(data)} />
                            <IoIosArrowDown onClick={() => handleDecrease(data)} />
                        </div>
                    </Col>

                    <Col md={2} className={cx('total-isInCart')}>
                        {isMobile && <div className={cx('totalInMobile')}>Subtotal</div>}
                        <div>${data.newPrice * data.cartQuantity}</div>
                    </Col>

                    <Col md={1} className={cx('control-isInCart')}>
                        <TiDeleteOutline onClick={() => handleRemove(data)} />
                        <TiPencil />
                    </Col>

                </Row>)
            }
            {isSerachResult && (
                <div className={cx('wrapper-isSearch')} onClick={() => handleClickItem(data.id)}>
                    <div className={cx('conditon')}>
                        {data.condition.includes("in stock")
                            ? <div>
                                <BsFillCheckCircleFill className={cx('stock-icon')} />
                                <div className={cx('tilte')}>{data.condition}</div>
                            </div>
                            : <div>
                                <BsFillTelephoneXFill className={cx('phone-icon')} />
                                <div className={cx('tilte')}>{data.condition}</div>
                            </div>
                        }
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('left-isSearch')}>
                            <div className={cx('img-isSearch')} ><img src={`/${data.images[0]}`} alt="img" /></div>
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
                        </div>

                        <div className={cx('right-isSearch')}>
                            <div className={cx("name-isSearch")}>
                                {data.name}
                            </div>
                            <div className={cx("title-isSearch")}>
                                {data.title}
                            </div>
                            <div className={cx("prices-isSearch")}>
                                <div className={cx("old")}>${data.oldPrice}</div>
                                <div className={cx("new")}>${data.newPrice}</div>
                            </div>
                            <Button onClick={(e) => handleAddToCart(data, e)} primary>Add to cart</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

Product.propTypes = {
    data: PropTypes.object.isRequired,
    primary: PropTypes.bool,
    isHorver: PropTypes.bool,
    isInCart: PropTypes.bool
}

export default memo(Product);