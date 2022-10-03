import classNames from "classnames/bind";
import { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import Button from "~/components/Button";
import style from './AccountView.module.scss'
const cx = classNames.bind(style)
function AccountView() {

    const { value } = useSelector(state => state.user)
    const [avata, setAvata] = useState(value.avata)
    const [userName, setUserName] = useState(value.username)
    const [edit, setEdit] = useState(false)
    const handleEdit = () => {
        setEdit(!edit)
    }
    console.log(value)

    return (
        <Container>
            <Row>
                <Col sm={12} md={4} className={cx('left')}>
                    <div className={cx('img')}><img src={avata} alt="alt" /></div>
                    <div className={cx('title')}>Details</div>
                    <div className={cx('detail')}>Username:
                        {edit ? (
                            <input
                                onChange={() => { }}
                                autoFocus
                                value={userName}
                            />
                        ) : (
                            <span>{value.username}</span>
                        )}
                    </div>
                    <div className={cx('detail')}>Email: <span>{value.email}</span></div>
                    <div className={cx('detail')}>Password: <span>{value.password}</span></div>
                    <div className={cx('detail')}>Id: <span>{value.id}</span></div>
                    <div className={cx('detail')}>Create at:  <span>{value.createdAt}</span></div>
                    <Button onClick={() => handleEdit()} primary>Edit</Button>
                </Col>
                <Col sm={12} md={8} className={cx('right')}>

                </Col>
            </Row>
        </Container>
    );
}

export default AccountView;