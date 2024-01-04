import classNames from "classnames/bind";
import { useState, memo, useRef } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import style from './Input.module.scss'
const cx = classNames.bind(style)
function FormInput(props) {
    const [focused, setFocused] = useState(false);
    const { label, onChange, onClick, id, errormessage, type, avatar, ...inputProps } = props
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
            {type === "textarea" ? (
                <>
                    <textarea
                        className={cx('textarea')}
                        name={inputProps.name}
                        rows="7"
                        onChange={onChange}
                        onClick={onClick}
                        ref={inputRef}
                        focused={focused.toString()}
                        defaultValue={'Jot us a note and we’ll get back to you as quickly as possible'}
                    >

                    </textarea>
                    <span>{errormessage}</span>
                </>
            ) : (
                <>
                    <input
                        {...inputProps}
                        type={showPassword}
                        onChange={onChange}
                        className={cx('input')}
                        onBlur={handleForcus}
                        ref={type === "file" ? avatar : inputRef}
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
                </>

            )}
        </div>
    );
}
export default memo(FormInput)    