import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"
import { unwrapResult } from "@reduxjs/toolkit";

import LoadingSpinner from "~/components/LoadingSpinner";
import Pageing from "~/components/Pageing";
import { register, registerFirebase } from "~/redux/authSlice";
import FormInput from "~/components/Input";
import Button from "~/components/Button";
import style from './Register.module.scss'
import { useState } from "react";
const cx = classNames.bind(style)
function Register() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { status } = useSelector(state => state.auth)
    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: ''
    })
    const inputs = [
        {
            id: 1,
            name: "first_name",
            type: "text",
            placeholder: "First name",
            errormessage: "First name should be 3-30 characters",
            label: "First name",
            pattern: "^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$",
            required: true,
        },
        {
            id: 2,
            name: "last_name",
            type: "text",
            placeholder: "Last name",
            errormessage: "Last name should be 3-30 characters",
            label: "Last name",
            pattern: "^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{2,}$",
            required: true,
        },
        {
            id: 3,
            name: "username",
            type: "text",
            placeholder: "Username",
            errormessage: "Username should be 3-16 characters and shouldn't include any special character!",
            label: "Username",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 4,
            name: "email",
            type: "email",
            placeholder: "Your email",
            label: "Email",
            errormessage: "It should be a valid email address",
            required: true,
        },
        {
            id: 5,
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
            id: 6,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm password",
            label: "Confirm password",
            errormessage: "Passwords don't match!",
            pattern: values.password,
            required: true,
        },
        {
            id: 7,
            name: "avatar",
            type: "file",
            label: "Select a image file",
            errormessage: "Selected Wrong File!",
            require: false
        }
    ]

    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const fileValidate = () => {
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (allowedExtensions.exec(values.avatar)) {
            return true;
        } else {
            return false
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (fileValidate()) {
            const data = new FormData(e.target)
            const { confirmPassword, ...user } = Object.fromEntries(data.entries())
            dispatch(register(user))
                .then(unwrapResult)
                .then(resp => {
                    toast.success(`Register successfully, redirecting to homepage`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(() => {
                        navigate('/')
                    }, 2700)
                }).catch(err => {
                    for (const key in err) {
                        if (key === 'username') {
                            toast.warn(`Account already exists`, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            break
                        } else {
                            toast.warn(`Check the encoding type on the form`, {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            break
                        }
                    }
                })
        } else {
            toast.warn(`Invalid file type`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }
    return (
        <Container className={cx("wrapper")}>
            {status === 'pending' && <LoadingSpinner />}
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