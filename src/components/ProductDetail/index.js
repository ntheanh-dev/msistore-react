import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiOutlineHeart } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";
import { memo, useState, Fragment } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify"

import { Formatter } from "../FormatCurrency";
import { addToCart } from "~/redux/userCartSlice";
import Button from "../Button";
import style from './ProductDetail.module.scss'
const cx = classNames.bind(style)

function ProductDetail({ data }) {
    const dispath = useDispatch()
    const { uid } = useSelector(state => state.auth)

    const [qty, setQty] = useState(1)
    const [detail, setDetail] = useState(false)
    const [img, setImg] = useState(data.images[0]);
    const total = data.newPrice * qty;
    const handleUpdateQty = (type) => {
        if (type === 'plus') {
            setQty(qty + 1)
        } else {
            setQty(qty === 1 ? 1 : qty - 1)
        }
    }
    const handleAddItem = (data, e) => {
        if (uid) {
            dispath(addToCart({
                ...data,
                cartQuantity: qty
            }))
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

    return (
        <Fragment>
            <Container>
                <div className={cx('head')}>
                    <div className={cx('category')}>
                        <Link
                            className={detail ? ' ' : cx('linkActive')}
                            onClick={() => setDetail(false)}
                        >
                            About Product
                        </Link>
                        <Link
                            className={detail ? cx('linkActive') : ' '}
                            onClick={() => setDetail(true)}
                        >
                            Details
                        </Link>
                    </div>
                    <div className={cx('control')}>
                        <div className={cx('price')}>
                            <p>On Sale from</p>
                            <span>{Formatter.format(total)}</span>
                        </div>
                        <div className={cx('quanti')}>
                            <span className={cx('number')}>{qty}</span>
                            <div className={cx('wrap-icon')}>
                                <IoIosArrowUp onClick={() => handleUpdateQty('plus')} />
                                <IoIosArrowDown onClick={() => handleUpdateQty('minus')} />
                            </div>
                        </div>
                        <Button primary onClick={e => handleAddItem(data, e)} >Add to Cart</Button>
                    </div>
                </div>
            </Container>
            <div className={cx('body')}>
                <Container>
                    <Row className={cx('sm-flex-reserve')}>
                        <Col sm={12} md={6} className={cx('left')}>
                            <h1 className={cx('name')}>{data.name}</h1>
                            <p className={cx('title')}>Be the first to review this product</p>
                            {detail ? (
                                <ul className={cx('core-list')}>
                                    {data.detail.map((info, index) => (
                                        <li key={index}>{info}</li>
                                    ))}
                                </ul>) :
                                <div className={cx('desc')}>{data.title}</div>
                            }
                            <div className={cx('types')}>
                                <div className={(img === data.images[0]) ? cx('type-active') : ' '} onClick={() => (setImg(data.images[0]))}></div>
                                <div className={(img === data.images[1]) ? cx('type-active') : ' '} onClick={() => (setImg(data.images[1]))}></div>
                                <div className={(img === data.images[2]) ? cx('type-active') : ' '} onClick={() => (setImg(data.images[2]))}></div>
                            </div>
                            <div className={cx('quote')}>
                                Have a Question
                                <Link to={'/contac'} className={cx('link-contact')}>Contact Us</Link>
                            </div>
                        </Col>
                        <Col sm={12} md={6} className={cx('right')}>
                            <div className={cx('img')}>
                                <img src={`/${img}`} alt="alt" />
                                <div className={cx("icons")}>
                                    <HiOutlineHeart className={cx('icon')} />
                                    <BsFillBarChartFill className={cx('icon')} />
                                    <AiOutlineMail className={cx('icon')} />
                                </div>
                            </div>
                            <div className={cx('change-img')}>
                                <div className={(img === data.images[0]) ? cx('change-img-active') : ' '} onClick={() => (setImg(data.images[0]))}></div>
                                <div className={(img === data.images[1]) ? cx('change-img-active') : ' '} onClick={() => (setImg(data.images[1]))}></div>
                                <div className={(img === data.images[2]) ? cx('change-img-active') : ' '} onClick={() => (setImg(data.images[2]))}></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Fragment>
    );
}
ProductDetail.propTypes = {
    data: PropTypes.object.isRequired
}

export default memo(ProductDetail);