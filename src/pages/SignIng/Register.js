import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Pageing from "~/components/Pageing";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify"

import { userByEmailFetch, userPost } from "~/redux/userSlice";
import FormInput from "./Input";
import Button from "~/components/Button";
import style from './Register.module.scss'
import { useState } from "react";
const cx = classNames.bind(style)
function Register() {

    const dispatch = useDispatch();

    let navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [avata, setAvata] = useState('/images/avata1.jpg')
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
            errormessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
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

    // const getUserByGmail = async (gmail) => {
    //     const responceJSON = await fetch(`https://msi-data.herokuapp.com/api/users?gmail=${gmail}`)
    //     const responce = await responceJSON.json();
    //     return responce
    // }

    const handleSumit = e => {
        e.preventDefault()
        const data = new FormData(e.target)
        const { confirmPassword, ...user } = Object.fromEntries(data.entries())
        const initialCart = {
            cartItems: [],
            cartTotalAmount: 0,
            cartTotalQuantity: 0,
        }
        user.cart = initialCart
        user.avata = avata

        dispatch(userByEmailFetch(user.email))
            .then(unwrapResult)
            .then(resp => {
                // khong tim thay tai khoan
                if (resp.length === 0) {
                    dispatch(userPost(user))
                        .then(unwrapResult)
                        .then(resp => {
                            toast.success(`Register successful`, {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            navigate('/')
                        })


                } else if (resp.length > 0) {
                    toast.warn(`Account already exists`, {
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

        // getUserByGmail(user.email).then(resp => {
        //     if (resp[0]) {
        //         alert("Account already exists ");
        //     } else {

        //         fetch('https://msi-data.herokuapp.com/api/users/', {
        //             method: 'POST',
        //             body: JSON.stringify(user),
        //             headers: {
        //                 'Content-type': 'application/json; charset=UTF-8',
        //             }
        //         })
        //         localStorage.setItem("userData", JSON.stringify(user))
        //         dispatch(update(user))
        //         navigate('/')
        //     }
        // })
    }
    return (
        <Container>
            <Pageing pages={["Register"]} />
            <h1 className={cx("heading")}>Register</h1>
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