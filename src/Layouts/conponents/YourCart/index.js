import classNames from "classnames/bind";
import { Container, Row, Col } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive'

import Pageing from "~/components/Pageing";
import img from "~/assets/images/laptops/lap1-1.png"
import ProductInCart from "./ProductInCart";
import Button from "~/components/Button";
import style from './YourCart.module.scss';
const cx = classNames.bind(style)
function YourCart() {

    let isMobile = useMediaQuery({ query: '(max-width: 426px)' })

    const checkoutItems = [
        {
            title: "Subtotal",
            ship: "$13,047.00" // API
        },
        {
            title: "Shipping",
            ship: "$21.00"
        },
        {
            title: "Tax",
            ship: "$1.91"
        },
        {
            title: "Order Total",
            ship: "$13,068.00" // Api
        }
    ]

    return (
        <Container>
            <Pageing pages={["Cart"]} />
            <h1 className={cx('Cart-Head')}>Shopping Cart</h1>
            <Row>
                <Col lg={9} sm={12}>
                    {
                        !isMobile &&
                        <div className={cx('titles')}>
                            <Row>
                                <Col md={2}>Item</Col>
                                <Col md={4}></Col>
                                <Col md={2}>Price</Col>
                                <Col md={1}>Quanty</Col>
                                <Col md={2}>Subtotal</Col>
                                <Col md={1}></Col>
                            </Row>
                        </div>
                    }
                    <ProductInCart
                        img={img}
                        name={"MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty"}
                        price={4349}
                        quanti={3}
                    />
                    <div className={cx('buttons')}>
                        <Button outlineGray>Continue Shopping</Button>
                        <Button black>Clear Shopping Cart</Button>
                        <Button black>Update Shopping Cart</Button>
                    </div>
                </Col>

                <Col lg={3} sm={12} className={cx('right')}>
                    <h1 className={cx('right-head')}>Summary</h1>
                    <ul className={cx('menu')}>
                        {
                            checkoutItems.map((item, index) => (
                                <li key={index}>
                                    <h2>{item.title}</h2>
                                    <span>{item.ship}</span>
                                </li>
                            ))
                        }
                    </ul>
                    <Button primary>Proceed to Checkout</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default YourCart;