import classNames from "classnames/bind";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Product from "~/components/Product"
import style from "./Body.module.scss";

const cx = classNames.bind(style)
function ProductsType({ name, category, img }) {


    const [data, setData] = useState(null)

    useEffect(() => {
        const fetAPI = async () => {
            const responceJSON = await fetch(`https://msi-data.herokuapp.com/api/data?categorySlug=${category}&_page=1&_limit=4`)
            const responce = await responceJSON.json()
            setData(responce)
        }
        fetAPI()
    }, [])

    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col lg={2} md={3} sm={12} >
                    <div className={cx('background')} style={{ backgroundImage: `url(${img})` }} >
                        <div className={cx('title')}>
                            <p>{name}</p>
                        </div>
                        <Link to={"/filter"} className={cx('link')} >See all prodcuts</Link>
                    </div>
                </Col>
                <Col lg={10} md={9} sm={12} >
                    <Row>
                        {data && (
                            data.map((ele, index) => (
                                <Col lg={3} sm={6} xs={6} key={index} >
                                    <Product
                                        primary
                                        data={ele}
                                    />
                                </Col>
                            ))
                        )}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default ProductsType;