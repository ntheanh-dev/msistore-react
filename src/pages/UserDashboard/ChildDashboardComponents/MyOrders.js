import classNames from 'classnames/bind';
import style from './ChildDashboardComponents.mobule.scss';
import { useSelector } from 'react-redux';
import { AiOutlineInbox } from 'react-icons/ai';
import { Col, Modal, Row } from 'react-bootstrap';
import { IoMdTime } from 'react-icons/io';
import { useMediaQuery } from 'react-responsive';
import Button from '~/components/Button';
import { Button as ButtonBootstrap } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { authAPI, endpoints, endpointsV2 } from '~/configs/API';
import cookie from 'react-cookies';
import Rating from 'react-rating-stars-component';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '~/components/LoadingSpinner';
const cx = classNames.bind(style);
function MyOrders() {
    let isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [receipts, setReceipts] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const { address } = useSelector((state) => state.userAddress);
    const [showDetail, setShowDetail] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [feedbackModalShow, setFeedbackModalShow] = useState(false);
    const [modelFeedbackContent, setModelFeedbackContent] = useState({});
    const [feedbackPayload, setFeedbackPayload] = useState({ orderId: 0, productId: 0 });

    useEffect(() => {
        const getReceipt = async () => {
            try {
                const res = await authAPI().get(endpointsV2['order-product'], {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setReceipts(res.data.resutls);
            } catch (e) {
                console.log(e);
            }
        };
        getReceipt();
    }, []);
    const getTotal = (receipt) => {
        let total = 0;
        receipt?.orderitems.map((ele) => (total += Number(ele.quantity) * ele.unitPrice));
        return total;
    };

    const handleShowDetail = (id) => {
        if (showDetail.find((item) => item === id)) {
            const newArr = showDetail.filter((item) => item !== id);
            setShowDetail(newArr);
        } else {
            setShowDetail([...showDetail, id]);
        }
    };

    const getOrderItemByOrderId = (id) => {
        if (receipts.length == 0) {
            return null;
        }
        const rec = receipts.find((e) => e.id == id);
        return rec.orderitems;
    };

    const viewFeedback = (feedback) => {
        setModelFeedbackContent(feedback);
        setModalShow(true);
    };

    const feedback = (orderId, productId) => {
        setFeedbackPayload((c) => {
            c.orderId = orderId;
            c.productId = productId;
            return c;
        });
        setFeedbackModalShow(true);
    };

    const addFeedback = (feedback) => {
        // Theem feedback vao recept => update ui => Chuyển feedback sang view feedback mà ko cần load lại trang
        // const newReceipt = receipts.map(ele => {
        //     if(ele.id === feedback?.orderId) {
        //         ele.orderitems = ele.orderitems.map(o => {
        //             if(o.prodcut.id === feedback.productId) {
        //                 o.prodcut.feedbacks.push(feedback)
        //             }
        //             return o
        //         })
        //     }
        //     return ele;
        // })
        // setReceipts(newReceipt)
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>My orders</div>
            {receipts.length > 0 ? (
                receipts.map((ele, index) => (
                    <div key={index}>
                        <div className={cx('order')}>
                            <Row>
                                <Col lg={12} xs={6}>
                                    <Row className={cx('order-row-header') && isTabletOrMobile && 'flex-column'}>
                                        <Col lg={3}>Order: {ele?.uuid}</Col>
                                        <Col lg={2}>Order status</Col>
                                        <Col lg={3}>Delivery Option</Col>
                                        <Col lg={2}>Payment</Col>
                                        <Col lg={2}>Total: ${getTotal(ele)}</Col>
                                    </Row>
                                </Col>
                                <Col lg={12} xs={6}>
                                    <Row className={cx('order-row-body') && isTabletOrMobile && 'flex-column'}>
                                        <Col lg={3}>Placed on {ele?.createdAt}</Col>
                                        <Col lg={2} className={cx('order-row-body-status', 'shipping-status')}>
                                            <IoMdTime />
                                            <p>{ele?.statusorders[0].deliveryStage}</p>
                                        </Col>
                                        <Col lg={3}>{'Stardard Delivery'}</Col>
                                        <Col lg={2}>{'Pay on delivery'}</Col>
                                        <Col
                                            className={cx('order-row-body-view')}
                                            lg={2}
                                            onClick={() => handleShowDetail(ele.id)}
                                        >
                                            {showDetail.find((item) => item === ele.id) ? 'Close' : 'View Detail'}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        {showDetail.find((item) => item === ele.id) && (
                            <Row className={cx('view')}>
                                <Col className={cx('view-col')} xs={12} md={8}>
                                    <div className={cx('view-col-title')}>
                                        <h1>ORDER INFORMATION</h1>
                                    </div>
                                    <p className={cx('view-col-subtitle')}>Shipping Details</p>
                                    <p className={cx('view-col-content')}>{ele?.statusorders[0].deliveryMethod}</p>
                                    <p className={cx('view-col-subtitle')}>Customer info</p>
                                    <p className={cx('view-col-content')}>{`${user.username} `}</p>
                                    <p className={cx('view-col-subtitle')}>Products</p>
                                    <div className="grid grid-cols-5 gap-4 mt-2">
                                        <h4>Image</h4>
                                        <h4>Name</h4>
                                        <h4>Quantity</h4>
                                        <h4>Total price</h4>
                                        <h4></h4>
                                    </div>
                                    {getOrderItemByOrderId(ele.id).map((prod) => {
                                        var isFeedbackBefore = prod.prodcut.feedbacks.find(
                                            (feed) => feed.orderId == prod.orderId && feed.productId == prod.prodcutId,
                                        );
                                        return (
                                            <div key={prod.id} className="grid grid-cols-5 gap-4">
                                                <div className="w-20 h-20 flex justify-center items-center">
                                                    <img src={prod?.prodcut.images[0].file} />
                                                </div>
                                                <div>{prod.prodcut.name}</div>
                                                <div>{prod.quantity}</div>
                                                <div>{prod.quantity * prod.unitPrice} $</div>
                                                {isFeedbackBefore ? (
                                                    <span
                                                        onClick={() => viewFeedback(isFeedbackBefore)}
                                                        className={cx('order-row-body-view')}
                                                    >
                                                        View Feedback
                                                    </span>
                                                ) : (
                                                    <span
                                                        onClick={() => feedback(prod.orderId, prod.prodcutId)}
                                                        className={cx('order-row-body-view')}
                                                    >
                                                        Feedback
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </Col>
                                <Col className={cx('view-col')} xs={12} md={4}>
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
                                    <Button primary to={'/'}>
                                        CONTINUE SHOPPING
                                    </Button>
                                    <Button outline onClick={() => window.print()}>
                                        PRINT THIS ORDER DETAILS
                                    </Button>
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
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={modelFeedbackContent}
            />
            <FeedbackModal
                show={feedbackModalShow}
                onHide={() => setFeedbackModalShow(false)}
                feedbackpayload={feedbackPayload}
                addfeedback={addFeedback}
            />
        </div>
    );
}

function MyVerticallyCenteredModal(props) {
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Your feedback</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Rating value={props?.data?.rating} size={16} edit={false} activeColor="yellow" />
                <h5>{props.data.createdAt}</h5>
                <p>{props.data.comment}</p>
            </Modal.Body>
            <Modal.Footer>
                <ButtonBootstrap onClick={props.onHide}>Close</ButtonBootstrap>
            </Modal.Footer>
        </Modal>
    );
}

function FeedbackModal(props) {
    const [isLoading, setIsLoading] = useState(false);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const sendFeedback = async () => {
        setIsLoading(true);
        const data = JSON.stringify({
            orderId: props.feedbackpayload.orderId,
            productId: props.feedbackpayload.productId,
            rating: rating,
            comment: comment,
        });
        try {
            const res = await authAPI().post(endpointsV2['feedback'], data, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            props.addfeedback(res.data);
            setComment('');
            setRating(0);
            toast.success(`Feedback successfully`, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            props.onHide();
        } catch (e) {
            toast.warning(`You have feedbacked this product before`, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <LoadingSpinner />}
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2 className="text-2xl font-semibold mb-4">Leave a rating</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-4">
                        <label htmlFor="rating" className="block text-lg font-medium text-gray-700 mb-1">
                            Your product rating
                        </label>
                        <Rating
                            id="rating"
                            count={5}
                            size={50}
                            value={rating}
                            onChange={handleRatingChange}
                            activeColor="yellow"
                        />
                    </div>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="comment" className="block text-lg font-medium text-gray-700 mb-1">
                                Additional Feedback
                            </label>
                            <textarea
                                id="comment"
                                name="comment"
                                rows="3"
                                className="w-full border rounded-md px-3 py-2"
                                value={comment}
                                onChange={handleCommentChange}
                            ></textarea>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonBootstrap onClick={props.onHide}>Close</ButtonBootstrap>
                    <ButtonBootstrap variant="primary" onClick={sendFeedback}>
                        Save
                    </ButtonBootstrap>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MyOrders;
