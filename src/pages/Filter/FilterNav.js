import classNames from "classnames/bind";
import { useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Row, Col } from "react-bootstrap";

import { setFilters } from "~/redux/filterSlice";
import img from '~/assets/images/chair.png'
import Button from "~/components/Button";
import style from "./Filter.module.scss"
import msi from '~/assets/images/brands/msi.png';
import adata from '~/assets/images/brands/adata.png';
import gigabyte from '~/assets/images/brands/gigabyte.png';
import hp from '~/assets/images/brands/hp.png';
import razez from '~/assets/images/brands/razez.png';
import roccat from '~/assets/images/brands/roccat.png';
const cx = classNames.bind(style)

function FilterNav({ setIsFlter }) {
    const isMobile = useMediaQuery({ query: '(max-width: 576px)' })
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    const handleSetFilter = () => {
        setIsFlter(true);
    }
    const getQtyFilter = (filter) => {
        return Object.keys(filter).reduce((prve, key) => {
            if (filter[key] !== '') {
                return prve + 1
            }
            return prve
        }, 0)
    }

    const handleClearFilter = () => {
        setIsFlter(false);
        dispatch(setFilters({
            category: '',
            price: '',
            color: '',
        }))
    }

    const [toogleList, setToogleList] = useState({
        category: false,
        price: false,
        color: false
    })
    const categoryList = [
        {
            title: 'CUSTOM PCS',
            value: 'custompcs',
            id: 1
        },
        {
            title: 'MSI ALL-IN-ONE',
            value: 'masiallinone',
            id: 2
        }
    ]
    const priceList = [
        {
            title: '$0.00 - $100.00',
            value: 100,
            id: 3
        },
        {
            title: '$100.00 - $200.00',
            value: 200,
            id: 4
        },
        {
            title: '$200.00 - $300.00',
            value: 300,
            id: 5
        },
        {
            title: '$300.00 - $400.00',
            value: 400,
            id: 6
        },
        {
            title: '$400.00 - $500.00',
            value: 500,
            id: 7
        },
        {
            title: '$500.00 - $600.00',
            value: 600,
            id: 8
        },
        {
            title: '$600.00 - $700.00',
            value: 700,
            id: 9
        },
        {
            title: '$700.00 - $800.00',
            value: 800,
            id: 10
        },
        {
            title: '$800.00 - $900.00',
            value: 900,
            id: 11
        },
        {
            title: '$900.00 - $1.000.00',
            value: 1000,
            id: 12
        },
        {
            title: '$1.000.00 - $1.100.00',
            value: 1100,
            id: 13
        },
        {
            title: '$1.100.00 - $1.200.00',
            value: 1200,
            id: 14
        },
        {
            title: '$1.200.00 - $1.300.00',
            value: 1300,
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
    return (
        <Fragment>
            <div className={cx('background')} >
                {!isMobile && <h1>Filter</h1>}
                {!isMobile && <Button outline onClick={handleClearFilter}>Clear Filter</Button>}

                <div
                    className={cx('heading')}
                    onClick={() => setToogleList({ ...toogleList, category: !toogleList.category })}
                >
                    <h2>Category</h2>
                    {toogleList.category ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </div>
                {toogleList.category && categoryList.map(ele => (
                    <option
                        key={ele.id}
                        value={ele.value}
                        onClick={e => dispatch(setFilters({
                            ...filter,
                            category: e.target.value
                        }))}
                    >
                        {ele.title}
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
                        value={ele.value}
                        onClick={e => dispatch(setFilters({
                            ...filter,
                            price: e.target.value
                        }))}
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
                            onClick={e => dispatch(setFilters({
                                ...filter,
                                color: e.target.value
                            }))}
                        />
                        <input
                            type="color"
                            defaultValue="#ff0000"
                            onClick={e => dispatch(setFilters({
                                ...filter,
                                color: e.target.value
                            }))}
                        />
                    </div>
                )}
                {isMobile && <Button outline onClick={handleClearFilter}>Clear Filter</Button>}
                <Button primary onClick={handleSetFilter} >Apply filters  ({getQtyFilter(filter)})</Button>
            </div>
            {!isMobile && (
                <Fragment>
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
                </Fragment>
            )}
        </Fragment>
    );
}

export default FilterNav;