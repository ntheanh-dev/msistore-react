import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Fragment } from "react";
import PropTypes from 'prop-types';


import style from './Pageing.module.scss';
const cx = classNames.bind(style)

function Pageing({ pages }) {
    return (
        <div className={cx('wrapper-link')}>
            <Link to="/" className={cx('link')} >Home</Link>
            {
                pages.map((ele, ind) => (
                    <Fragment key={ind}>
                        <IoIosArrowForward className={cx('icon')} />
                        <Link to={`/${ele.path}`} className={cx('link')} >{ele.title}</Link>
                    </Fragment>
                ))
            }
        </div>
    );
}

Pageing.propTypes = {
    pages: PropTypes.array.isRequired
}
export default Pageing;