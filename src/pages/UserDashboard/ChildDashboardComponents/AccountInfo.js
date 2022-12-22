import classNames from "classnames/bind";
import style from "./ChildDashboardComponents.mobule.scss"
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { userPut } from "~/redux/userSlice";
import FormInput from "~/components/Input";
import { useState } from "react";
const cx = classNames.bind(style)
function AccountInfo() {
    const dispatch = useDispatch()
    const { value } = useSelector(state => state.user)
    const [changeInfo, setChangeInfo] = useState({
        changeUsername: false,
        changePassword: false,
        changeAvata: false
    })
    const [values, setValues] = useState({
        username: value.username,
        password: value.password,
        avata: value.avata
    })
    const handleChangeInfo = (type) => {
        if (type === 'changeUsername' && changeInfo.changeUsername === false) {
            setChangeInfo({ changeUsername: true, changePassword: false, changeAvata: false })
        }
        else if (type === 'changePassword' && changeInfo.changePassword === false) {
            setChangeInfo({ changeUsername: false, changePassword: true, changeAvata: false })
        }
        else if (type === 'changeAvata' && changeInfo.changeAvata === false) {
            setChangeInfo({ changeUsername: false, changePassword: false, changeAvata: true })
        }

        let findAnyFiledChanged = false
        for (let key in changeInfo) {
            if (key === type && changeInfo[key] === true) {
                findAnyFiledChanged = true
            }
        }
        if (findAnyFiledChanged) {
            const newUser = { ...value, ...values };
            dispatch(userPut(newUser))
            setChangeInfo({ changeUsername: false, changePassword: false, changeAvata: false })
        }
    }
    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            label: false,
            errormessage: "Username should be 3-16 characters and shouldn't include any special character!",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Your password",
            label: false,
            errormessage: "Password should be 8-20 characters and include at least 1 number",
            // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        }
    ]
    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Account Information</div>
            <Row>
                <Col lg={4}>
                    <div className={cx('sub-title')}>Contact Information</div>
                    <div className={cx('body')}>
                        {changeInfo.changeUsername ? (
                            <form>
                                <FormInput
                                    {...inputs[0]}
                                    value={values[inputs[0].name]}
                                    onChange={onChange}
                                />
                            </form>
                        ) : (
                            <div className={cx('content')}>{value.username}</div>
                        )}
                        {changeInfo.changePassword ? (
                            <form>
                                <FormInput
                                    {...inputs[1]}
                                    value={values[inputs[1].name]}
                                    onChange={onChange}
                                />
                            </form>
                        ) : (
                            <div className={cx('content')}>{value.email}</div>
                        )}
                    </div>
                    <div className={cx('change-info')}>
                        <span onClick={() => handleChangeInfo('changeUsername')}>{changeInfo.changeUsername ? 'Save' : 'Edit'}</span>
                        <span onClick={() => handleChangeInfo('changePassword')}>{changeInfo.changePassword ? 'Save' : 'Change password'}</span>
                        {changeInfo.changeUsername && (
                            <span onClick={() => setChangeInfo({ changeUsername: false, changePassword: false, changeAvata: false })}>Close</span>
                        )}
                        {changeInfo.changePassword && (
                            <span onClick={() => setChangeInfo({ changeUsername: false, changePassword: false, changeAvata: false })}>Close</span>
                        )}
                    </div>
                </Col>
                <Col lg={4}>
                    <div className={cx('sub-title')}>Newsletters</div>
                    <div className={cx('body')}><div className={cx('content')}>You don't subscribe to our newsletter.</div></div>
                    <div className={cx('change-info')}>
                        <span className={cx('disible-edit')}>Edit</span>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className={cx('sub-title')}>My Avata</div>
                    <div className={cx('body')}>
                        {changeInfo.changeAvata ? (
                            <div className={cx('avatas')}>
                                <div
                                    className={cx(values.avata === '/images/avata1.jpg' ? 'avataActive' : ' ')}
                                    onClick={() => setValues({ ...values, avata: '/images/avata1.jpg' })}
                                >
                                    <img src={'/images/avata1.jpg'} alt="alt" />
                                </div>
                                <div
                                    className={cx(values.avata === '/images/avata2.jpg' ? 'avataActive' : ' ')}
                                    onClick={() => setValues({ ...values, avata: '/images/avata2.jpg' })}
                                >
                                    <img src={'/images/avata2.jpg'} alt="alt" />
                                </div>
                                <div
                                    className={cx(values.avata === '/images/avata3.jpg' ? 'avataActive' : ' ')}
                                    onClick={() => setValues({ ...values, avata: '/images/avata3.jpg' })}
                                >
                                    <img src={'/images/avata3.jpg'} alt="alt" />
                                </div>
                            </div>
                        ) : (
                            <div className={cx('current-avata')}><img src={values.avata} alt="alt" /></div>
                        )}
                    </div>
                    <div className={cx('change-info')}>
                        <span onClick={() => handleChangeInfo('changeAvata')}>{changeInfo.changeAvata ? 'Save' : 'Edit'}</span>
                        {changeInfo.changeAvata && (
                            <span onClick={() => setChangeInfo({ changeUsername: false, changePassword: false, changeAvata: false })}>Close</span>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default AccountInfo;