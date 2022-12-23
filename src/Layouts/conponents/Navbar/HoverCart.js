import Tippy from '@tippyjs/react/headless';
import classNames from "classnames/bind";
import { useNavigate, useLocation } from 'react-router-dom';
import { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AiOutlineInbox, AiOutlineShoppingCart } from "react-icons/ai";
import { useMediaQuery } from 'react-responsive';

import { getTotal } from '~/redux/userCartSlice';
import Product from '~/components/Product';
import Button from '~/components/Button';
import style from './Navbar.module.scss'
const cx = classNames.bind(style)
function Hovercart({ cart, hasUser }) {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const dispath = useDispatch()
    let isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const { cartTotalQuantity, cartItems } = cart

    useEffect(() => {
        dispath(getTotal(null));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems])

    return (
        <>
            <Tippy
                disabled={isTabletOrMobile || !hasUser || pathname === '/yourcart'}
                interactive
                offset={[12, 8]}
                placement='bottom-end'
                render={attrs => (
                    <div className={cx('yourcart')} tabIndex="-1" {...attrs}>
                        <h3 className={cx('heading')}>My cart</h3>
                        <p className={cx('total')}>{cartTotalQuantity} item in cart</p>
                        <Button to={hasUser ? "/yourcart" : '/login'} outline >View or Edit Your Cart</Button>
                        <div className={cx('items')}>
                            {(!hasUser || cartItems.length === 0) && (
                                <div className={cx('nodata')}>
                                    <AiOutlineInbox />
                                    <h1>No data</h1>
                                </div>
                            )}
                            {hasUser && (
                                cartItems.map((product) => (
                                    <Product isHorver data={product} key={product.id} />
                                ))
                            )}
                        </div>
                        <Button primary to={hasUser ? "/yourcart" : '/login'} >Go to Checkout</Button>
                    </div>
                )}
            >
                <div onClick={() => navigate(hasUser ? '/yourcart' : '/login')} className={cx('iconCart')}>
                    <AiOutlineShoppingCart />
                    {cartTotalQuantity > 0 && (<div className={cx('quantity')}>
                        <span>{cartTotalQuantity}</span>
                    </div>)}
                </div>
            </Tippy>
        </>
    );
}

export default memo(Hovercart);