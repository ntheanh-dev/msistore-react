import classNames from "classnames/bind";
import PropTypes from 'prop-types'
import { memo } from "react";

import style from './Footer.module.scss';
const cx = classNames.bind(style)
function FooterItem({ ele }) {

    return (
        ele.map((item, index) => (
            <li key={index}>
                <a href="/" className={cx('link')}>
                    {item}
                </a>
            </li>
        ))
    );
}

FooterItem.propTypes = {
    ele: PropTypes.array.isRequired,
}

export default memo(FooterItem);