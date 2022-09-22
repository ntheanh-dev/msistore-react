import { AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";

import Button from '../../../components/Button';
import logo from '../../../assets/images/logo.png'
import style from './Navbar.module.scss'
const cx = classNames.bind(style)

function OverLay({ MAIN_NAV, handle }) {
    return (
        <div className={cx('isNavTablet')}>
            <div className={cx('isNavTablet-head')}>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <AiOutlineClose
                    className={cx('xmark-icon')}
                    onClick={handle}
                />
            </div>
            <div className={cx('isNavTablet-body')}>
                {MAIN_NAV && MAIN_NAV.map((item, index) => (
                    <div key={index} className={cx('isLinksTab')}>
                        <Link to={item.path}>{item.display}</Link>
                    </div>
                ))}
                <Button primary to="/ourdeals" >Our Deals</Button>
            </div>
        </div>
    );
}

export default OverLay;