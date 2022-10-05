import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Tippy from '@tippyjs/react/headless';
import { useMediaQuery } from "react-responsive";

import { logout } from "~/redux/userSlice";
import style from './Navbar.module.scss'
const cx = classNames.bind(style)
function Account({ avataPath, hasUser }) {

    const { id } = useSelector(state => state.user.value)
    const navigate = useNavigate()
    const dispath = useDispatch()
    let isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const ACCOUNT = [
        {
            title: "My wish list(0)",
            path: '/comming'
        },
        {
            title: "compate (0)",
            path: '/comming'
        },
        {
            title: "Create an account",
            path: '/register'
        },
        {
            title: id ? "Log out" : "Sign in",
            path: id ? "/" : "/login"
        },
    ]

    if (id) {
        ACCOUNT.unshift({
            title: "My Account",
            path: '/account'
        })
    }
    const handleLogOut = () => {
        dispath(logout(null))
    }

    return (
        <div>
            <div>
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
                    {hasUser === true ? (
                        <div className={cx('avata')} onClick={() => navigate('/account')} >
                            <img src={avataPath} alt='alt' />
                        </div>
                    ) : (
                        <div onClick={() => navigate('/login')} className={cx('icon')}>
                            <MdAccountCircle />
                        </div>
                    )}
                </Tippy>
            </div>
        </div>
    );
}

export default Account;