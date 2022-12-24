import classNames from "classnames/bind";
import ClipLoader from "react-spinners/ClipLoader";

import style from "./LoadingSpinner.module.scss"

const cx = classNames.bind(style)

function LoadingSpinner() {
    return (<div className={cx('Overlay-loading')}>
        <ClipLoader loading={true} size={50} color={'#0156FF'} />
    </div>);
}

export default LoadingSpinner;