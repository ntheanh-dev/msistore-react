import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Tippy from '@tippyjs/react/headless';
import { memo, useState } from "react";

import { setLogoutUserInfo } from "~/redux/authSlice";
import { clearCart } from "~/redux/userCartSlice";
import style from './Navbar.module.scss'
const cx = classNames.bind(style)
function Account({ user }) {
    const navigate = useNavigate()
    const dispath = useDispatch()
    const dispathLogoutUserInfo = () => dispath(setLogoutUserInfo())
    const dispathLogoutCart = () => dispath(clearCart())
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    let ACCOUNT = [
        {
            title: "Create an account",
            path: '/register'
        },
        {
            title: user.id ? "Log out" : "Sign in",
            path: user.id ? "/" : "/login"
        },
    ]

    if (user.id) {
        const hasUser = [
            {
                title: "My Account",
                path: '/dashboard'
            },
            {
                title: "My wish list(0)",
                path: '/comming'
            },
            {
                title: "Compate (0)",
                path: '/comming'
            }

        ]
        ACCOUNT.splice(0, 1)
        ACCOUNT = [...hasUser, ...ACCOUNT]
        // ACCOUNT.splice(0,0,{ title: "My Account", path: '/account' },{ title: "My wish list(0)", path: '/comming'},{title: "Compate (0)",path: '/comming'})
    }

    const handleClick = (title) => {
        if (title === 'Log out') {
            dispathLogoutUserInfo()
            dispathLogoutCart()
        }
        if (visible) {
            hide()
        } else {
            show()
        }
    }

    return (
        <Tippy
            interactive
            offset={[12, 8]}
            placement='bottom-end'
            content="Tooltip" visible={visible} onClickOutside={hide}
            render={attrs => (
                <div className={cx('account')} >
                    {ACCOUNT.map((ele, index) => (
                        <Link
                            to={ele.path}
                            key={index}
                            className={cx('account-item')}
                            onClick={() => handleClick(ele.title)}
                        >
                            {ele.title}
                        </Link>
                    ))}
                </div>
            )}
        >
            {user.id ? (
                <div
                    className={cx('avata')}
                    onClick={() => { visible ? hide() : show() }}
                >
                    <img src={user.image} alt='alt' />
                </div>
            ) : (
                <div onClick={() => navigate('/login')} className={cx('icon')}>
                    <MdAccountCircle />
                </div>
            )}
        </Tippy>
    );
}

export default memo(Account);