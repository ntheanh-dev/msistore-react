import classNames from "classnames/bind";
import { Row, Col, Container } from "react-bootstrap";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useState, useEffect, useCallback } from "react";
import { useMediaQuery } from 'react-responsive'

import FooterItem from "./FooterItem";
import Button from '../../../components/Button'
import style from './Footer.module.scss';
const cx = classNames.bind(style)
function FooterInfors() {

    let isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

    let columns = [
        {
            title: 'Information',
            items: [
                'About Us', 'About Zip', 'Privacy Policy', 'Search Terms',
                'Orders and Returns', 'Contact Us', 'Advanced Search Newsletter',
            ],
            isShow: !isTabletOrMobile
        },
        {
            title: 'PC Parts ',
            items: [
                'Add On Cards', 'Hard Drives (Internal)', 'Graphic Cards',
                'Keyboards / Mice', 'Cases / Power Supplies / Cooling', 'RAM (Memory)'
            ],
            isShow: !isTabletOrMobile
        },
        {
            title: 'Desktop PCs',
            items: [
                'Custom PCs', 'Servers', 'MSI All-In-One PCs', 'HP/Compaq PCs',
                'ASUS PCs', 'Tecs PCs'
            ],
            isShow: !isTabletOrMobile
        },
        {
            title: 'Laptops',
            items: [
                'Evryday Use Notebooks', 'Servers', 'MSI Workstation Series',
                'Tablets and Pads', 'Netbooks', 'Infinity Gaming Notebooks',
            ],
            isShow: !isTabletOrMobile
        },
        {
            title: 'Address',
            items: [
                'Address: 305 La Trobe St, Melbourne 3000', ''
                , 'Phones: (00) 1234 5678', 'We are open: Monday-Thursday: 9:00 AM - 5:30 PM',
                'Friday: 9:00 AM - 6:00 PM', 'Saturday: 11:00 AM - 5:00 PM',
                'E-mail: theanhmgt66@gmail.com'
            ],
            isShow: !isTabletOrMobile
        },
    ]

    console.log(columns)

    const handleShow = (index) => {
        isTabletOrMobile = !isTabletOrMobile
        columns[index].isShow = !isTabletOrMobile;
        setIsShow(!isTabletOrMobile)
    }

    useEffect(() => {

    }, [isShow])

    const [isShow, setIsShow] = useState(false)

    return (
        <div className={cx('footer-wrapper')}>
            <Container>
                <div className={cx('head')}>
                    <Row>
                        <Col md={6} sm={12}>
                            <div className={cx('left')}>
                                <p>Sign Up To Our Newsletter.</p>
                                <p>Be the first to hear about the latest offers.</p>
                            </div>
                        </Col>
                        <Col md={6} sm={12}>
                            <div className={cx('right')}>
                                <input placeholder="Your Email" />
                                <Button primary >Subcribe</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={cx('body')}>
                    <Row>
                        {
                            columns.map((column, index) => (
                                <Col lg={2} md={12} key={index}>
                                    <div className={cx('col-heading')} onClick={() => handleShow(index)}>
                                        <span>{column.title}</span>
                                        <AiOutlineArrowDown className="d-block d-lg-none" />
                                    </div>
                                    <ul>
                                        {<FooterItem ele={column.items} isShow={column.isShow} />}
                                    </ul>
                                </Col>
                            ))
                        }
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default FooterInfors;