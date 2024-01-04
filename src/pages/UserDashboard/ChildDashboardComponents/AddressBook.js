import classNames from "classnames/bind";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import FormInput from "~/components/Input";
import style from "./ChildDashboardComponents.mobule.scss"
import API, { authAPI, endpoints } from "~/configs/API";
import { useRef } from "react";
import { create, setUserAddress, update, } from "~/redux/userAddressSlice";
import { Toast } from "~/configs/Toast";

const cx = classNames.bind(style)
function AddressBook() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const userAddress = useSelector(state => state.userAddress)
    const [address, setAddress] = useState(userAddress.address)
    const [editAddress, setEditAddress] = useState(false)
    const formRef = useRef()
    const USER_ADDRESS = address ? [address.country, address.city, address.street,
    address.home_number, address.phone_number].join('\n') : "You have not set a default shipping address."
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await authAPI.get(endpoints['address'])

                setAddress(res.data)
                dispatch(setUserAddress(res.data))

            } catch (e) {
                // console.log(e)
            }
        }
        fetchApi()
    }, [])

    const [values, setValues] = useState({
        country: address ? address.country : "",
        city: address ? address.city : "",
        street: address ? address.street : "",
        home_number: address ? address.home_number : "",
        phone_number: address ? address.phone_number : ""
    })

    const INPUTS = [
        {
            name: "country",
            type: "text",
            errormessage: "Country name should be 3-30 characters and shouldn't include any special character!",
            label: "Country",
            pattern: "/^[\p{L}\s']+$/u",
            required: true,
        },
        {
            name: "city",
            type: "text",
            errormessage: "City name should be 3-30 characters and shouldn't include any special character!",
            label: "City",
            pattern: "/^[\p{L}\s']+$/u",
            required: true,
        },
        {
            name: "street",
            type: "text",
            errormessage: "Street should be 3-50 characters and shouldn't include any special character!",
            label: "Street",
            pattern: "^/^[\p{L}\s']+$/u",
            required: true,
        },
        {
            name: "home_number",
            type: "text",
            errormessage: "Home number should be 3-30 characters!",
            label: "Home number",
            pattern: "^[A-Za-z0-9]{3,30}$",
            required: true,
        },
        {
            name: "phone_number",
            type: "text",
            errormessage: "Invaild VietNam phone number!",
            label: "Phone number",
            pattern: "^(0[0-9]{9})$",
            required: true,
        },
    ]

    const handleClick = () => {
        if (editAddress) {
            const formData = new FormData(formRef.current);
            const isValidForm = Object.values(values).every(value => value !== null && value !== undefined && value !== '');
            if (isValidForm) {
                ///Update existing address
                if (userAddress.address) {
                    let isEdited = false
                    for (let key in values) {
                        if (values[key] !== userAddress.address[key]) {
                            isEdited = true;
                        } else {
                            formData.delete(key)
                        }
                    }
                    //formData with edited fields currently

                    //check edited information
                    if (isEdited)
                        dispatch(update(formData))
                            .then(unwrapResult)
                            .then(res => {
                                Toast('success', `Update successfully`)
                                setAddress(res)
                                setEditAddress(false)
                            })
                            .catch(e => {
                                console.log(e)
                            })
                    else
                        Toast('warn', `Please fill out the form with new address`)
                } else {
                    // Create new address
                    formData.append('user', user.id)
                    dispatch(create(formData))
                        .then(unwrapResult)
                        .then(res => {
                            Toast('success', 'Create successfully')
                            setAddress(res)
                            setEditAddress(false)
                        })
                        .catch(e => {

                        })
                }

            } else {
                Toast('warn', `Plase fill out the form`)
            }
        } else {
            setEditAddress(true)
        }
    }

    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Address Book</div>
            <Row>
                <Col>
                    <div className={cx('sub-title')}>Default Shipping Address</div>
                    {editAddress ? (
                        <form ref={formRef}>
                            {INPUTS.map((input, index) => (
                                <FormInput
                                    key={index}
                                    {...input}
                                    value={values[input.name]}
                                    onChange={onChange}
                                />
                            ))}
                        </form>
                    ) : (
                        <div className={cx('body')}>
                            <div className={cx('content')}>
                                {userAddress ? (USER_ADDRESS) : ('You have not set a default shipping address.')}
                            </div>
                        </div>
                    )}
                    <div className={cx('change-info')}>
                        <span onClick={handleClick}>{editAddress ? 'Save' : (userAddress.address ? 'Edit Address' : 'Create Address')}</span>
                        <span onClick={() => setEditAddress(false)}>{editAddress && 'Close'}</span>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default AddressBook;