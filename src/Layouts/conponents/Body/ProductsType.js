import classNames from "classnames/bind";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import Product from "~/components/Product"
import img from '~/assets/images/laptops/lap2-1.png'
import style from "./Body.module.scss";

const cx = classNames.bind(style)
function ProductsType() {


    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col lg={2} md={3} sm={12} >
                    <div className={cx('background')} >
                        <div className={cx('title')}>
                            <p>Cumstop builds</p>
                        </div>
                        <Link to={"/products"} className={cx('link')} >See all prodcuts</Link>
                    </div>
                </Col>
                <Col lg={10} md={9} sm={12} >
                    <Row className=" d-flex flex-nowrap overflow-hidden" >
                        <Col lg={3} md={6} sm={6} >
                            <Product
                                name={"This is name product"}
                                img={img}
                                oldPrice={500}
                                newPrice={499}
                                review={3}
                                condition={"in stock"}
                            />
                        </Col>
                        <Col lg={3} md={6} sm={6} >
                            <Product
                                name={"This is name product"}
                                img={img}
                                oldPrice={500}
                                newPrice={499}
                                review={3}
                                condition={"in stock"}
                            />
                        </Col>
                        <Col lg={3} md={6} sm={6} >
                            <Product
                                name={"This is name product"}
                                img={img}
                                oldPrice={500}
                                newPrice={499}
                                review={3}
                                condition={"in stock"}
                            />
                        </Col>
                        <Col lg={3} md={6} sm={6} >
                            <Product
                                name={"This is name product"}
                                img={img}
                                oldPrice={500}
                                newPrice={499}
                                review={3}
                                condition={"in stock"}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default ProductsType;