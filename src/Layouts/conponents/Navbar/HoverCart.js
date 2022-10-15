import Tippy from '@tippyjs/react/headless';
import { BsFillCartFill } from "react-icons/bs";
import classNames from "classnames/bind";
import { useNavigate } from 'react-router-dom';
import { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AiOutlineInbox } from "react-icons/ai";
import { useMediaQuery } from 'react-responsive';

import { getTotal } from '~/redux/userSlice';
import Product from '~/components/Product';
import Button from '~/components/Button';
import style from './Navbar.module.scss'
const cx = classNames.bind(style)
function Hovercart({ user }) {
    const navigate = useNavigate()
    const dispath = useDispatch()
    let isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const { id } = user.value
    const { cartTotalQuantity, cartItems } = user.value.cart

    useEffect(() => {
        dispath(getTotal(null));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems])

    return (
        <div>
            <Tippy
                disabled={isTabletOrMobile}
                interactive
                offset={[12, 8]}
                placement='bottom-end'
                render={attrs => (
                    <div className={cx('yourcart')} tabIndex="-1" {...attrs}>
                        <h3 className={cx('heading')}>My cart</h3>
                        <p className={cx('total')}>{cartTotalQuantity} item in cart</p>
                        <Button to={id ? "/yourcart" : '/login'} outline >View or Edit Your Cart</Button>
                        <div className={cx('items')}>
                            {(!id || cartItems.length === 0) && (
                                <div className={cx('nodata')}>
                                    <AiOutlineInbox />
                                    <h1>No data</h1>
                                </div>
                            )}
                            {id && (
                                cartItems.map((product) => (
                                    <Product isHorver data={product} key={product.id} />
                                ))
                            )}
                        </div>
                        <Button primary to={id ? "/yourcart" : '/login'} >Go to Checkout</Button>
                    </div>
                )}
            >
                <div onClick={() => navigate(id ? '/yourcar' : '/login')} className={cx('iconCart')}>
                    <BsFillCartFill />
                    {cartTotalQuantity > 0 && (<div className={cx('quantity')}>
                        <span>{cartTotalQuantity}</span>
                    </div>)}
                </div>
            </Tippy>
        </div>
    );
}

export default memo(Hovercart);