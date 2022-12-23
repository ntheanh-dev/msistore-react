import Container from 'react-bootstrap/Container';
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";
import { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import { useMediaQuery } from "react-responsive";

import Button from '~/components/Button';
import Nav from '~/components/Nav'
import logo from '~/assets/images/logo.png'
import Hovercart from './HoverCart';
import style from './Navbar.module.scss'
import Search from '~/components/Search';
import Account from './Account';
const cx = classNames.bind(style)
function Navbar() {
    let isLaptop = useMediaQuery({ query: '(min-width: 768px)' })
    const user = useSelector(state => state.auth)
    const cart = useSelector(state => state.userCart)
    const [bars, setBars] = useState(false)
    const [scroll, setScroll] = useState(false)
    const [toogleSearch, setToogleSearch] = useState({
        input: false,
        icon: true,
        navLinks: true
    })
    const MAIN_NAV = [
        {
            display: "Laptops",
            path: "/filter"
        },
        {
            display: "Desktop PCs",
            path: "/filter"
        },
        {
            display: "Netwoking Devices",
            path: "/filter"
        },
        {
            display: "Printers & Scanners",
            path: "/filter"
        },
        {
            display: "PC Parts",
            path: "/filter"
        },
        {
            display: "All Other Products",
            path: "/filter"
        },
        {
            display: "Repairs",
            path: "/filter"
        }
    ]
    const handleShowInput = () => {
        setToogleSearch({ input: true, icon: false, navLinks: false });
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 44 || document.documentElement.scrollTop > 44) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        })
    }, []);

    return (
        <div className={cx('background', scroll && "shrink")}>
            <Container>
                <div className={cx('wrapper')}>

                    <Link to="/" className={cx('logo')}>
                        <img src={logo} alt="logo" />
                    </Link>

                    <FaBars className={cx('bars')} onClick={() => setBars(true)} />

                    {/* if tablet or mobile then show Nav */}
                    <Nav bars={bars} handle={() => setBars(false)} />

                    {toogleSearch.navLinks && (
                        <div className={cx('navLinks')}>
                            {
                                MAIN_NAV.map((item, index) => (
                                    <div key={index} className={cx('link')}>
                                        <Link to={item.path}>{item.display}</Link>
                                    </div>
                                ))
                            }
                            <Button primary>Our Deals</Button>
                        </div>
                    )}

                    <div className={cx('search', toogleSearch.input && 'activeF')}>
                        <Search />
                    </div>

                    <div className={cx('actions')}>
                        {toogleSearch.icon ? (
                            <div className={cx('hideTablet')} onClick={handleShowInput}>
                                <AiOutlineSearch className={cx('icon')} />
                            </div>
                        ) : (
                            isLaptop &&
                            <div
                                className={cx('icon-close-search-input')}
                                onClick={() => setToogleSearch({ input: false, icon: true, navLinks: true })}
                            >
                                <IoMdClose />
                            </div>

                        )}
                        <Hovercart cart={cart} hasUser={user.uid} />
                        <Account user={user} />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Navbar;