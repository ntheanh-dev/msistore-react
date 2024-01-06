import classNames from "classnames/bind";
import style from './OrderSuccess.module.scss'
import { IoIosCheckmarkCircle } from "react-icons/io";

import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Product from "~/components/Product";
import Button from "~/components/Button";
import { useRef } from "react";
import { useEffect } from "react";
import { authAPI, endpoints } from "~/configs/API";
import { useState } from "react";
import { clearCart } from "~/redux/userCartSlice";
const cx = classNames.bind(style)
const OrderSuccess = () => {
    const { address } = useSelector(state => state.userAddress)
    const { user } = useSelector(state => state.auth)
    const [receipt, setReceipt] = useState(null)
    const { uuid } = useParams()
    const dispath = useDispatch()
    const sumaryForm = useRef()
    const handlePrint = () => {
        window.print()
    }
    const getToltalPrice = () => {
        let total = 0
        if (receipt?.order_items) {
            receipt?.order_items.map(ele => total += Number(ele.quantity) * ele.product.new_price)
        }
        return total
    }
    const navigate = useNavigate()
    useEffect(() => {
        const getReceipt = async () => {
            try {
                const f = new FormData()
                f.append('uuid', JSON.stringify(uuid))
                const res = await authAPI().post(endpoints['receipt'], f, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                dispath(clearCart())
                setReceipt(res.data)
            } catch (e) {
                navigate('/404/')
            }
        }
        getReceipt()
    }, [])
    return (<>
        <Container className={cx('wrapper')} >

            <Row ref={sumaryForm}>
                <Col sm={12} md={6} lg={8} className={cx('left')} >
                    <IoIosCheckmarkCircle />
                    <h1>Your order made our day!</h1>
                    <span>Any questions about your order, contact us via e-mail theanhmgt66@gmail.com Everyday from 10:00am-7:00pm
                        We’d love to hear from you
                    </span>
                    <Row className={cx('left-body')}>
                        <Col lg={5}>
                            <div className={cx('left-body-title')}>Order Detail</div>
                            <p className={cx('left-body-content')}>{`${user.first_name} ${user.last_name}`}</p>
                            <p className={cx('left-body-content')}>{`${user.email}`}</p>
                            <p className={cx('left-body-content')}>{`${address.phone_number}`}</p>
                            <div className={cx('left-body-title')}>Payment method</div>
                            <p className={cx('left-body-content')}>{receipt?.status?.payment_method}</p>
                        </Col>
                        <Col lg={7}>
                            <div className={cx('left-body-title')}>
                                Address Shipping
                            </div>
                            <p className={cx('left-body-content')}>
                                {`${address.home_number} ${address.street} ${address.city} ${address.country}`}
                            </p>
                            <div className={cx('left-body-title')}>
                                Delivery option
                            </div>
                            <p className={cx('left-body-content')}>
                                {receipt?.status?.delivery_method}
                            </p>
                        </Col>
                    </Row>
                    <div className={cx('left-footer')}>
                        <Button primary to={'/'} >CONTINUE SHOPPING</Button>
                        <Button outline to={'/dashboard/myorders'} >GO TO MY ORDER</Button>
                        <Button outlineGray onClick={handlePrint}>PRINT SUMARY</Button>
                    </div>
                </Col>
                <Col sm={12} md={6} lg={4} className={cx('right')}>
                    <h1 className={cx('right-head')}>Order number: {uuid}</h1>
                    {receipt?.order_items?.map((ele, index) =>
                        <Product isCheckout={true} key={index} data={ele.product} quanti={ele.quantity} />
                    )}
                    <div className={cx('right-footer')}>
                        <h3>Order total</h3>
                        <h4>${getToltalPrice()}</h4>
                    </div>
                </Col>
            </Row>
        </Container>
    </>);
}
export default OrderSuccess;