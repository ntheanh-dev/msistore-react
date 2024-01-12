import classNames from "classnames/bind";
import style from "./ChildDashboardComponents.mobule.scss"
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { getPasswordFromFirebase } from "~/components/firebase/config";
import { changePassword, changeUserInfo, update } from "~/redux/authSlice";
import FormInput from "~/components/Input";
import { useEffect, useRef, useState } from "react";
import cookie from "react-cookies";
import { unwrapResult } from "@reduxjs/toolkit";
import LoadingSpinner from "~/components/LoadingSpinner";
import Dialog from "~/components/Dialog";
import { Toast } from "~/configs/Toast";
const cx = classNames.bind(style)
function AccountInfo() {
    const dispatch = useDispatch()
    const { user, status } = useSelector(state => state.auth)
    const formRef = useRef(null)
    // check if user login with gg or fb
    const isUserLoginedWithGoogle = false
    const [editInfo, setEditInfo] = useState(false)
    const [editPassword, setEditPassword] = useState(false)
    const [editAvata, setEditAvatar] = useState(false)

    const [values, setValues] = useState({ ...user, old_password: '', new_password: '' })

    const handleChangeInfo = () => {
        if (editInfo) {
            if (values.first_name && values.last_name && values.email) {
                const isEdited = (values.first_name !== user.first_name) ||
                    (values.last_name !== user.last_name) ||
                    (values.email !== user.email) ? true : false
                if (isEdited) {
                    const { password, ...newUser } = values
                    var form_data = new FormData();
                    for (var k in newUser) {
                        form_data.append(k, newUser[k]);
                    }
                    dispatch(update(form_data))
                        .then(unwrapResult)
                        .then(res => {
                            Toast('success', 'Update successfully')
                            setEditInfo(false)
                        })
                } else {
                    Toast('warn', `Please fill with new information`)
                }
            } else {
                Toast('warn', `Please fill with correct information`)
            }
        } else {
            setEditInfo(true)
        }
    }

    const handleChangePassword = () => {
        if (editPassword) {
            if (values.old_password.length < 8 || values.new_password.length < 8) {

            } else {
                var form_data = new FormData();
                form_data.append('old_password', values.old_password)
                form_data.append('new_password', values.new_password)

                dispatch(changePassword(form_data))
                    .then(unwrapResult)
                    .then(res => {
                        Toast('success', 'Changed password successlly')
                        setValues({ ...user, old_password: '', new_password: '' })
                        setEditPassword(false)
                    })
                    .catch(err => {
                        if (err.status === 400) {
                            Toast('warn', 'Current password is incorrect')
                        }
                    })
            }
        } else {
            setEditPassword(true)
            setValues({ ...user, old_password: '', new_password: '' })
        }
    }

    const handleClose = (type) => {
        if (type === 'editInfo') {
            setEditInfo(false)
        } else if (type === 'editPassword') {
            setEditPassword(false)
        }
        setValues({ ...user, old_password: 'Theanh25', new_password: 'Theanh30' })
    }

    const INPUT_INFO = [
        {
            name: "first_name",
            type: "text",
            label: "First name",
            errormessage: "First name should be 3-16 characters and shouldn't include any special character!",
            pattern: "^([a-z]+)((\s{1}[a-z]+){1,})$",
            required: true,
        },
        {
            name: "last_name",
            type: "text",
            errormessage: "Last name should be 3-16 characters",
            label: "Last name",
            pattern: "^([a-z]+)((\s{1}[a-z]+){1,})$",
            required: true,
        },
        {
            name: "email",
            type: "email",
            placeholder: "Your email",
            label: "Email",
            errormessage: "It should be a valid email address",
            required: true,
        },
    ]
    const INPUT_PASSWORD = [
        {
            name: "old_password",
            type: "password",
            label: "Current password",
            errormessage: "Password should be 8-20 characters and include at least 1 number",
            // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            name: "new_password",
            type: "password",
            label: "New password",
            errormessage: "Password should be 8-20 characters and include at least 1 number",
            // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },

    ]
    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <div className={cx('wrapper')}>
            {status === 'pending' && <LoadingSpinner />}
            <div className={cx('title')}>Account Information</div>
            <Row>
                <Col lg={4}>
                    <div className={cx('sub-title')}>Contact Information</div>
                    <div className={cx('body')}>
                        {!editPassword && (
                            editInfo ? (
                                <form ref={formRef} >
                                    {INPUT_INFO.map((ele, index) => (
                                        <FormInput
                                            {...ele}
                                            key={index}
                                            value={values[ele.name]}
                                            onChange={onChange}
                                        />
                                    ))}
                                </form>
                            ) : (
                                <>
                                    <div className={cx('content')}>{`${values.first_name} ${values.last_name}`}</div>
                                    <div className={cx('content')}>{user.email}</div>
                                </>
                            )
                        )}
                        {editPassword && (
                            <form>
                                {INPUT_PASSWORD.map((ele, index) => (
                                    <FormInput
                                        key={index}
                                        {...ele}
                                        value={values[ele.name]}
                                        onChange={onChange}
                                    />
                                ))}
                            </form>
                        )}
                    </div>
                    <div className={cx('change-info')}>
                        {editPassword ? (
                            <span onClick={() => handleClose("editPassword")}>Close</span>
                        ) : (
                            <span onClick={handleChangeInfo}>{editInfo ? 'Save' : 'Edit'}</span>
                        )}


                        {editInfo ? (
                            <span onClick={() => handleClose("editInfo")}>Close</span>
                        ) : (
                            <span
                                onClick={handleChangePassword}
                                className={cx(isUserLoginedWithGoogle && 'disible-edit')}
                            >
                                {editPassword ? 'Save' : 'Change password'}
                            </span>
                        )}

                    </div>
                </Col>
                <Col lg={4}>
                    <div className={cx('sub-title')}>Newsletters</div>
                    <div className={cx('body')}><div className={cx('content')}>You don't subscribe to our newsletter.</div></div>
                    <div className={cx('change-info')}>
                        <span>Edit</span>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className={cx('sub-title')}>My Avata</div>
                    <div className={cx('body')}>
                        {editAvata ? (
                            <form >
                                {/* <FormInput
                                    {...inputs[3]}
                                    value={''}
                                    onChange={onChange}
                                /> */}
                            </form>
                        ) : (
                            <div className={cx('current-avata')}><img src={values.image} alt="alt" /></div>
                        )}
                    </div>
                    <div className={cx('change-info')}>
                        <span onClick={() => handleChangeInfo('changeAvata')}>{editAvata ? 'Save' : 'Edit'}</span>
                        {editAvata && (
                            <span onClick={() => setEditAvatar(false)}>Close</span>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default AccountInfo;





