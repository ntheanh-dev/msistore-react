import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Pageing from "~/components/Pageing";

import Button from "~/components/Button";
import style from './Register.module.scss'
import { useState, useRef } from "react";
const cx = classNames.bind(style)
function Register() {

    const [name, setName] = useState('')
    const [gmail, setGmail] = useState('')
    const [password, setPassword] = useState('')

    const nameRef = useRef()
    const gmailRef = useRef()
    const passwordRef = useRef()
    return (
        <Container>
            <Pageing pages={["Register"]} />
            <h1 className={cx("heading")}>Register</h1>
            <Row className="justify-content-around">
                <Col md={5} sm={12} className={cx("box")}>
                    <h1 className={cx("head")}>Registered Customers</h1>
                    <p className={cx("desc")}>If you have an account, sign in with your email address.</p>
                    <form>
                        <label for="name">Name</label> <br />
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            ref={nameRef}
                            className={cx('input')}
                            type="text"
                            placeholder="Your Name"
                            id="name"
                        />

                        <label for="email">Email</label> <br />
                        <input
                            value={gmail}
                            onChange={e => setGmail(e.target.value)}
                            ref={gmailRef}
                            className={cx('input')}
                            type="gmail"
                            placeholder="Your Email"
                            id="email"
                        />

                        <br /> <label for="password">Password</label> <br />
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            ref={passwordRef}
                            className={cx('input')}
                            type="password"
                            placeholder="Password"
                            id="password"
                        />
                    </form>
                    <div>
                        <Button primary>Create</Button>
                        <Link to="/login" className={cx("left-foot")}>Already have an account?</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;