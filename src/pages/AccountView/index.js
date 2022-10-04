import classNames from "classnames/bind";
import { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { userPut } from "~/redux/userSlice";
import Button from "~/components/Button";
import style from './AccountView.module.scss'
const cx = classNames.bind(style)
function AccountView() {

    const { value } = useSelector(state => state.user)
    const [avata, setAvata] = useState(value.avata)
    const [userName, setUserName] = useState(value.username)
    const [password, setPassword] = useState(value.password)
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const createAd = new Date(value.createdAt).toString()
    const handleEdit = () => {
        setEdit(!edit)
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        const newUser = { ...value };
        newUser.username = userName
        newUser.password = password
        newUser.avata = avata
        dispatch(userPut(newUser))
        window.location.reload()
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col sm={12} md={4} className={cx('left')}>
                    {edit ? (
                        <div className={cx('avatas')}>
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
                    ) : (
                        <div className={cx('img')}><img src={avata} alt="alt" /></div>
                    )}

                    <h3 className={cx('title')}>Details</h3>

                    {edit ? (
                        <form onSubmit={handleSubmit}>
                            <label className={cx('detail')}>Username</label>
                            <input
                                onChange={(e) => { setUserName(e.target.value) }}
                                className={cx('input')}
                                autoFocus
                                value={userName}
                                maxLength="30"
                                type="text"
                                required
                            />
                            <br />
                            <label className={cx('detail')}>Password</label>
                            <input
                                value={password}
                                className={cx('input')}
                                onChange={e => setPassword(e.target.value)}
                                required
                                type="text"
                                pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
                            />
                            <Button outlineGray>Save</Button>
                        </form>
                    ) : (
                        <Fragment>
                            <div className={cx('detail')}>Username:
                                <span>{value.username}</span>
                            </div>
                            <div className={cx('detail')}>Email: <span>{value.email}</span></div>
                            <div className={cx('detail')}>Password:
                                <span>{value.password}</span>
                            </div>
                            <div className={cx('detail')}>Id: <span>{value.id}</span></div>
                            <div className={cx('detail')}>Create at:  <span>{createAd}</span></div>
                        </Fragment>
                    )}

                    {!edit && <Button outlineGray onClick={() => handleEdit()}>Edit</Button>}
                </Col>
            </Row>
        </Container>
    );
}

export default AccountView;