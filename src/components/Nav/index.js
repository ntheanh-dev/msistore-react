import { AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";

import Button from '~/components/Button';
import logo from '~/assets/images/logo.png'
import style from './Nav.module.scss'
import { Fragment, useState } from "react";
const cx = classNames.bind(style)

function OverLay({ handle, isNav, isFillter }) {

    //isNav
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

    //isFillter
    const [colorList, setColorList] = useState(false)


    const render = (list) => {
        (
            list.map((ele, index) => (
                <li key={index}>{ele}</li>
            ))
        )
    }

    return (
        <div className={cx('isNav')}>
            <Fragment>
                <div className={cx('isNavTablet-head')}>
                    {isNav &&
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    }
                    {isFillter &&
                        <h1 className={cx('heading')}>Fillter By</h1>
                    }

                    <AiOutlineClose
                        className={cx('xmark-icon')}
                        onClick={handle}
                    />
                </div>
                <div className={cx('isNavTablet-body')}>
                    {isNav &&
                        (MAIN_NAV.map((item, index) => (
                            <div key={index} className={cx('isLinksTab')}>
                                <Link to={item.path}>{item.display}</Link>
                            </div>
                        )))
                    }
                    {isFillter && (
                        <div className={cx('fillter-list')}>
                            <div>Price</div>
                            {colorList && (
                                <ul></ul>
                            )}
                        </div>
                    )}
                    {isNav && <Button primary to="/ourdeals" >Our Deals</Button>}
                    {isFillter && <Button primary to="/ourdeals" >Apply Fillter</Button>}
                </div>
            </Fragment>
        </div>
    );
}

export default OverLay;