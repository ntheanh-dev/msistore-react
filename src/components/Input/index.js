import classNames from "classnames/bind";
import { useState, memo, useRef } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import style from './Input.module.scss'
const cx = classNames.bind(style)
function FormInput(props) {
    const [focused, setFocused] = useState(false);
    const { label, onChange, id, errormessage, type, ...inputProps } = props
    const [showPassword, setShowPassword] = useState(type)
    const handleShowPassword = () => {
        setShowPassword(showPassword === 'password' ? 'text' : 'password')
    }
    const handleForcus = e => {
        setFocused(true)
    };

    const inputRef = useRef()

    return (
        <div className={cx('wrapper')}>
            {label &&
                <>
                    <label className={cx('label')}>
                        {label}
                        <span className={cx('importantmark')}> *</span>
                    </label>
                    <br />
                </>
            }
            <input
                {...inputProps}
                type={showPassword}
                onChange={onChange}
                className={cx('input')}
                onBlur={handleForcus}
                ref={inputRef}
                onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)
                }
                focused={focused.toString()}
            />

            <span>{errormessage}</span>

            {type === 'password' && props.value && (
                <div
                    className={cx('icon', !label && 'icon-without-lable')}
                    onClick={handleShowPassword}
                >
                    {showPassword === 'password' ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
            )}
        </div>
    );
}
export default memo(FormInput)    