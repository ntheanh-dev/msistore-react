import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Tippy from '@tippyjs/react/headless';
import { useMediaQuery } from "react-responsive";
import { memo } from "react";

import { logout } from "~/redux/userSlice";
import style from './Navbar.module.scss'
const cx = classNames.bind(style)
function Account({ user }) {
    const navigate = useNavigate()
    const dispath = useDispatch()
    let isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

    let ACCOUNT = [
        {
            title: "Create an account",
            path: '/register'
        },
        {
            title: user.value.id ? "Log out" : "Sign in",
            path: user.value.id ? "/" : "/login"
        },
    ]

    if (user.value.id) {
        const hasUser = [
            {
                title: "My Account",
                path: '/account'
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
    const handleLogOut = () => {
        dispath(logout(null))
    }

    return (
        <Tippy
            // delay={[0, 200]}
            disabled={isTabletOrMobile}
            interactive
            offset={[12, 8]}
            placement='bottom-end'
            render={attrs => (
                <div className={cx('account')} >
                    {ACCOUNT.map((ele, index) => (
                        <Link
                            to={ele.path}
                            key={index}
                            className={cx('account-item')}
                            onClick={ele.title === "Log out" ? handleLogOut : ''}
                        >
                            {ele.title}
                        </Link>
                    ))}
                </div>
            )}
        >
            {user.value.id ? (
                <div className={cx('avata')} onClick={() => navigate('/account')} >
                    <img src={user.value.avata} alt='alt' />
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