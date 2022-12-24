import { Container, Row, Col } from "react-bootstrap";
import Pageing from "~/components/Pageing";
import classNames from "classnames/bind";
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdSort } from 'react-icons/md';
import queryString from "query-string"
import { AiOutlineInbox } from "react-icons/ai";

import LoadingSpinner from "~/components/LoadingSpinner";
import PaginationProduct from "./PaginationProduct";
import Product from "~/components/Product";
import FilterNav from "./FilterNav";
import style from "./Filter.module.scss"
import SelectSort from "./SelectSort";
import Button from "~/components/Button";
const cx = classNames.bind(style)

function Filter() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    let isMobile = useMediaQuery({ query: '(max-width: 576px)' })
    let isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const [showDesc, setShowDesc] = useState(false)
    const [showNavFillter, setShowNavFillter] = useState(!isMobile)
    const [product, setProduct] = useState([])
    const [pagination, setPagination] = useState({
        _page: 1,
        _limit: (isMobile && 12) || (isTabletOrMobile && 9) || 12,
        _totalRows: 13,
    })
    const [filter, setFilter] = useState({
        _page: 1,
        _limit: (isMobile && 12) || (isTabletOrMobile && 9) || 12
    })

    const handlePageChange = (newPages) => {
        setFilter({
            ...filter,
            _page: newPages,
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    useEffect(() => {
        document.title = 'All our products'
    }, [])

    useEffect(() => {
        async function fetchAPI() {
            try {
                setIsLoading(true)
                const paramstring = queryString.stringify(filter)
                const requestURL = `https://json-server-sand.vercel.app/api/data?${paramstring}`
                const response = await fetch(requestURL);
                const responseJSON = await response.json()
                const { data, pagination } = responseJSON
                setProduct(data)
                setPagination(pagination)
                setIsLoading(false)
            }
            catch (error) {
                setIsLoading(false)
                console.log(error)
            }
        }
        fetchAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])

    return (
        <Container className={cx('wrapper')}>
            {isLoading && <LoadingSpinner />}
            <Pageing pages={[{ title: 'Laptops', path: 'filter' }]} />
            <Row>
                {!isMobile && (
                    <Col lg={2} md={3}>
                        <div className={cx('back')}>
                            <button onClick={() => navigate('/')}>{'< Back'}</button>
                        </div>
                    </Col>
                )}
                <Col lg={10} md={9} sm={12}>
                    <div className={cx('sort-head')}>
                        {!isMobile ? <span>Items 1- {product.length} of {pagination._totalRows}</span> :
                            <div
                                className={cx('showOnMobile')}
                                onClick={() => setShowNavFillter(!showNavFillter)}
                            >
                                <p>Filter</p>
                            </div>}

                        <div className={cx('sort-control')}>
                            <SelectSort
                                values={['Position', 'Prices']}
                                filter={filter}
                                setFilter={setFilter}
                            />
                            {!isMobile && <MdSort className={cx('icon')} />}
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                {showNavFillter && (
                    <Col lg={2} md={3} className={cx('navFilterInmobile')}>
                        <FilterNav filter={filter} setFilter={setFilter} />
                    </Col>
                )}
                <Col lg={10} md={9} sm={12}>
                    {product.length > 0 ? (
                        <>
                            <Row className=" d-flex flex-wrap" >
                                {
                                    product.map((ele) => (
                                        <Col key={ele.id} lg={2} md={4} xs={6}>
                                            <Product primary data={ele} />
                                        </Col>
                                    ))
                                }
                            </Row>
                            <PaginationProduct
                                pagination={pagination}
                                onPageChange={handlePageChange}
                            />
                            <div className={cx('description')} >
                                <div className={cx('content', showDesc ? "show-desc" : "hiden-desc")}>
                                    <p>MSI has unveiled the Prestige Series line of business-class and gaming notebooks. Tuned for color accuracy, the Prestige Series also leverages True Color Technology, which allows users to adjust the display profile to best fit their computing needs.

                                        There are six different screen profiles, which are tuned for gaming, reducing eye fatigue, sRGB color accuracy, increasing clarity for words and lines, reducing harmful blue light, and optimizing contrast for watching movies.
                                        Given the various display profiles and discrete graphics chip, the Prestige Series notebooks can be used for various design work as well as for office tasks given that the screen can be adjusted for better clarity, color accuracy, or for eye strain reduction. Users working with video or 3D rendering will appreciate the "movie mode" for which contrast is increased.

                                        Home users or students can benefit from the "anti-blue" and the "office mode" options, both of which are designed to reduce eye strain. This is helpful when working on the computer for extended periods of time. Additionally, in their down time, students can also use the "gamer mode" to increase the screen brightness.
                                    </p>
                                </div>
                                <Button
                                    outlineGray
                                    onClick={() => setShowDesc(!showDesc)}
                                >
                                    {showDesc ? "Hiden" : "More"}
                                </Button>
                            </div>
                        </>
                    ) : (!isLoading &&
                        <div className={cx('nodata')}>
                            <AiOutlineInbox />
                            <h1>No data</h1>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default Filter;