import classNames from "classnames/bind";
import FormInput from "~/components/Input";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { BsCheckLg } from "react-icons/bs";
import { useMediaQuery } from 'react-responsive'
import style from './Checkout.module.scss'
import { Col, Container, Row } from "react-bootstrap";
import Pageing from "~/components/Pageing";
import { useRef } from "react";
import { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "~/components/Button";
import { Toast } from "~/configs/Toast";
import Form from 'react-bootstrap/Form';
import { FaRegCircle } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Product from "~/components/Product";
import { PAYMENT, SHIPPING } from "~/configs/Enums";
import { authAPI, endpoints } from "~/configs/API";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "~/components/LoadingSpinner";
import { create } from "~/redux/userAddressSlice";
import { orderItemDjango } from "~/redux/userCartSlice";
// import Product from "~/components/Product";
const cx = classNames.bind(style)
const Checkout = () => {
    const formRef = useRef()
    let isMobile = useMediaQuery({ query: '(max-width: 426px)' })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const divRef = useRef(null);
    const [divWidth, setDivWidth] = useState(0);
    const [isHomeDelivery, setisHomeDelivery] = useState(null)
    const [shippingMethod, setShippingMethod] = useState(SHIPPING.STANDARD_RATE)
    const [paymentMethod, setPaymentMethod] = useState(PAYMENT.PAY_ON_DELIVERY)
    const [SDKready, setSDKready] = useState(false)
    const [paypalClientId, setPaypalClientId] = useState('')
    const { address } = useSelector(state => state.userAddress)
    const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(state => state.userCart)
    const { status } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.auth)
    const [show, setShow] = useState(false)
    //1: shipping, 2: review&payment
    const [checkoutProcess, setCheckoutProcess] = useState(1)
    // Set css to process line bar
    useEffect(() => {
        if (divRef.current) {
            const width = divRef.current.offsetWidth / 4;
            setDivWidth(width);
        }
    }, [divRef]);

    useEffect(() => {
        window.scrollTo(0, 0);
        // document.title = `${product[0].name}`
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkoutProcess]);

    const [values, setValues] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        country: address ? address.country : "",
        city: address ? address.city : "",
        street: address ? address.street : "",
        home_number: address ? address.home_number : "",
        phone_number: address ? address.phone_number : ""
    })
    const INPUTS = [
        {
            name: "first_name",
            type: "text",
            label: "First name",
            errormessage: "First name should be 3-30 characters and shouldn't include any special character!",
            pattern: "^([a-z]+)((\s{1}[a-z]+){1,})$",
            required: true,
        },
        {
            name: "last_name",
            type: "text",
            errormessage: "Last name should be 3-30 characters and shouldn't include any special character!",
            label: "Last name",
            pattern: "^([a-z]+)((\s{1}[a-z]+){1,})$",
            required: true,
        },
        {
            name: "email",
            type: "email",
            placeholder: "Your email",
            label: "Email",
            errormessage: "It should be a valid email address",
            required: true,
        },
        {
            name: "country",
            type: "text",
            errormessage: "Country name should be 3-30 characters and shouldn't include any special character!",
            label: "Country",
            required: false,
        },
        {
            name: "city",
            type: "text",
            errormessage: "City name should be 3-30 characters and shouldn't include any special character!",
            label: "City",
            required: false,
        },
        {
            name: "street",
            type: "text",
            errormessage: "Street should be 3-50 characters and shouldn't include any special character!",
            label: "Street",
            required: false,
        },
        {
            name: "home_number",
            type: "text",
            errormessage: "Home number should be 3-30 characters!",
            label: "Home number",
            pattern: "^[A-Za-z0-9]{3,30}$",
            required: true,
        },
        {
            name: "phone_number",
            type: "text",
            errormessage: "Home number should be 3-30 characters!",
            label: "Phone number",
            pattern: "^(0[0-9]{9})$",
            required: true,
        },
    ]
    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const nextToPayment = () => {
        const isValidForm = Object.values(values).every(value => value !== null && value !== undefined && value !== '');
        if (isValidForm) {
            if (!address) {
                const { first_name, last_name, email, ...other } = values
                const addressForm = new FormData()
                addressForm.append('country', values.country)
                addressForm.append('city', values.city)
                addressForm.append('street', values.street)
                addressForm.append('home_number', values.home_number)
                addressForm.append('phone_number', values.phone_number)
                addressForm.append('user', user.id)
                dispatch(create(addressForm))
            }
            setCheckoutProcess(2)
        } else {
            Toast('warn', 'Form must be filled out enough')
        }
    }

    const PAYMENT_COMPONENT = [
        {
            type: PAYMENT.PAY_ON_DELIVERY,
            svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" id="payment"><path d="M5 66.267a1 1 0 0 0 1 1h4.342a5.274 5.274 0 0 0 5.268-5.269v-.01c2.309.132 4.601.692 6.684 1.692l15.75 7.562c1.054.506 2.19.76 3.328.76a7.69 7.69 0 0 0 3.17-.686l29.43-13.322c.466-.241.814-.669.956-1.174a1.912 1.912 0 0 0-.202-1.5c-2.259-3.737-6.51-5.716-10.78-5.044l-14.53 1.725a5.363 5.363 0 0 0 .342-1.874 5.408 5.408 0 0 0-5.402-5.402h-7.723l-.027-.028a15.29 15.29 0 0 0-10.883-4.508H15.61v-.6a5.274 5.274 0 0 0-5.268-5.269H6a1 1 0 0 0-1 1v30.947zm20.723-24.078c3.576 0 6.94 1.393 9.469 3.922l.32.32a1 1 0 0 0 .707.294h8.137c1.876 0 3.402 1.526 3.402 3.402s-1.526 3.401-3.402 3.401H26.749a1 1 0 1 0 0 2h17.607a5.374 5.374 0 0 0 3.542-1.333l16.32-1.937a8.714 8.714 0 0 1 8.766 3.99L43.718 69.494a5.68 5.68 0 0 1-4.809-.055l-15.75-7.562a19.882 19.882 0 0 0-7.549-1.918V42.19h10.113zM7 36.32h3.342a3.272 3.272 0 0 1 3.268 3.269v22.409a3.272 3.272 0 0 1-3.268 3.269H7V36.32zM73 8H29c-1.103 0-2 .897-2 2v26c0 1.103.897 2 2 2h44c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2zm0 8.173A7.254 7.254 0 0 1 66.827 10H73v6.173zM35.173 10A7.254 7.254 0 0 1 29 16.173V10h6.173zM29 29.827A7.254 7.254 0 0 1 35.173 36H29v-6.173zM37.196 36A9.267 9.267 0 0 0 29 27.804v-9.608A9.267 9.267 0 0 0 37.196 10h27.608A9.267 9.267 0 0 0 73 18.196v9.608A9.267 9.267 0 0 0 64.804 36H37.196zm29.631 0A7.254 7.254 0 0 1 73 29.827V36h-6.173z"></path><path d="M51 16.585c1.654 0 3 1.215 3 2.707a1 1 0 1 0 2 0c0-2.273-1.72-4.175-4-4.612V14a1 1 0 1 0-2 0v.68c-2.28.437-4 2.339-4 4.612C46 21.888 48.243 24 51 24c1.654 0 3 1.215 3 2.708 0 1.492-1.346 2.707-3 2.707s-3-1.215-3-2.707a1 1 0 1 0-2 0c0 2.273 1.72 4.175 4 4.612V32a1 1 0 1 0 2 0v-.68c2.28-.437 4-2.339 4-4.612C56 24.112 53.757 22 51 22c-1.654 0-3-1.215-3-2.708 0-1.492 1.346-2.707 3-2.707zM65 20h-3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2zm0 4h-3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2zm-25-4h-3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2zm0 4h-3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2z"></path></svg>
        },
        {
            type: PAYMENT.CARD,
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" id="paypal"><path fill="#139AD6" d="M49.2 28.2h-3.4c-.2 0-.4.2-.5.4l-1.4 8.8c0 .2.1.3.3.3H46c.2 0 .3-.1.3-.3l.4-2.5c0-.2.2-.4.5-.4h1.1c2.3 0 3.6-1.1 3.9-3.3.2-.9 0-1.7-.4-2.2-.6-.5-1.5-.8-2.6-.8m.4 3.3c-.2 1.2-1.1 1.2-2 1.2H47l.4-2.3c0-.1.1-.2.3-.2h.2c.6 0 1.2 0 1.5.4.2.1.2.4.2.9"></path><path fill="#263B80" d="M24.7 28.2h-3.4c-.2 0-.4.2-.5.4l-1.4 8.8c0 .2.1.3.3.3h1.6c.2 0 .4-.2.5-.4l.4-2.4c0-.2.2-.4.5-.4h1.1c2.3 0 3.6-1.1 3.9-3.3.2-.9 0-1.7-.4-2.2-.6-.5-1.4-.8-2.6-.8m.4 3.3c-.2 1.2-1.1 1.2-2 1.2h-.5l.4-2.3c0-.1.1-.2.3-.2h.2c.6 0 1.2 0 1.5.4.1.1.2.4.1.9M35 31.4h-1.6c-.1 0-.3.1-.3.2l-.1.5-.1-.2c-.4-.5-1.1-.7-1.9-.7-1.8 0-3.4 1.4-3.7 3.3-.2 1 .1 1.9.6 2.5.5.6 1.2.8 2.1.8 1.5 0 2.3-.9 2.3-.9l-.1.5c0 .2.1.3.3.3H34c.2 0 .4-.2.5-.4l.9-5.6c-.1-.1-.3-.3-.4-.3m-2.3 3.2c-.2.9-.9 1.6-1.9 1.6-.5 0-.9-.2-1.1-.4-.2-.3-.3-.7-.3-1.2.1-.9.9-1.6 1.8-1.6.5 0 .8.2 1.1.4.3.3.4.8.4 1.2"></path><path fill="#139AD6" d="M59.4 31.4h-1.6c-.1 0-.3.1-.3.2l-.1.5-.1-.2c-.4-.5-1.1-.7-1.9-.7-1.8 0-3.4 1.4-3.7 3.3-.2 1 .1 1.9.6 2.5.5.6 1.2.8 2.1.8 1.5 0 2.3-.9 2.3-.9l-.1.5c0 .2.1.3.3.3h1.5c.2 0 .4-.2.5-.4l.9-5.6c-.1-.1-.2-.3-.4-.3m-2.3 3.2c-.2.9-.9 1.6-1.9 1.6-.5 0-.9-.2-1.1-.4-.2-.3-.3-.7-.3-1.2.1-.9.9-1.6 1.8-1.6.5 0 .8.2 1.1.4.4.3.5.8.4 1.2"></path><path fill="#263B80" d="M43.7 31.4H42c-.2 0-.3.1-.4.2L39.4 35l-1-3.2c-.1-.2-.2-.3-.5-.3h-1.6c-.2 0-.3.2-.3.4l1.8 5.3-1.7 2.4c-.1.2 0 .5.2.5h1.6c.2 0 .3-.1.4-.2l5.5-7.9c.3-.3.1-.6-.1-.6"></path><path fill="#139AD6" d="m61.3 28.5-1.4 9c0 .2.1.3.3.3h1.4c.2 0 .4-.2.5-.4l1.4-8.8c0-.2-.1-.3-.3-.3h-1.6c-.1-.1-.2 0-.3.2"></path><path fill="#263B80" d="M12 25.2c-.7-.8-2-1.2-3.8-1.2h-5c-.3 0-.6.3-.7.6l-2 13.1c0 .3.2.5.4.5H4l.8-4.9v.2c.1-.3.4-.6.7-.6H7c2.9 0 5.1-1.2 5.8-4.5v-.3c-.1 0-.1 0 0 0 .1-1.3-.1-2.1-.8-2.9"></path><path fill="#139AD6" d="M12.7 28.1v.3c-.7 3.4-2.9 4.5-5.8 4.5H5.4c-.3 0-.6.3-.7.6l-1 6.1c0 .2.1.4.4.4h2.6c.3 0 .6-.2.6-.5v-.1l.5-3.1v-.2c0-.3.3-.5.6-.5h.4c2.5 0 4.5-1 5-4 .2-1.2.1-2.3-.5-3-.1-.2-.3-.4-.6-.5"></path><path fill="#232C65" d="M12 27.8c-.1 0-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.4-.1-.8-.1-1.3-.1H6.2c-.1 0-.2 0-.3.1-.2.1-.3.3-.3.5l-.8 5.2v.2c.1-.3.4-.6.7-.6H7c2.9 0 5.1-1.2 5.8-4.5 0-.1 0-.2.1-.3-.2-.1-.3-.2-.5-.2-.3-.1-.3-.1-.4-.1"></path></svg>

        }
    ]

    const handleVerify = () => {

    }

    const getPaypalClient = async () => {
        try {
            const res = await authAPI().get(endpoints['payment'])
            setPaypalClientId(res.data.client_id)
            const paypalScript = document.createElement('script')
            paypalScript.src = `https://www.paypal.com/sdk/js?client-id=${res.data.client_id}`
            paypalScript.async = true
            paypalScript.type = 'text/javascript'
            paypalScript.onload = () => {
                setSDKready(true)
            }
            document.body.appendChild(paypalScript)
        } catch (e) {
            console.log(e)
        }

    }
    const handlePay = () => {
        const form = new FormData()
        const orderItem = orderItemDjango(cartItems)
        form.append('order_items', JSON.stringify(orderItem))
        form.append('order_status', JSON.stringify({
            is_paid: paymentMethod === PAYMENT.CARD,
            delivery_method: shippingMethod,
            payment_method: paymentMethod,
            delivery_stage: 'Processing'
        }))

        const createOrder = async () => {
            try {
                const res = await authAPI().post(endpoints['order'], form, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                navigate(`/checkout/receipt/${res.data}`)
            } catch (e) {
                console.log(e)
                // dispatch(refreshToken())
            }
        }
        createOrder()
    }


    useEffect(() => {
        getPaypalClient()
    }, [])

    return (
        <Container className={cx('wrapper')}>
            {status === 'loading' && <LoadingSpinner />}
            <Pageing pages={[{ title: 'Shopping Cart', path: 'yourcart' }, { title: 'Checkout' }]} />
            <Row className={cx('header')}>
                <Col lg={8} md={6}>
                    <h1>Checkout Process</h1>
                </Col>
                {!isMobile && (
                    <Col lg={4} md={6} className={cx('process')} ref={divRef}>
                        <div className={cx('circle', checkoutProcess >= 1 && 'active')} id="circle" >
                            <BsCheckLg />
                            <p className={cx('process-state')}>Shipping</p>
                        </div>
                        <div className={cx('circle', checkoutProcess === 2 && 'active')} id="circle">
                            <span>2</span>
                            <p className={cx('process-state')}>Review & Payments</p>
                        </div>
                    </Col>
                )}
            </Row>

            <Row>
                <Col lg={8} md={6} sm={12}>
                    {checkoutProcess === 1 ? (
                        <>
                            <div className={cx("title")}>
                                <span>Shipping Address</span>
                            </div>
                            <form ref={formRef}>
                                {INPUTS.map((input, index) => (
                                    <FormInput
                                        key={index}
                                        {...input}
                                        value={values[input.name]}
                                        onChange={onChange}
                                    />
                                ))}
                            </form>
                            <Form className={cx("form-shipping")}>
                                <div className="mb-3">
                                    <h1 className={cx("form-shipping-title")}>{SHIPPING.STANDARD_RATE}</h1>
                                    <Form.Check // prettier-ignore
                                        type={'radio'}
                                        id={`1`}
                                        name='group1'
                                        label={'Price may vary depending on the item/destination. Shop Staff will contact you.'}
                                        onChange={() => setShippingMethod(SHIPPING.STANDARD_RATE)}
                                        checked={shippingMethod === SHIPPING.STANDARD_RATE ? true : false}
                                    />

                                    <h1 className={cx("form-shipping-title")}>{SHIPPING.PICK_UP}</h1>
                                    <Form.Check
                                        type={'radio'}
                                        name='group2'
                                        label={`1234 Street Adress City Address, 1234`}
                                        id={`2`}
                                        onChange={() => setShippingMethod(SHIPPING.PICK_UP)}
                                        checked={shippingMethod === SHIPPING.PICK_UP ? true : false}
                                    />
                                </div>
                            </Form>
                            {
                                true ? (
                                    <div className={cx('footer-left')}>
                                        <Button onClick={nextToPayment} primary>Next</Button>
                                    </div>
                                ) : (
                                    <div className={cx('footer-left')}>
                                        <Button onClick={handleVerify} primary>Verify Phone Number</Button>
                                    </div>
                                )
                            }
                        </>
                    ) : (
                        <div className={cx("payment")}>
                            <div className={cx("title")}>
                                <span>Payment method</span>
                            </div>

                            {PAYMENT_COMPONENT.map(ele => (
                                <div
                                    className={cx('payment-option', (paymentMethod === ele.type && 'active-border'))}
                                    onClick={() => setPaymentMethod(paymentMethod === ele.type ? null : ele.type)}
                                    key={ele.type}
                                >
                                    <Row className={cx('payment-option-head')}>
                                        <Col className={cx('border-right', (paymentMethod === ele.type && 'active-border-right'))} xs={3} md={3} lg={2}>
                                            <div className={cx('payment-option-head-icon')}>
                                                {ele.svg}
                                            </div>
                                        </Col>
                                        <Col xs={7} md={7} lg={9} className={cx('payment-option-head-name')}>
                                            <p>{ele.type}</p>
                                        </Col>
                                        <Col xs={2} md={2} lg={1}>
                                            {paymentMethod === ele.type ? <IoIosCheckmarkCircle className={cx('payment-option-icon-checked')} /> : <FaRegCircle />}
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                            <div className={cx("payment-btns")}>
                                <Button primary onClick={() => setCheckoutProcess(1)}>Back</Button>
                                <Button primary onClick={handlePay}>Next</Button>
                            </div>
                        </div>
                    )}
                </Col>
                <Col lg={4} md={6} sm={12}>
                    <div className={cx('right')}>
                        {checkoutProcess >= 2 && (
                            <>
                                <h1 className={cx('right-title')}>Shipping address</h1>
                                <span>{`${values.first_name} ${values.last_name}`}</span><br />
                                <span>{`${values.home_number}, ${values.street}, ${values.city}, ${values.country}`}</span><br />
                                <span>{`${values.phone_number}`}</span>
                            </>
                        )}
                        <h1 className={cx('right-head')}>Order Summary</h1>
                        <div className={cx('col-heading')} onClick={() => setShow(!show)}>
                            <span>{cartTotalQuantity} items in Cart</span>
                            {show ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                        </div>
                        {show && cartItems.map((ele, index) =>
                            <Product isCheckout={true} key={index} data={ele} quanti={ele.cartQuantity} />
                        )}
                        {show && (
                            <div className={cx('add-product')}>
                                <Button primary small to={'/yourcart'}>Add more product</Button>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>

            <style>
                {`
                    #circle::before {
                        content : "";
                        position: absolute;
                        left    : 0;
                        bottom  : 50%;
                        height: 0;
                        width: calc(${divWidth}px - 20px); 
                        border-bottom: 2.5px solid #CCC;
                        transform: translateX(calc(-100% - 2.5px));
                    }
                    #circle::after {
                        content : "";
                        position: absolute;
                        left    : 0;
                        bottom  : 50%;
                        height: 0;
                        width: calc(${divWidth}px - 20px); 
                        border-bottom: 2.5px solid #CCC;
                        transform: translateX(37.5px);
                    }
                `}
            </style>
        </Container>
    );
}

export default memo(Checkout);
