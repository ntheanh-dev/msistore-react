import classNames from "classnames/bind";
import style from "./Body.module.scss";

const cx = classNames.bind(style)
function InforAuthor() {
    return (
        <div className={cx('author')}>
            <div className={cx('desc')}>
                This website was created by
                <a href="https://www.facebook.com/theanhnguyenmgt"
                    className={cx("name")}
                    alt="theanh"
                > TheAnhNguyen </a> form 9/2022.
            </div>
        </div>
    );
}

export default InforAuthor;