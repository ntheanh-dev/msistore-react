import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify"
import FormInput from "~/components/Input";
import { logout } from "~/redux/userSlice";
import { userPut } from "~/redux/userSlice";
import Button from "~/components/Button";
import style from './AccountView.module.scss'
const cx = classNames.bind(style)
function AccountView() {
    const { value } = useSelector(state => state.user)
    const [avata, setAvata] = useState(value.avata)
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const createAd = new Date(value.createdAt).toString()
    const [values, setValues] = useState({
        username: value.username,
        password: value.password
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
            name: "password",
            type: "password",
            placeholder: "Your password",
            label: "Password",
            errormessage: "Password should be 8-20 characters and include at least 1 number",
            // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        }
    ]
    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleEdit = () => {
        setEdit(!edit)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const newUser = { ...value, ...values };
        newUser.avata = avata
        dispatch(userPut(newUser))
        toast.success(`Register successful`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setEdit(false)
    }

    const handleLogOut = () => {
        dispatch(logout(null))
        navigate('/')
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container className={cx('wrapper')}>
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
                            {inputs.map((input) => (
                                <FormInput
                                    key={input.id}
                                    {...input}
                                    value={values[input.name]}
                                    onChange={onChange}
                                />
                            ))}
                            <div>
                                <Button primary>Save</Button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <div className={cx('detail')}>Username:
                                <span>{value.username}</span>
                            </div>
                            <div className={cx('detail')}>Email: <span>{value.email}</span></div>
                            <div className={cx('detail')}>Password:
                                <span>{value.password}</span>
                            </div>
                            <div className={cx('detail')}>Create at:  <span>{createAd}</span></div>
                        </>
                    )}

                    {!edit && (
                        <div className={cx('btns')}>
                            <Button outline onClick={() => handleEdit()}>Edit</Button>
                            <Button outline onClick={() => handleLogOut()} >Logout</Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default AccountView;