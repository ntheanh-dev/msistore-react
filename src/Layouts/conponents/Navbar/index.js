import Container from 'react-bootstrap/Container';
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";
import { Fragment } from "react"
import { useState } from 'react';

import Nav from '~/components/Nav'
import Button from '~/components/Button';
import logo from '~/assets/images/logo.png'
import style from './Navbar.module.scss'
import Hovercart from './HoverCart';
const cx = classNames.bind(style)
function Navbar() {
    const MAIN_NAV = [
        {
            display: "Laptops",
            path: "/laptop"
        },
        {
            display: "Desktop PCs",
            path: "/destop"
        },
        {
            display: "Netwoking Devices",
            path: "/netwoking"
        },
        {
            display: "Printers & Scanners",
            path: "/printers"
        },
        {
            display: "PC Parts",
            path: "/pcparts"
        },
        {
            display: "All Other Products",
            path: "/otherproducts"
        },
        {
            display: "Repairs",
            path: "/repairs"
        }
    ]

    const [toogleSearch, setToogleSearch] = useState({
        input: false,
        icon: true,
        navLinks: true
    })

    const [bars, setBars] = useState(false)

    const handleShowInput = () => {
        setToogleSearch({ input: true, icon: false, navLinks: false });
    }

    const currentUse = false;

    return (
        <div className={cx('background')}>
            <Container>
                <div className={cx('wrapper')}>

                    <Link to="/" className={cx('logo')}>
                        <img src={logo} alt="logo" />
                    </Link>

                    {!bars && <FaBars className={cx('bars')} onClick={() => setBars(true)} />}

                    {bars && <Nav isFillter handle={() => setBars(false)} />}

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
                        <button className={cx('search-btn')}>
                            <AiOutlineSearch className={cx('search-icon')} />
                        </button>
                        <input placeholder='Search here' />
                    </div>

                    <div className={cx('actions')}>
                        {toogleSearch.icon && (
                            <div className={cx('hideTablet')} onClick={handleShowInput}>
                                <AiOutlineSearch className={cx('icon')} />
                            </div>
                        )}

                        {
                            currentUse ? (
                                <Link to="/yourcart" className={cx('icon')}>
                                    <BsFillCartFill />
                                </Link>
                            ) : (
                                <Fragment>
                                    {/* your cart */}
                                    <Hovercart total={2} />

                                    <Link to="/register" className={cx('icon')}>
                                        <MdAccountCircle />
                                    </Link>
                                </Fragment>
                            )
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Navbar;