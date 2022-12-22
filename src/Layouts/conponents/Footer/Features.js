import classNames from "classnames/bind";
import { Row, Col } from "react-bootstrap";
import { BsHeadset } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { AiTwotoneTag } from "react-icons/ai";
import { useLocation } from "react-router-dom";

import style from './Footer.module.scss';
const cx = classNames.bind(style)
function Features() {
    const { pathname } = useLocation()

    const features = [
        {
            title: "Product Support",
            desc: "Up to 3 years on-site warranty available for your peace of mind.",
            Icon: BsHeadset
        },
        {
            title: "Personal Account",
            desc: "With big discounts, free delivery and a dedicated support specialist.",
            Icon: FaRegUser
        },
        {
            title: "Amazing Savings",
            desc: "Up to 70% off new Products, you can be sure of the best price.",
            Icon: AiTwotoneTag
        }
    ]

    return (
        <div
            className={cx('features-wrapper')}
            style={{ backgroundColor: pathname !== "/" && '#F5F7FF' }}
        >
            <Row className="justify-content-center">
                {
                    features.map((feature, index) => (
                        <Col lg={3} md={4} sm={12} key={index}>
                            <div className={cx('feature')}>
                                <div className={cx('feature-head')}>
                                    <feature.Icon className={cx('icon')} />
                                </div>
                                <p className={cx('feature-name')}>{feature.title}</p>
                                <p className={cx('feature-desc')}>{feature.desc}</p>
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}

export default Features;