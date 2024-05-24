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
                > TheAnhNguyen && Minh Tam && Sinh Hung</a> form 5/2024.
            </div>
        </div>
    );
}

export default InforAuthor;