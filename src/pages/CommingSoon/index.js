import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import Button from "~/components/Button";
import style from './CommingSoon.module.scss'
const cx = classNames.bind(style)
function CommingSoon() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `COMMING SOON`
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (<div className={cx('wraaper')}>
        <h1>COMMING SOON</h1>
        <Button outlineGray to={'/'} >Back to Home</Button>
    </div>);
}

export default CommingSoon;