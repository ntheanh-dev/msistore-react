import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai"
import classNames from "classnames/bind";
import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";


import Product from "../Product";
import { ProductBySearch } from "../../Layouts/conponents/Navbar/ProductBySearch";
import { setSerach } from "~/redux/filterSlice";
import style from './Search.module.scss'
const cx = classNames.bind(style)
function Search() {
    const [searchValue, setSearchValue] = useState('')
    // const [showResult, setShowResult] = useState(false)

    const inputRef = useRef()
    const dispatch = useDispatch()
    const productAfter = useSelector(ProductBySearch)
    const handleOnchange = (e) => {
        setSearchValue(e.target.value)
        dispatch(setSerach(e.target.value))
    }

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    }

    return (
        <div className={cx('search')}>
            <button className={cx('search-btn')}>
                <AiOutlineSearch />
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
            {searchValue.length > 0 && !!productAfter[0] &&
                <div className={cx('wrapper')} onClick={() => setSearchValue('')}>
                    {productAfter.map((product) => (
                        <Product key={product.id} isSerachResult data={product} />
                    ))}
                </div>
            }
        </div>
    );
}

export default Search;