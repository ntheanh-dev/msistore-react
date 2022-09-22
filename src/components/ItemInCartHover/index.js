import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { TiDeleteOutline, TiPencil } from "react-icons/ti";

import style from './ItemInCartHover.module.scss'
const cx = classNames.bind(style)

function ItemInCartHover({ name, img, quanti }) {
    return (
        <Link className={cx('wrapper')}>
            <div className={cx('quanti')}>{quanti}<span>x</span></div>
            <div className={cx('img')}>
                <img src={img} alt="img" />
            </div>
            <div className={cx('name')}>{name}</div>
            <div className={cx('actions')}>
                <TiDeleteOutline className={cx('icon')} />
                <TiPencil className={cx('icon')} />
            </div>
        </Link>
    );
}

export default ItemInCartHover;