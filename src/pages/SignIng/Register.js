import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Pageing from "~/components/Pageing";
import { useNavigate } from 'react-router-dom';

import FormInput from "./Input";
import Button from "~/components/Button";
import style from './Register.module.scss'
import { useState } from "react";
const cx = classNames.bind(style)
function Register() {

    let navigate = useNavigate();
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

    const getUserByGmail = async (gmail) => {
        const responceJSON = await fetch(`http://localhost:3000/api/users?gmail=${gmail}`)
        const responce = await responceJSON.json();

        return responce
    }

    const handleSumit = e => {
        e.preventDefault()
        const data = new FormData(e.target)
        const { confirmPassword, ...user } = Object.fromEntries(data.entries())
        user.products = []
        getUserByGmail(user.email).then(resp => {
            if (resp[0]) {
                alert("Account already exists ");
            } else {

                fetch('http://localhost:3000/api/users/', {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                })

                navigate('/login')
            }
        })
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