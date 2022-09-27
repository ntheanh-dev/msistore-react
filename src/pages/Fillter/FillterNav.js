import classNames from "classnames/bind";
import { useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { Fragment } from "react";

import img from '~/assets/images/chair.png'
import Button from "~/components/Button";
import style from "./Fillter.module.scss"
const cx = classNames.bind(style)
function FillterNav({ setValueOptions }) {


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
        }
    ]

    return (
        <Fragment>
            <div className={cx('background')} >
                <h1>Filter</h1>
                <Button outline>Clear Filter</Button>

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
                        onClick={e => setValueOptions(prve => ({
                            ...prve,
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
                        onClick={e => setValueOptions(prve => ({
                            ...prve,
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
                            onClick={e => setValueOptions(prve => ({
                                ...prve,
                                color: e.target.value
                            }))}
                        />
                        <input
                            type="color"
                            defaultValue="#ff0000"
                            onClick={e => setValueOptions(prve => ({
                                ...prve,
                                color: e.target.value
                            }))}
                        />
                    </div>
                )}
                <Button primary>Apply Fillters</Button>
            </div>
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
    );
}

export default FillterNav;