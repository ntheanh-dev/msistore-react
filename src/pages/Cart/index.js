import classNames from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify"
import { useEffect, useState } from "react";
import { AiOutlineInbox } from "react-icons/ai";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

import FormInput from "~/components/Input";
import { clearCart } from "~/redux/userCartSlice";
import { Formatter } from "~/components/FormatCurrency";
import { getTotal } from '~/redux/userCartSlice';
import Pageing from "~/components/Pageing";
import Product from "~/components/Product";
import Button from "~/components/Button";
import style from './Cart.module.scss';
const cx = classNames.bind(style)
function Cart() {
    const { user } = useSelector(state => state.auth)
    const dispath = useDispatch()
    const [showDiscount, setShowDiscount] = useState(false)
    const [values, setValues] = useState({
        code: ''
    })
    const isMobile = useMediaQuery({ query: '(max-width: 426px)' })
    const cart = useSelector(state => state.userCart)
    const { cartTotalAmount } = cart

    useEffect(() => {
        dispath(getTotal(null));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'YOUR CART'
    }, [])

    const handleClear = () => {
        dispath(clearCart())
        toast.error(`Cart cleared successfully`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const checkoutItems = [
        {
            title: "Subtotal",
            ship: cart.cartItems.length > 0 ? `${cartTotalAmount}` : 0
        },
        {
            title: "Tax",
            ship: 0
        },
        {
            title: "Order Total",
            ship: cart.cartItems.length > 0 ? `${cartTotalAmount}` : 0
        }
    ]

    const INPUT = {
        name: "discount",
        type: "text",
        errormessage: "Discount code must be number!",
        label: "Enter discount code",
        pattern: "^([0-8})$",
        required: true,
    }


    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    return (
        <Container className={cx('wrapper')}>
            <Pageing pages={[{ title: 'Cart', path: 'yourcart' }]} />
            <h1 className={cx('Cart-Head')}>Shopping Cart</h1>
            {/* Products */}
            {cart.cartItems.length > 0 ? (
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
                        {cart.cartItems.map(product => (
                            <Product isInCart key={product.id} data={product} />
                        ))}
                        <div className={cx('buttons')}>
                            <Button to='/' outlineGray>Continue Shopping</Button>
                            <Button onClick={handleClear} black>Clear Shopping Cart</Button>
                        </div>
                    </Col>

                    <Col lg={3} sm={12}>
                        <div className={cx('right')}>
                            <h1 className={cx('right-head')}>Summary</h1>
                            <ul className={cx('menu')}>
                                <div className={cx('right-title' && (!showDiscount && 'border-b'))} onClick={() => setShowDiscount(!showDiscount)}>
                                    <span>Apply Discount Code</span>
                                    {showDiscount ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                                </div>
                                {showDiscount && (
                                    <div className={cx('form-discount')}>
                                        <FormInput
                                            {...INPUT}
                                            value={values[INPUT.name]}
                                            onChange={onChange}
                                        />
                                        <Button fullwitdh outline>Apply Discount</Button>
                                    </div>
                                )}
                                {
                                    checkoutItems.map((item, index) => (
                                        <li key={index}>
                                            <h2>{item.title}</h2>
                                            <span>{Formatter.format(item.ship)}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                            <Button primary to={user.id ? '/checkout' : "/login"}>Proceed to Checkout</Button>
                        </div>
                    </Col>
                </Row>
            ) : (
                <div className={cx('nodata')}>
                    <AiOutlineInbox />
                    <h1>No data</h1>
                </div>
            )}
        </Container>
    );
}

export default Cart;