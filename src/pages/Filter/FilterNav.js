import classNames from "classnames/bind";
import { useState, memo, useEffect } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { Row, Col } from "react-bootstrap";

import img from '~/assets/images/chair.png'
import Button from "~/components/Button";
import style from "./Filter.module.scss"
import msi from '~/assets/images/brands/msi.png';
import adata from '~/assets/images/brands/adata.png';
import gigabyte from '~/assets/images/brands/gigabyte.png';
import hp from '~/assets/images/brands/hp.png';
import razez from '~/assets/images/brands/razez.png';
import roccat from '~/assets/images/brands/roccat.png';
import queryString from "query-string"
import { useNavigate } from "react-router-dom";
import API, { endpoints } from "~/configs/API";

const cx = classNames.bind(style)

function FilterNav({ filter, setFilter }) {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' })
    let isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const navigate = useNavigate();
    const [tempFilter, setTempFilter] = useState(filter)
    const [cate, setCate] = useState([])
    const INIT_TOGGLE_LIST = {
        category: false,
        price: false,
        color: false
    }
    const [toogleList, setToogleList] = useState(INIT_TOGGLE_LIST)

    const handleApplyFilter = () => {
        const { color, ...otherFilter } = filter
        const paramstring = queryString.stringify(otherFilter)
        setFilter(tempFilter)
        setToogleList(INIT_TOGGLE_LIST)
        navigate(`/filter/?${paramstring}`)
    }

    const handleSetFilter = (e, type) => {
        if (type === 'price') {
            const prices = e.target.text.split(' - ')
            if (prices.length == 2) {
                setTempFilter({
                    ...filter,
                    fromPrice: convertDecimalNumber(prices[0].slice(1, -3)),
                    toPrice: convertDecimalNumber(prices[1].slice(1, -3))
                })
            } else {
                const fromPrice = e.target.text.split(' ')[0].slice(1, -3)
                setTempFilter({
                    ...filter,
                    fromPrice: convertDecimalNumber(fromPrice),
                })
            }
            setToogleList({ ...toogleList, price: false })
        } else if (type === 'cate') {
            setTempFilter({
                ...filter,
                cateId: e.target.value
            })
            setToogleList({ ...toogleList, category: false })
        }
    }

    const convertDecimalNumber = (str) => {
        let n = Number(str)
        return n > 100 ? n : n * 1000
    }

    const handleClearFilter = () => {
        setFilter({
            page: 1,
            page_size: (isMobile && 12) || (isTabletOrMobile && 9) || 12
        })
        setTempFilter({
            page: 1,
            page_size: (isMobile && 12) || (isTabletOrMobile && 9) || 12
        })
        setToogleList(INIT_TOGGLE_LIST)
    }

    const getNumFilter = (filter) => {
        return Object.keys(filter).reduce((agr, key) => {
            if (key.includes('fromPrice') || key.includes('cateId') || key.includes('color')) {
                return agr + 1
            }
            return agr
        }, 0)
    }

    const priceList = [
        {
            title: '$0.00 - $300.00',
            id: 3
        },
        {
            title: '$300.00 - $600.00',
            id: 4
        },
        {
            title: '$600.00 - $900.00',
            id: 5
        },
        {
            title: '$900.00 - $1.200.00',
            id: 99
        },
        {
            title: '$1.200.00 - $.1500.00',
            id: 6
        },
        {
            title: '$1.500.00 - $1.800.00',
            id: 7
        },
        {
            title: '$1.800.00 - $2.100.00',
            id: 8
        },
        {
            title: '$2.100.00 - $2.500.00',
            id: 9
        },
        {
            title: '$2.500.00 - $2.800.00',
            id: 10
        },
        {
            title: '$2.800.00 - $3.100.00',
            id: 11
        },
        {
            title: '$3.100.00 - $3.400.00',
            id: 12
        },
        {
            title: '$3.400.00 - $3.700.00',
            id: 13
        },
        {
            title: '$3.700.00 - $4.000.00',
            id: 14
        },
        {
            title: '$4.000.00 And Above',
            id: 15
        }
    ]
    const brands = [
        {
            name: msi,
            href: "https://www.vn.msi.com",
        },
        {
            name: roccat,
            href: "https://ca.roccat.com/",
        },
        {
            name: razez,
            href: "https://www.razer.com/",
        },
        {
            name: gigabyte,
            href: "https://www.gigabyte.com/vn",
        },
        {
            name: hp,
            href: "https://www.hp.com/us-en/shop/cat/laptops",
        },
        {
            name: adata,
            href: "https://www.adata.com/vn/",
        }
    ]
    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const res = await API.get(endpoints['category'])
                setCate(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchAPI()
    }, [])
    return (
        <>
            <div className={cx('background')} >
                {!isMobile && <h1>Filter</h1>}
                {!isMobile && <Button outline onClick={handleClearFilter}>Clear Filter</Button>}

                <div
                    className={cx('heading')}
                    onClick={() => setToogleList({ ...toogleList, category: !toogleList.category })}
                >
                    <h2>Category</h2>
                    {toogleList?.category ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </div>
                {toogleList.category && cate?.map(ele => (
                    <option
                        key={ele.id}
                        onClick={e => handleSetFilter(e, 'cate')}
                        fromPrice={2300}
                        value={ele.id}
                    >
                        {ele.name}
                    </option>
                ))
                }

                <div
                    className={cx('heading')}
                    onClick={() => setToogleList({ ...toogleList, price: !toogleList.price })}
                >
                    <h2>Prices</h2>
                    {toogleList.price ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </div>

                {toogleList.price && priceList.map(ele => (
                    <option
                        key={ele.id}
                        onClick={e => handleSetFilter(e, 'price')}
                    >
                        {ele.title}
                    </option>
                ))}

                <div
                    className={cx('heading')}
                    onClick={() => setToogleList({ ...toogleList, color: !toogleList.color })}
                >
                    <h2>Color</h2>
                    {toogleList.color ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </div>
                {toogleList.color && (
                    <div className={cx('colors')}>
                        <input
                            type="color"
                            defaultValue='black'
                            onClick={e => setTempFilter({
                                ...filter,
                                color: e.target.value
                            })}
                        />
                        <input
                            type="color"
                            defaultValue="#ff0000"
                            onClick={e => setTempFilter({
                                ...filter,
                                color: e.target.value
                            })}
                        />
                    </div>
                )}
                {isMobile && <Button outline onClick={handleClearFilter}>Clear Filter</Button>}
                <Button primary onClick={handleApplyFilter}>Apply filters {getNumFilter(tempFilter) > 0 && `( ${getNumFilter(tempFilter)} )`} </Button>
            </div>
            {!isMobile && (
                <>
                    <div className={cx('brands')}>
                        <h1>Brands</h1>
                        <Button outlineGray>All brands</Button>
                    </div>
                    <Row >
                        {brands.map((brand, index) => (
                            <Col md={6} key={index} className={cx('brand')} ><img src={brand.name} alt="alt" /></Col>
                        ))}
                    </Row>
                    <div className={cx('background')} >
                        <h1>Compare Products</h1>
                        <p>You have no items to compare</p>
                    </div>
                    <div className={cx('background')} >
                        <h1>My Wish List</h1>
                        <p>You have no items in your wish list</p>
                    </div>
                    <div className={cx('img')}>
                        <img src={img} alt="alt" />
                    </div>
                </>
            )}
        </>
    );
}

export default memo(FilterNav);