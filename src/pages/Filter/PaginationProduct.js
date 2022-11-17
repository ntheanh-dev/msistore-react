import PropTypes from 'prop-types'
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import classNames from "classnames/bind";

import style from "./Filter.module.scss"
const cx = classNames.bind(style)

PaginationProduct.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func,
}
function PaginationProduct({ pagination, onPageChange }) {
    const { _page, _limit, _totalRows } = pagination
    const totalPages = Math.ceil(_totalRows / _limit)

    const handlePageChange = (newPages) => {
        if (onPageChange) {
            onPageChange(newPages)
        }
    }

    const pages = []
    for (let i = 0; i < totalPages; i++) {
        pages.push({ _page: i + 1, id: i })
    }

    return (
        <div className={cx('pages')}>
            <button
                disabled={_page <= 1}
                onClick={() => handlePageChange(_page - 1)}
            >
                <RiArrowLeftSLine />
            </button>
            {pages.map(page => (
                <button
                    key={page.id}
                    onClick={() => page._page !== _page && handlePageChange(page._page)}
                    className={cx(page._page === _page && 'currentPage')}
                >
                    <div>{page._page}</div>
                </button>
            ))}
            <button
                disabled={_page >= totalPages}
                onClick={() => handlePageChange(_page + 1)}
            >
                <RiArrowRightSLine />
            </button>
        </div>
    );
}

export default PaginationProduct;