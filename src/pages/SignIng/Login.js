import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify"
import { useState, useEffect } from "react";

// import { collection, addDoc, query, where, getDocs, getDoc, doc, onSnapshot } from "firebase/firestore";
// import { setUserData } from "~/components/firebase/config";
// import { setLogin } from "~/redux/authSlice";
// import { auth, db } from "~/components/firebase/config";
import { userFetch } from "~/redux/userSlice";
import FormInput from "~/components/Input";
import Pageing from "~/components/Pageing";
import Button from "~/components/Button";
import style from './Register.module.scss'
const cx = classNames.bind(style)
function Login() {
    const { pathname } = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    // const dispatchData = (value) => dispatch(setLogin(value));
    // const handleGoogleLogin = async () => {
    //     const to = "/home"
    //     try {
    //         setUserData(dispatchData, to, "googleLogin");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const handleGoogleLoout = () => {
    //     auth.signOut()
    //     console.log("log out successfull")
    // }

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Your email",
            lable: "Email",
            errormessage: "It should be a valid email address",
            required: true,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Your password",
            lable: "Password",
            errormessage: "Password should be 8-20 characters and include at least 1 number",
            // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        }
    ]

    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSumit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const { email, password } = Object.fromEntries(data.entries())

        const userData = {
            email: email,
            password: password
        }

        dispatch(userFetch(userData))
            .then(unwrapResult)
            .then(resp => {
                if (resp[0]) {
                    toast.success(`Login successful`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    navigate('/')
                } else {
                    toast.warn(`Account not found`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })

    }
    return (
        <Container className={cx("wrapper")}>
            <Pageing pages={["Login"]} />
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
                </Col>
                <Col md={5} sm={12} className={cx("box")}>
                    <h1 className={cx("head")}>New Customer?</h1>
                    <p className={cx("desc")}>If you have an account, sign in with your email address.</p>
                    <ul className={cx("desc-list")}>
                        <li>Check out faster </li>
                        <li>Keep more than one address</li>
                        <li>Track orders and more</li>
                    </ul>
                    <Button to={"/register"} primary>Create An Account</Button>
                    {/* <Button onClick={handleGoogleLogin} primary>Login Google</Button>
                    <Button onClick={handleGoogleLoout} primary>Logout Google</Button>
                    <Button onClick={handleUPdate} outlineGray>Update cart</Button> */}
                </Col>
            </Row>
        </Container>
    );
}

export default Login;