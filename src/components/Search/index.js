import { AiOutlineClose } from "react-icons/ai"
import { BiSearchAlt } from "react-icons/bi"
import classNames from "classnames/bind";
import { useState, useRef, memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

import Product from "../Product";
import style from './Search.module.scss'
import API, { endpoints } from "~/configs/API";
import useDebounce from "~/hooks/useDebounce";
const cx = classNames.bind(style)
function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResual] = useState([])
    const debounceValue = useDebounce(searchValue, 600)

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResual([])
            return
        }
        const fetchApi = async () => {
            const res = await API.get(endpoints['product_filter'](`kw=${debounceValue}`))
            setSearchResual(res.data.results)
        }
        fetchApi()
    }, [debounceValue])
    const inputRef = useRef()

    const handleOnchange = (e) => {
        const searchValues = e.target.value;
        if (!searchValues.startsWith(' ')) {
            setSearchValue(searchValues);
        }
    }

    const handleClear = () => {
        setSearchValue('');
        setSearchResual([])
        inputRef.current.focus();
    }

    return (
        <div className={cx('search')}>
            <button className={cx('search-btn')}>
                <BiSearchAlt />
            </button>
            <input
                placeholder='Search here'
                value={searchValue}
                onChange={(e) => handleOnchange(e)}
                ref={inputRef}
            />
            {searchValue.length > 0 && (
                <button className={cx('close-btn')} onClick={handleClear}>
                    <AiOutlineClose />
                </button>
            )}
            {searchValue.length > 0 && searchResult.length > 0 &&
                <div className={cx('wrapper')}
                    onClick={() => setSearchValue('')}
                >
                    {searchResult.map((product) => (
                        <Product key={product.id} isSerachResult data={product} />
                    ))}
                </div>
            }
        </div>
    );
}

export default memo(Search);