import classNames from "classnames/bind";
import { useState } from "react";


import style from './Register.module.scss'
const cx = classNames.bind(style)
function FormInput(props) {
    const [focused, setFocused] = useState(false);
    const { label, onChange, id, errormessage, ...inputProps } = props

    const handleForcus = e => {
        setFocused(true)
    };


    return (
        <div>
            <label>{label}</label><br />
            <input
                {...inputProps}
                onChange={onChange}
                className={cx('input')}
                onBlur={handleForcus}
                onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)
                }
                focused={focused.toString()}
            />
            <span>{errormessage}</span>
        </div>
    );
}

export default FormInput;