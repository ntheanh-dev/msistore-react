import Skeleton from "react-loading-skeleton";
import classNames from "classnames/bind";

import style from "./ProductSkeleton.module.scss";

const cx = classNames.bind(style)

function ProductSkeleton() {
    return (<div className={cx('wrapper')}>
        <div className={cx('')}>
            <Skeleton height={20} width={100} />
        </div>
        <div className={cx('photo')}>
            <Skeleton height={140} />
        </div>
        <div className={cx('stars')}>
            <Skeleton height={20} width={120} />
        </div>
        <div className={cx('name')}>
            <Skeleton height={70} />
        </div>
        <div className={cx('prices')}>
            <Skeleton height={50} />
        </div>
    </div>);
}

export default ProductSkeleton;