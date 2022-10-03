import Tippy from '@tippyjs/react/headless';
import { BsFillCartFill } from "react-icons/bs";
import classNames from "classnames/bind";
import { useNavigate } from 'react-router-dom';
import { memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { getTotal } from '~/redux/userSlice';
import Product from '~/components/Product';
import Button from '~/components/Button';
import style from './Navbar.module.scss'
const cx = classNames.bind(style)
function Hovercart({ link }) {
    const navigate = useNavigate()
    const dispath = useDispatch()
    const cart = useSelector(state => state.user.value.cart)
    const { id } = useSelector(state => state.user.value)

    useEffect(() => {
        dispath(getTotal(null));
    }, [cart])

    const { cartTotalQuantity } = useSelector(state => state.user.value.cart)

    return (
        <div>
            <Tippy
                // delay={[0, 200]}
                interactive
                offset={[12, 8]}
                placement='bottom-end'
                render={attrs => (
                    <div className={cx('yourcart')} tabIndex="-1" {...attrs}>
                        <h3 className={cx('heading')}>My cart</h3>
                        <p className={cx('total')}>{cartTotalQuantity} item in cart</p>
                        <Button to={id ? "/yourcart" : '/'} outline >View or Edit Your Cart</Button>
                        <div className={cx('items')}>
                            {(!id || cart.cartItems.length === 0) && (
                                <div className={cx('no-item')}>
                                    <span>Notthing</span>
                                </div>
                            )}
                            {id && (
                                cart.cartItems.map((product) => (
                                    <Product isHorver data={product} key={product.id} />
                                ))
                            )}
                        </div>
                        <Button primary to={id && "/yourcart"} >Go to Checkout</Button>
                    </div>
                )}
            >
                <div onClick={() => navigate(link)} className={cx('iconCart')}>
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