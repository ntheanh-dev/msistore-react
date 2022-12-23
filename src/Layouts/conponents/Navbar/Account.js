import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Tippy from '@tippyjs/react/headless';
import { memo, useState } from "react";

import { LogOut } from "~/components/firebase/config";
import { setLogoutUserInfo } from "~/redux/authSlice";
import { setLogoutCart } from "~/redux/userCartSlice";
import style from './Navbar.module.scss'
const cx = classNames.bind(style)
function Account({ user }) {
    const navigate = useNavigate()
    const dispath = useDispatch()
    const dispathLogoutUserInfo = () => dispath(setLogoutUserInfo())
    const dispathLogoutCart = () => dispath(setLogoutCart())
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    let ACCOUNT = [
        {
            title: "Create an account",
            path: '/register'
        },
        {
            title: user.uid ? "Log out" : "Sign in",
            path: user.uid ? "/" : "/login"
        },
    ]

    if (user.uid) {
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
            LogOut(dispathLogoutUserInfo, dispathLogoutCart)
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
            {user.uid ? (
                <div
                    className={cx('avata')}
                    onClick={() => { visible ? hide() : show() }}
                >
                    <img src={user.photoURL} alt='alt' />
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