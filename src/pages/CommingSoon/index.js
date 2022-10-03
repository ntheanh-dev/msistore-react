import classNames from "classnames/bind";

import Button from "~/components/Button";
import style from './CommingSoon.module.scss'
const cx = classNames.bind(style)
function CommingSoon() {
    return (<div className={cx('wraaper')}>
        <h1>COMMING SOON</h1>
        <Button outlineGray to={'/'} >Back to Home</Button>
    </div>);
}

export default CommingSoon;