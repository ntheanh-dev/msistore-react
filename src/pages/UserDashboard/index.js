import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

import AccountInfo from "./ChildDashboardComponents/AccountInfo";
import AddressBook from "./ChildDashboardComponents/AddressBook";
import MyOrders from "./ChildDashboardComponents/MyOrders";
import Pageing from "~/components/Pageing";
import style from "./UseDashboard.module.scss"

const cx = classNames.bind(style)

function UserDashboard() {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' })
    const { pathname } = useLocation();
    const Data = [
        {
            title: 'Account Information',
            component: AccountInfo
        },
        {
            title: 'Address Book',
            component: AddressBook
        },
        {
            title: 'My Orders',
            component: MyOrders
        },
    ]
    const [currentData, setCurrentData] = useState(Data[0])
    const RightComponent = currentData.component
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'My Dashboard'
    }, [pathname]);

    return (
        <Container className={cx('wrapper')}>
            {!isMobile && <Pageing pages={[{ title: 'My Dashboard', path: 'dashboard' }]} />}
            <h1 className={cx('title')}>My Dashboard</h1>
            <Row>
                <Col lg={3} sm={12}>
                    <div className={cx('wrapper-lef-col')}>
                        {Data.map((ele, ind) => (
                            <div
                                key={ind}
                                className={cx(ele.title === currentData.title && 'data-active', 'option')}
                                onClick={() => setCurrentData(Data[ind])}
                            >
                                {ele.title}
                            </div>
                        ))}
                    </div>
                    <div className={cx('background')} >
                        <h1>Compare Products</h1>
                        <p>You have no items to compare</p>
                    </div>
                    <div className={cx('background')} >
                        <h1>My Wish List</h1>
                        <p>You have no items in your wish list</p>
                    </div>
                </Col>
                <Col lg={9} sm={12}>
                    <RightComponent />
                </Col>
            </Row>
        </Container>
    );
}

export default UserDashboard;