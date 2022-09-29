import classNames from "classnames/bind";

import style from "./Filter.module.scss"
const cx = classNames.bind(style)

function SelectSort({ values, optionDetector, setSelect }) {


    return (
        <div className={cx('control')}>
            <label htmlFor="sort">Sort By: </label>
            <select id="sort" onChange={(e) => { setSelect(e.target.value) }} value={optionDetector} >
                {
                    values.map((value, index) => (
                        <option className={cx('option')} value={value} key={index}>
                            {value}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}

export default SelectSort;