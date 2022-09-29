import { AiOutlineSearch } from "react-icons/ai"
import classNames from "classnames/bind";
import { Fragment, useState } from "react"
import style from './Navbar.module.scss'
const cx = classNames.bind(style)
function Search() {
    return (
        <Fragment>
            <button className={cx('search-btn')}>
                <AiOutlineSearch className={cx('search-icon')} />
            </button>
            <input placeholder='Search here' />
        </Fragment>
    );
}

export default Search;