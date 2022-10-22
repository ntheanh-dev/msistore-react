import classNames from "classnames/bind";

import style from "./Filter.module.scss"
const cx = classNames.bind(style)

function SelectSort({ values, filter, setFilter }) {

    const handleChangeSort = (e) => {
        if (e.target.value === 'Prices') {
            setFilter({
                ...filter,
                _order: 'desc',
                _sort: 'newPrice'
            })
        } else if (e.target.value === 'Position') {
            const { sort, order, ...defaulFilter } = filter
            setFilter(defaulFilter)
        }
    }

    return (
        <div className={cx('control')}>
            <label htmlFor="sort">Sort By: </label>
            <select id="sort" onChange={e => handleChangeSort(e)} >
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