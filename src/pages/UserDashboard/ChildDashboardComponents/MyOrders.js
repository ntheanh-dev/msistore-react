import classNames from "classnames/bind";
import style from "./ChildDashboardComponents.mobule.scss"
import { useSelector } from "react-redux";
import { AiOutlineInbox } from "react-icons/ai";
import { Col, Row } from "react-bootstrap";
import { IoMdTime } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import Button from "~/components/Button";
import { useState } from "react";
import { useEffect } from "react";
import { authAPI, endpoints } from "~/configs/API";

const cx = classNames.bind(style)
function MyOrders() {
    let isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const [receipts, setReceipts] = useState([])
    const { user } = useSelector(state => state.auth)
    const { address } = useSelector(state => state.userAddress)
    const [showDetail, setShowDetail] = useState([])
    useEffect(() => {
        const getReceipt = async () => {
            try {
                const res = await authAPI().get(endpoints['receipt'], {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                setReceipts(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        getReceipt()
    }, [])
    const getTotal = (receipt) => {
        let total = 0;
        receipt?.order_items.map(ele => total += Number(ele.quantity) * ele.product.new_price)
        return total
    }

    const handleShowDetail = (id) => {
        if (showDetail.find(item => item === id)) {
            const newArr = showDetail.filter(item => item !== id)
            setShowDetail(newArr)
        } else {
            setShowDetail([...showDetail, id])
        }
    }


    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>My orders</div>
            {receipts.length > 0 ? (
                receipts.map((ele, index) => (
                    <div key={index}>
                        <div className={cx('order')}>
                            <Row>
                                <Col lg={12} xs={6}>
                                    <Row className={cx('order-row-header') && (isTabletOrMobile && 'flex-column')} >
                                        <Col lg={3}>Order: {ele?.order.uuid}</Col>
                                        <Col lg={2}>Order status</Col>
                                        <Col lg={3}>Delivery Option</Col>
                                        <Col lg={2}>Payment</Col>
                                        <Col lg={2}>Total: ${getTotal(ele)}</Col>
                                    </Row>
                                </Col>
                                <Col lg={12} xs={6}>
                                    <Row className={cx('order-row-body') && (isTabletOrMobile && 'flex-column')} >
                                        <Col lg={3}>Placed on {ele?.order.created_at}</Col>
                                        <Col lg={2} className={cx('order-row-body-status', 'shipping-status')}>
                                            <IoMdTime />
                                            <p>{ele?.status.delivery_stage}</p>
                                        </Col>
                                        <Col lg={3}>{'Stardard Delivery'}</Col>
                                        <Col lg={2}>{'Pay on delivery'}</Col>
                                        <Col className={cx('order-row-body-view')} lg={2}
                                            onClick={() => handleShowDetail(ele.order.id)}
                                        >
                                            {showDetail.find(item => item === ele.order.id) ? 'Close' : 'View Detail'}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        {showDetail.find(item => item === ele.order.id) && (
                            <Row className={cx('view')}>
                                <Col className={cx('view-col')} xs={12} lg={6}>
                                    <div className={cx('view-col-title')}>
                                        <h1>ORDER INFORMATION</h1>
                                    </div>
                                    <p className={cx('view-col-subtitle')}>Shipping Details</p>
                                    <p className={cx('view-col-content')}>{ele?.status.delivery_method}</p>
                                    <p className={cx('view-col-subtitle')}>Customer info</p>
                                    <p className={cx('view-col-content')}>{`${user.first_name} ${user.last_name} `}</p>
                                    <p className={cx('view-col-content')}>
                                        {`${address.home_number} ${address.street} ${address.city} ${address.country}`}
                                    </p>
                                    <p className={cx('view-col-content')}>
                                        {`Call: ${address.phone_number}`}
                                    </p>
                                </Col>
                                <Col className={cx('view-col')} xs={12} lg={6}>
                                    <div className={cx('view-col-title')}>
                                        <h1>PAYMENT SUMMARY</h1>
                                    </div>
                                    <div className={cx('view-col-summary-content')}>
                                        <p className={cx('view-col-subtitle')}>Sub Total</p>
                                        <p className={cx('view-col-subtitle')}>${getTotal(ele)}</p>
                                    </div>
                                    <div className={cx('view-col-summary-content')}>
                                        <p className={cx('view-col-subtitle')}>Shipping fee</p>
                                        <p className={cx('view-col-subtitle')}>$21.00</p>
                                    </div>
                                    <div className={cx('view-col-summary-content')}>
                                        <p className={cx('view-col-subtitle')}>Tax</p>
                                        <p className={cx('view-col-subtitle')}>0</p>
                                    </div>
                                    <div className={cx('view-col-summary-content-total')}>
                                        <p className={cx('view-col-subtitle')}>Order total</p>
                                        <p className={cx('view-col-subtitle')}>${getTotal(ele) + 21}</p>
                                    </div>
                                </Col>
                                <Col xs={12} lg={12} className={cx('buttons')}>
                                    <Button primary to={'/'}>CONTINUE SHOPPING</Button>
                                    <Button outline onClick={() => window.print()}>PRINT THIS ORDER DETAILS</Button>
                                </Col>
                            </Row>
                        )}
                    </div>
                ))
            ) : (
                <div className={cx('nodata')}>
                    <AiOutlineInbox />
                    <h1>No data</h1>
                </div>
            )}

        </div>
    )
}

export default MyOrders;