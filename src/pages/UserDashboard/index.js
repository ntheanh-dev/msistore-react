import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
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
    let isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const { pathname } = useLocation();
    const navigate = useNavigate()
    const Data = [
        {
            title: 'Account Information',
            component: AccountInfo,
            pathname: '/dashboard'
        },
        {
            title: 'Address Book',
            component: AddressBook,
            pathname: '/dashboard/address'
        },
        {
            title: 'My Orders',
            component: MyOrders,
            pathname: '/dashboard/myorders'
        },
    ]
    const [currentData, setCurrentData] = useState(Data.find(ele => ele.pathname === pathname))
    const RightComponent = currentData.component
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'My Dashboard'
        // history.push(currentData.pathname)
        navigate(currentData.pathname)
    }, [currentData]);

    return (
        <Container className={cx('wrapper')}>
            {!isTabletOrMobile && <Pageing pages={[{ title: 'My Dashboard', path: 'dashboard' }]} />}
            <h1 className={cx('title')}>My Dashboard</h1>
            {!isTabletOrMobile ? (
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
            ) : (
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
                        <RightComponent />
                    </Col>
                    <Col lg={9} sm={12}>
                        <div className={cx('background')} >
                            <h1>Compare Products</h1>
                            <p>You have no items to compare</p>
                        </div>
                        <div className={cx('background')} >
                            <h1>My Wish List</h1>
                            <p>You have no items in your wish list</p>
                        </div>
                    </Col>
                </Row>
            )}

        </Container>
    );
}

export default UserDashboard;