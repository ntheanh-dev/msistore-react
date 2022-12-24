import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"
import { useState, useEffect } from "react";
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import LoadingSpinner from "~/components/LoadingSpinner";
import { loginWithFirebase } from "~/components/firebase/config";
import { setUserInfo } from "~/redux/authSlice";
import { setUserCart } from "~/redux/userCartSlice";
import { getUserByEmail } from "~/redux/authSlice";
import FormInput from "~/components/Input";
import Pageing from "~/components/Pageing";
import Button from "~/components/Button";
import style from './Register.module.scss'
const cx = classNames.bind(style)
function Login() {
    const { pathname } = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { status } = useSelector(state => state.auth)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const dispatchUserInfo = (value) => dispatch(setUserInfo(value));
    const dispatchUserCart = (value) => dispatch(setUserCart(value));
    const toFrom = () => navigate("/");
    const handleLoginwithMedia = async (type) => {
        try {
            loginWithFirebase(dispatchUserInfo, dispatchUserCart, toFrom, type);
        } catch (error) {
            console.log(error);
        }
    }

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Your email",
            label: "Email",
            errormessage: "It should be a valid email address",
            required: true,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Your password",
            label: "Password",
            errormessage: "Password should be 8-20 characters and include at least 1 number",
            // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        }
    ]

    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSumit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const { email, password } = Object.fromEntries(data.entries())

        const user = {
            uid: email,
            password: password
        }

        dispatch(getUserByEmail(user))
            .then(unwrapResult)
            .then(resp => {
                if (resp === -1) {
                    toast.warn(`Account not found`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    dispatchUserCart({ ...resp.cart })
                    navigate('/')
                }
            })
    }
    return (
        <Container className={cx("wrapper")}>
            {status === 'loading' && <LoadingSpinner />}
            <Pageing pages={[{ title: 'Login', path: 'login' }]} />
            <h1 className={cx("heading")}>Login</h1>
            <Row className="justify-content-around">
                <Col md={5} sm={12} className={cx("box")}>
                    <h1 className={cx("head")}>Registered Customers</h1>
                    <p className={cx("desc")}>If you have an account, sign in with your email address.</p>
                    <form onSubmit={handleSumit}>
                        {inputs.map((input) => (
                            <FormInput
                                key={input.id}
                                {...input}
                                value={values[input.name]}
                                onChange={onChange}
                            />
                        ))}
                        <div>
                            <Button primary>Sign In</Button>
                            <p className={cx("left-foot")}>Forgot Your Password?</p>
                        </div>
                    </form>
                    <div className={cx("orther-login")}>
                        <div className={cx("head-orther-login")}>
                            <div className={cx("line-through")}></div>
                            <div>Or login with</div>
                            <div className={cx("line-through")}></div>
                        </div>
                        <div className={cx("btns")}>
                            <Button onClick={() => handleLoginwithMedia('facebookLogin')} primary lefticon={<FaFacebookF />}>FACEBOOK</Button>
                            <Button onClick={() => handleLoginwithMedia('googleLogin')} primary lefticon={<FaGooglePlusG />}>GOOGLE</Button>
                        </div>
                    </div>
                </Col>
                <Col md={5} sm={12} className={cx("box")}>
                    <h1 className={cx("head")}>New Customer?</h1>
                    <p className={cx("desc")}>Creating an account has many benefits:</p>
                    <ul className={cx("desc-list")}>
                        <li>Check out faster </li>
                        <li>Keep more than one address</li>
                        <li>Track orders and more</li>
                    </ul>
                    <Button to={"/register"} primary>Create An Account</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;