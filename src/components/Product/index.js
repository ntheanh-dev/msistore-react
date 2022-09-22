import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { BsFillStarFill, BsFillCheckCircleFill, BsFillTelephoneXFill } from "react-icons/bs";
import { memo } from "react";

import style from './Product.module.scss'
const cx = classNames.bind(style)

function Product({
    name,
    img,
    oldPrice,
    newPrice,
    review,
    condition
}) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < review) {
            stars.push('star-color')
        } else {
            stars.push('star-no-color')
        }
    }

    return (
        <Link to="/product">
            <div className={cx("product")}>
                {
                    condition.includes("in stock")
                        ? <div>
                            <BsFillCheckCircleFill className={cx('stock-icon')} />
                            <div className={cx('tilte')}>{condition}</div>
                        </div>
                        : <div>
                            <BsFillTelephoneXFill className={cx('phone-icon')} />
                            <div className={cx('tilte')}>{condition}</div>
                        </div>
                }
                <div className={cx("img")}>
                    <img src={img} alt="" />
                </div>
                <div className={cx("reviews")}>
                    <div className={cx("stars")}>
                        {
                            stars.map((star, index) => (
                                <BsFillStarFill key={index} className={cx(star, "icon")} />
                            ))
                        }
                    </div>
                    <div className={cx("review-quanti")}>
                        Reviews ({review})
                    </div>
                </div>
                <div className={cx("name")}>
                    {name}
                </div>
                <div className={cx("prices")}>
                    <div className={cx("old")}>${oldPrice}</div>
                    <div className={cx("new")}>${newPrice}</div>
                </div>
            </div>
        </Link>
    );
}

Product.propTypes = {
    name: PropTypes.string.isRequired,
    img: PropTypes.node.isRequired,
    oldPrice: PropTypes.number.isRequired,
    newPrice: PropTypes.number.isRequired,
    review: PropTypes.number.isRequired,
    condition: PropTypes.string.isRequired
}

export default memo(Product);