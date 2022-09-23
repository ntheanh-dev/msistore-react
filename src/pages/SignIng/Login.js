import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";

import Pageing from "~/components/Pageing";
import Button from "~/components/Button";
import style from './Register.module.scss'
const cx = classNames.bind(style)
function Login() {
    return (
        <Container>
            <Pageing pages={["Login"]} />
            <h1 className={cx("heading")}>Login</h1>
            <Row className="justify-content-around">
                <Col md={5} sm={12} className={cx("box")}>
                    <h1 className={cx("head")}>Registered Customers</h1>
                    <p className={cx("desc")}>If you have an account, sign in with your email address.</p>
                    <form>
                        <label for="email">Email</label> <br />
                        <input className={cx('input')} type="text" placeholder="Your Email" id="email" />
                        <br /> <label for="password">Password</label> <br />
                        <input className={cx('input')} type="text" placeholder="Your Email" id="password" />
                    </form>
                    <div>
                        <Button primary>Sign In</Button>
                        <p className={cx("left-foot")}>Forgot Your Password?</p>
                    </div>
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
                </Col>
            </Row>
        </Container>
    );
}

export default Login;