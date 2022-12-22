import classNames from "classnames/bind";
import style from "./ChildDashboardComponents.mobule.scss"
import { Row, Col } from "react-bootstrap";

const cx = classNames.bind(style)
function AddressBook() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Address Book</div>
            <Row>
                <Col lg={4}>
                    <div className={cx('sub-title')}>Default Billing Address</div>
                    <div className={cx('body')}>
                        <div className={cx('body')}>
                            <div className={cx('content')}>You have not set a default billing address.</div>
                        </div>
                    </div>
                    <div className={cx('change-info')}>
                        <span className={cx('disible-edit')}>Edit Address</span>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className={cx('sub-title')}>Default Shipping Address</div>
                    <div className={cx('body')}><div className={cx('content')}>You have not set a default shipping address.</div></div>
                    <div className={cx('change-info')}>
                        <span className={cx('disible-edit')}>Edit Address</span>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default AddressBook;