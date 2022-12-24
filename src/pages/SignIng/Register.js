import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"
import { unwrapResult } from "@reduxjs/toolkit";

import LoadingSpinner from "~/components/LoadingSpinner";
import Pageing from "~/components/Pageing";
import { registerFirebase } from "~/redux/authSlice";
import FormInput from "~/components/Input";
import Button from "~/components/Button";
import style from './Register.module.scss'
import { useState } from "react";
const cx = classNames.bind(style)
function Register() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { status } = useSelector(state => state.auth)
    const [avata, setAvata] = useState('/images/avata1.jpg')
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            errormessage: "Username should be 3-16 characters and shouldn't include any special character!",
            label: "Username",
            pattern: "^[A-Za-z0-9]{3,16}$",
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
            name: "password",
            type: "password",
            placeholder: "Your password",
            label: "Password",
            errormessage: "Password should be 8-20 characters and include at least 1 number",
            // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm password",
            label: "Confirm password",
            errormessage: "Passwords don't match!",
            pattern: values.password,
            required: true,
        }
    ]

    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const { confirmPassword, ...user } = Object.fromEntries(data.entries())
        const newUserFirebase = {
            displayName: user.username,
            email: user.email,
            uid: user.email,
            password: user.password,
            photoURL: avata,
            cart: {
                cartItems: [],
                cartTotalAmount: 0,
                cartTotalQuantity: 0,
            }
        }
        dispatch(registerFirebase(newUserFirebase))
            .then(unwrapResult)
            .then(resp => {
                if (resp === -1) {
                    toast.warn(`Account already exists`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.success(`Successful registration, redirecting to homepage`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    // login
                    setTimeout(() => {
                        navigate('/')
                    }, 2700)
                }
            })
    }
    return (
        <Container className={cx("wrapper")}>
            {status === 'loading' && <LoadingSpinner />}
            <Pageing pages={[{ title: 'Register', path: 'register' }]} />
            <h1 className={cx("heading")}>Register</h1>
            <Row className="justify-content-around">
                <Col md={7} sm={12} className={cx("box")}>
                    <h1 className={cx("head")}>Registered Customers</h1>
                    <p className={cx("desc")}>If you have an account, sign in with your email address.</p>
                    <form onSubmit={handleSubmit}>
                        {inputs.map((input) => (
                            <FormInput
                                key={input.id}
                                {...input}
                                value={values[input.name]}
                                onChange={onChange}
                            />
                        ))}
                        <h3 className={cx("avata-heading")}>Avatas</h3>
                        <div className={cx("avatas")}>
                            <div
                                className={cx(avata === '/images/avata1.jpg' ? 'avataActive' : ' ')}
                                onClick={() => setAvata('/images/avata1.jpg')}
                            >
                                <img src={'/images/avata1.jpg'} alt="alt" />
                            </div>
                            <div
                                className={cx(avata === '/images/avata2.jpg' ? 'avataActive' : ' ')}
                                onClick={() => setAvata('/images/avata2.jpg')}
                            >
                                <img src={'/images/avata2.jpg'} alt="alt" />
                            </div>
                            <div
                                className={cx(avata === '/images/avata3.jpg' ? 'avataActive' : ' ')}
                                onClick={() => setAvata('/images/avata3.jpg')}
                            >
                                <img src={'/images/avata3.jpg'} alt="alt" />
                            </div>
                        </div>
                        <div>
                            <Button primary>Create</Button>
                            <Link to="/login" className={cx("left-foot")}>Already have an account?</Link>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;