import classNames from "classnames/bind";
import { BsFillStarFill, BsFillCheckCircleFill, BsFillTelephoneXFill, BsFillBarChartFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TiPencil } from "react-icons/ti";
import { HiOutlineHeart } from "react-icons/hi";
import { memo } from "react";
import { Row, Col } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Formatter } from "../FormatCurrency";
import style from './Product.module.scss'
import Button from "../Button";
import { addToCart, removeCart, increaseCart, decreaseCart } from "~/redux/userCartSlice";
const cx = classNames.bind(style)

function Product({
    data,
    quanti,
    primary,
    isHorver,
    isInCart,
    isSerachResult,
    isCheckout
}) {
    const navigate = useNavigate()
    const dispath = useDispatch()
    let isMobile = useMediaQuery({ query: '(max-width: 426px)' })

    const handleAddToCart = (data, e) => {
        e.stopPropagation()
        dispath(addToCart({
            ...data
        }))
    }
    const handleRemove = (data, e) => {
        e.stopPropagation()
        dispath(removeCart(data))
    }
    const handleIncrease = (data, e) => {
        e.stopPropagation()
        dispath(increaseCart(data))
    }
    const handleDecrease = (data, e) => {
        e.stopPropagation()
        dispath(decreaseCart(data))
    }
    const handleClickItem = (id) => {
        navigate(`/products/${id}`)
    }
    // isPrimary
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < 3) {
            stars.push('star-color')
        } else {
            stars.push('star-no-color')
        }
    }

    return (
        <>
            {primary &&
                (<div
                    className={cx("product")}
                    onClick={() => handleClickItem(data.id)}
                >
                    <>
                        {data.is_active ? (
                            <div>
                                <BsFillCheckCircleFill className={cx('stock-icon')} />
                                <div className={cx('tilte')}>{'in stock'}</div>
                            </div>

                        ) : (
                            <div>
                                <BsFillTelephoneXFill className={cx('phone-icon')} />
                                <div className={cx('tilte')}>{'check availability'}</div>
                            </div>
                        )
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
                                Reviews ({20})
                            </div>
                        </div>
                        <div className={cx("name")}>
                            {data.description}
                        </div>
                        <div className={cx("prices")}>
                            <div className={cx("old")}>{Formatter.format(data.old_price)}</div>
                            <div className={cx("new")}>{Formatter.format(data.new_price)}</div>
                        </div>
                    </>
                    <div className={cx('layout-hover')}>
                        <div className={cx('actions')}>
                            <HiOutlineHeart className={cx('icon-isHover')} />
                            <BsFillBarChartFill className={cx('icon-isHover')} />
                        </div>
                        <Button
                            onClick={(e) => handleAddToCart(data, e)}
                            outline
                            lefticon={<AiOutlineShoppingCart />}
                        >
                            Add to cart
                        </Button>
                    </div>
                </div>)
            }
            {isHorver &&
                (<div className={cx('wrapper-isHover')} onClick={() => handleClickItem(data.id)}>
                    <div className={cx('quanti-isHover')}>{data.cartQuantity}<span>x</span></div>
                    <div className={cx('img-isHover')}>
                        <img src={data.images[0]} alt="img" />
                    </div>
                    <div className={cx('name-isHover')}>{data.description}</div>
                    <div className={cx('actions')}>
                        <IoMdClose className={cx('icon-isHover')} onClick={(e) => handleRemove(data, e)} />
                        <TiPencil className={cx('icon-isHover')} />
                    </div>
                </div>)
            }
            {isInCart &&
                (<Row className={cx('wrapper-isInCart')} onClick={() => handleClickItem(data.id)}>
                    <Col md={2} className={cx('img-isInCart')}>
                        <img src={data.images[0]} alt="alt" />
                    </Col>

                    <Col md={4} className={cx('name-isInCart')}>
                        <span>{data.description}</span>
                    </Col>

                    <Col md={2} className={cx('price-isInCart')}>
                        {isMobile && <div className={cx('priceInMobile')}>Price</div>}
                        {Formatter.format(data.new_price)}
                    </Col>

                    <Col md={1} className={cx('quanti-isInCart')}>
                        <span className={cx('number')}>{data.cartQuantity}</span>
                        <div className={cx('wrap-icon')}>
                            <IoIosArrowUp onClick={(e) => handleIncrease(data, e)} />
                            <IoIosArrowDown onClick={(e) => handleDecrease(data, e)} />
                        </div>
                    </Col>

                    <Col md={2} className={cx('total-isInCart')}>
                        {isMobile && <div className={cx('totalInMobile')}>Subtotal</div>}
                        <div>{Formatter.format(data.new_price * data.cartQuantity)}</div>
                    </Col>

                    <Col md={1} className={cx('control-isInCart')}>
                        <IoMdClose onClick={(e) => handleRemove(data, e)} />
                        <TiPencil />
                    </Col>

                </Row>)
            }
            {isSerachResult && (
                <div className={cx('wrapper-isSearch')} onClick={() => handleClickItem(data.id)}>
                    <div className={cx('conditon')}>
                        {data.is_active
                            ? <div>
                                <BsFillCheckCircleFill className={cx('stock-icon')} />
                                <div className={cx('tilte')}>{'in stock'}</div>
                            </div>
                            : <div>
                                <BsFillTelephoneXFill className={cx('phone-icon')} />
                                <div className={cx('tilte')}>{'check availability'}</div>
                            </div>
                        }
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('left-isSearch')}>
                            <div className={cx('img-isSearch')} ><img src={data.images[0]} alt="img" /></div>
                            <div className={cx("reviews")}>
                                <div className={cx("stars")}>
                                    {
                                        stars.map((star, index) => (
                                            <BsFillStarFill key={index} className={cx(star, "icon")} />
                                        ))
                                    }
                                </div>
                                <div className={cx("review-quanti")}>
                                    Reviews ({20})
                                </div>
                            </div>
                        </div>

                        <div className={cx('right-isSearch')}>
                            <div className={cx("name-isSearch")}>
                                {data.name}
                            </div>
                            <div className={cx("title-isSearch")}>
                                {data.description}
                            </div>
                            <div className={cx("prices-isSearch")}>
                                <div className={cx("old")}>{Formatter.format(data.old_price)}</div>
                                <div className={cx("new")}>{Formatter.format(data.new_price)}</div>
                            </div>
                            <Button onClick={(e) => handleAddToCart(data, e)} primary>Add to cart</Button>
                        </div>
                    </div>
                </div>
            )}
            {isCheckout && (
                <div className={cx('product-wrapper')} onClick={() => handleClickItem(data.id)}>
                    <div className={cx('img-incheckout')}>
                        <img src={data.images[0]} />
                    </div>
                    <div className={cx('detail')}>
                        <span className={cx('product-description')}>{data.description}</span>
                        <span>{`Qty:${quanti} $${quanti * data.new_price}.00`}</span>
                    </div>
                </div>
            )}
        </>
    );
}


export default memo(Product);