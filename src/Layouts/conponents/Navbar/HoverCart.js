import Tippy from '@tippyjs/react/headless';
import { BsFillCartFill } from "react-icons/bs";
import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
import { memo } from 'react'

import Product from '~/components/Product';
import Button from '~/components/Button';
import img from '~/assets/images/laptops/lap2-1.png'

import style from './Navbar.module.scss'
const cx = classNames.bind(style)
function Hovercart(prop) {

    // Goi api your cart

    return (
        <div>
            <Tippy
                delay={[0, 300]}
                interactive
                offset={[12, 8]}
                placement='bottom-end'
                render={attrs => (
                    <div className={cx('yourcart')} tabIndex="-1" {...attrs}>
                        <h3 className={cx('heading')}>My cart</h3>
                        <p className={cx('total')}>{prop.title} item in cart</p>
                        <Button to={"/yourcart"} outline >View or Edit Your Cart</Button>
                        <div className={cx('items')}>
                            <Product
                                isHorver
                                name={"EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On"}
                                img={img}
                                quanti={3}
                            />
                            <Product
                                isHorver
                                name={"EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On"}
                                img={img}
                                quanti={3}
                            />
                            <Product
                                isHorver
                                name={"EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On"}
                                img={img}
                                quanti={3}
                            />
                            <Product
                                isHorver
                                name={"EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On"}
                                img={img}
                                quanti={3}
                            />
                        </div>
                        <Button primary >Go to Checkout</Button>
                    </div>
                )}
            >
                <Link to="/yourcart" className={cx('iconCart')}>
                    <BsFillCartFill />
                </Link>
            </Tippy>
        </div>
    );
}

export default memo(Hovercart);