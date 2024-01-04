import PropTypes from 'prop-types'
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import classNames from "classnames/bind";

import style from "./Filter.module.scss"
const cx = classNames.bind(style)

function PaginationProduct({ data, onPageChange, filter }) {

    const handlePageChange = (newPages) => {
        if (onPageChange) {
            onPageChange(newPages)
        }
    }

    const pages = []
    for (let i = 0; i < data.total_pages; i++) {
        pages.push({ _page: i + 1, id: i })
    }

    return (
        <div className={cx('pages')}>
            <button
                disabled={data.previous === null && true}
                onClick={() => handlePageChange(filter.page - 1)}
            >
                <RiArrowLeftSLine />
            </button>
            {pages.map(page => (
                <button
                    key={page.id}
                    onClick={() => page._page !== filter.page && handlePageChange(page._page)}
                    className={cx(page._page === filter.page && 'currentPage')}
                >
                    <div>{page._page}</div>
                </button>
            ))}
            <button
                disabled={data.next === null && true}
                onClick={() => handlePageChange(filter.page + 1)}
            >
                <RiArrowRightSLine />
            </button>
        </div>
    );
}

export default PaginationProduct;