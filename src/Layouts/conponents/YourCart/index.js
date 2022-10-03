import classNames from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify"
import { useEffect } from "react";

import { userPut } from "~/redux/userSlice";
import { getTotal, clearCar } from '~/redux/userSlice';
import Pageing from "~/components/Pageing";
import Product from "~/components/Product";
import Button from "~/components/Button";
import style from './YourCart.module.scss';
const cx = classNames.bind(style)
function YourCart() {

    const dispath = useDispatch()
    const cart = useSelector(state => state.user.value.cart)
    const user = useSelector(state => state.user.value)

    useEffect(() => {
        dispath(getTotal(null));
    }, [cart])

    const { cartTotalAmount } = useSelector(state => state.user.value.cart)

    let isMobile = useMediaQuery({ query: '(max-width: 426px)' })

    const handleUpdate = () => {
        if (user.id) {
            dispath(userPut(user))
            toast.success(`Updated your shopping cart`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.warn(`You are not logged`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    // const total = productInCart.reduce((acc, cur) => {
    //     return acc + cur.quanti * cur.newPrice
    // }, 0)

    const checkoutItems = [
        {
            title: "Subtotal",
            ship: `$${cartTotalAmount}` // API
        },
        {
            title: "Shipping",
            ship: "$21.00"
        },
        {
            title: "Tax",
            ship: "$1.91"
        },
        {
            title: "Order Total",
            ship: `$${cartTotalAmount + 21 + 1.91}` // Api
        }
    ]

    return (
        <Container>
            <Pageing pages={["Cart"]} />
            <h1 className={cx('Cart-Head')}>Shopping Cart</h1>
            <Row>
                <Col lg={9} sm={12}>
                    {
                        !isMobile &&
                        <div className={cx('titles')}>
                            <Row>
                                <Col md={2}>Item</Col>
                                <Col md={4}></Col>
                                <Col md={2}>Price</Col>
                                <Col md={1}>Quanty</Col>
                                <Col md={2}>Subtotal</Col>
                                <Col md={1}></Col>
                            </Row>
                        </div>
                    }
                    {cart.cartItems.length === 0 && (
                        <h1 className={cx('notthing')}>Notthing</h1>
                    )}
                    {cart.cartItems.map(product => (
                        <Product isInCart key={product.id} data={product} />
                    ))}
                    <div className={cx('buttons')}>
                        <Button to='/' outlineGray>Continue Shopping</Button>
                        <Button onClick={() => dispath(clearCar(null))} black>Clear Shopping Cart</Button>
                        <Button onClick={() => handleUpdate()} black>Update Shopping Cart</Button>
                    </div>
                </Col>

                <Col lg={3} sm={12} className={cx('right')}>
                    <h1 className={cx('right-head')}>Summary</h1>
                    <ul className={cx('menu')}>
                        {
                            checkoutItems.map((item, index) => (
                                <li key={index}>
                                    <h2>{item.title}</h2>
                                    <span>{item.ship}</span>
                                </li>
                            ))
                        }
                    </ul>
                    <Button primary>Proceed to Checkout</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default YourCart;