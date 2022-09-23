import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { Row, Col } from "react-bootstrap";
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from "react-icons/fa";
import { TiDeleteOutline, TiPencil } from "react-icons/ti";
import { useMediaQuery } from 'react-responsive'


import style from './YourCart.module.scss';
const cx = classNames.bind(style)
function ProductInCart({ name, price, quanti, img }) {
    const total = price * quanti
    let isMobile = useMediaQuery({ query: '(max-width: 426px)' })

    return (
        <Row className={cx('item')}>
            <Col md={2} className={cx('img')}>
                <img src={img} alt="alt" />
            </Col>

            <Col md={4} className={cx('name')}>
                <span>{name}</span>
            </Col>

            <Col md={2} className={cx('price')}>
                {isMobile && <div className={cx('priceInMobile')}>Price</div>}
                ${price}
            </Col>

            <Col md={1} className={cx('qty')}>
                <span className={cx('number')}>{quanti}</span>
                <div className={cx('wrap-icon')}>
                    <FaRegArrowAltCircleUp />
                    <FaRegArrowAltCircleDown />
                </div>
            </Col>

            <Col md={2} className={cx('total')}>
                {isMobile && <div className={cx('totalInMobile')}>Subtotal</div>}
                <div>${total}</div>
            </Col>

            <Col md={1} className={cx('control')}>
                <TiDeleteOutline />
                <TiPencil />
            </Col>

        </Row>
    );
}

ProductInCart.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quanti: PropTypes.number.isRequired,
}
export default ProductInCart;