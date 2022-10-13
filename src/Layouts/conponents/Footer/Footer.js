import classNames from "classnames/bind";
import { Row, Col, Container } from "react-bootstrap";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { useMediaQuery } from 'react-responsive'
import { useState } from "react";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";

import FooterItem from "./FooterItem";
import Button from '~/components/Button'
import style from './Footer.module.scss';
const cx = classNames.bind(style)
function FooterInfors() {
    let isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const [columns, setColumns] = useState([
        {
            title: 'Information',
            items: [
                'About Us', 'About Zip', 'Privacy Policy', 'Search Terms',
                'Orders and Returns', 'Contact Us', 'Advanced Search Newsletter',
            ],
            show: !isTabletOrMobile,
            id: 1
        },
        {
            title: 'PC Parts ',
            items: [
                'Add On Cards', 'Hard Drives (Internal)', 'Graphic Cards',
                'Keyboards / Mice', 'Cases / Power Supplies / Cooling', 'RAM (Memory)'
            ],
            show: !isTabletOrMobile,
            id: 2
        },
        {
            title: 'Desktop PCs',
            items: [
                'Custom PCs', 'Servers', 'MSI All-In-One PCs', 'HP/Compaq PCs',
                'ASUS PCs', 'Tecs PCs'
            ],
            show: !isTabletOrMobile,
            id: 3
        },
        {
            title: 'Laptops',
            items: [
                'Evryday Use Notebooks', 'Servers', 'MSI Workstation Series',
                'Tablets and Pads', 'Netbooks', 'Infinity Gaming Notebooks',
            ],
            show: !isTabletOrMobile,
            id: 4
        },
        {
            title: 'Address',
            items: [
                'Address: 305 La Trobe St, Melbourne 3000', ''
                , 'Phones: (00) 1234 5678', 'We are open: Monday-Thursday: 9:00 AM - 5:30 PM',
                'Friday: 9:00 AM - 6:00 PM', 'Saturday: 11:00 AM - 5:00 PM',
                'E-mail: theanhmgt66@gmail.com'
            ],
            show: !isTabletOrMobile,
            id: 5
        }
    ])
    const handleShow = (id) => {
        if (isTabletOrMobile) {
            const newColums = [...columns]
            newColums[id - 1].show = !newColums[id - 1].show
            setColumns(newColums)
        }
    }
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
                                    <div className={cx('col-heading')} onClick={() => handleShow(column.id)}>
                                        <span>{column.title}</span>
                                        {column.show ? <RiArrowUpSLine className="d-block d-lg-none" /> : <RiArrowDownSLine className="d-block d-lg-none" />}
                                    </div>
                                    {column.show && (
                                        <ul>
                                            <FooterItem ele={column.items} />
                                        </ul>
                                    )}
                                </Col>
                            ))
                        }
                    </Row>
                    <div className={cx('foot')}>
                        <div className={cx('social-media')}>
                            <a href="https://www.facebook.com/theanhnguyenmgt/">
                                <AiFillFacebook className={cx('icon-social')} />
                            </a>
                            <a href="/">
                                <AiFillInstagram className={cx('icon-social')} />
                            </a>
                        </div>
                        <div className={cx('Copyright')}>Copyright © 2022 <a href="https://www.facebook.com/theanhnguyenmgt/">AnhNT</a> </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default FooterInfors;