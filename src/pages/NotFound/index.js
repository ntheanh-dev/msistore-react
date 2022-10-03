import classNames from "classnames/bind";

import Button from "~/components/Button";
import style from './NotFound.module.scss'
const cx = classNames.bind(style)
function NotFount() {
    return (<div className={cx('wraaper')}>
        <h2>404</h2>
        <p>Page not found</p>
        <Button outlineGray to={'/'} >Back to Home</Button>
    </div>);
}

export default NotFount;