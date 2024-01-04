import React, { useRef } from 'react'
import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";


import FormInput from "~/components/Input";
import style from './ContactUs.module.scss'
import Pageing from '~/components/Pageing';
import { useState, useEffect } from 'react';
import Button from '~/components/Button';
import { INFO } from '~/configs/LocalAddress';
import { Toast } from '~/configs/Toast';
const cx = classNames.bind(style)
export default function ContactUs() {
    const [values, setValues] = useState({
        your_name: '',
        email: '',
        phone: '',
        content: 'Jot us a note and we’ll get back to you as quickly as possible'
    })

    const inputs = [
        {
            id: 1,
            name: "your_name",
            type: "text",
            placeholder: "Your name",
            errormessage: "Your name should be 3-30 characters",
            label: "Your name",
            pattern: "([a-zA-Z]{3,30}\s*)+",
            required: true,
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Your email",
            label: "Email",
            errormessage: "It should be a valid email address",
            required: true,
        },
        {
            id: 3,
            name: "phone",
            type: "text",
            placeholder: "Your phone number",
            label: "Your phone",
            pattern: "^(0[0-9]{9,10})$",
            errormessage: "It should be a valid VietName phone number",
            required: true,
        },
        {
            id: 4,
            name: "content",
            type: "textarea",
            label: "What's on your mind?",
            required: true,
        },
    ]

    const SHOP_INFO = [
        {
            ...INFO.address,
            component: HiOutlineLocationMarker
        },
        {
            ...INFO.phone,
            component: FiPhoneCall
        },
        {
            ...INFO.active_hour,
            component: AiOutlineClockCircle
        },
        {
            ...INFO.email,
            component: MdAlternateEmail
        }
    ]

    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const onClick = e => {
        if (e.target.defaultValue === values.content) {
            e.target.value = ""
        }
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const d = Object.fromEntries(data.entries())
        console.log(d)
        Toast('success', 'Thanks for your feedback.')
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        // document.title = `${product[0].name}`
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container className={cx('wrapper')}>
            <Pageing pages={[{ title: 'Contact Us' }]} />
            <Row>
                <Col className={cx('left')} lg={8} sm={12}>
                    <h1>Contact Us</h1>
                    <p>We love hearing from you, our Shop customers.</p>
                    <p>Please contact us and we will make sure to get back to you as soon as we possibly can.</p>
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col lg={6} sm={12}>
                                <FormInput
                                    {...inputs[0]}
                                    value={values[inputs[0].name]}
                                    onChange={onChange}
                                />
                            </Col>
                            <Col lg={6} sm={12}>
                                <FormInput
                                    {...inputs[1]}
                                    value={values[inputs[1].name]}
                                    onChange={onChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} sm={12}>
                                <FormInput
                                    {...inputs[2]}
                                    value={values[inputs[2].name]}
                                    onChange={onChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <FormInput
                                    {...inputs[3]}
                                    value={values[inputs[3].name]}
                                    onChange={onChange}
                                    onClick={onClick}
                                />
                            </Col>
                        </Row>
                        <Button type="submit" primary>Submit</Button>
                    </form>
                </Col>
                <Col className={cx('right')} lg={4} sm={12} >
                    {SHOP_INFO.map((ele, index) =>
                        <Row key={index}>
                            <Col sm={1}>
                                <ele.component />
                            </Col>
                            <Col sm={11}>
                                <span className={cx('title')}>{ele.title}</span>
                                <br />
                                {ele.content.map((e, i) =>
                                    <span className={cx('content')} key={i}>{e}</span>
                                )}
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
        </Container>
    )
}
