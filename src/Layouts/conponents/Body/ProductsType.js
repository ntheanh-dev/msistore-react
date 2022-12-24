import classNames from "classnames/bind";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive'

import ProductSkeleton from "~/components/ProductSkeleton";
import Product from "~/components/Product"
import style from "./Body.module.scss";

const cx = classNames.bind(style)
function ProductsType({ name, category, img }) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    let isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
    let isMobile = useMediaQuery({ query: '(max-width: 426px)' })

    useEffect(() => {
        const fetAPI = async () => {
            const responceJSON = await fetch(`https://json-server-sand.vercel.app/api/data?categorySlug=${category}&_page=1&_limit=${isTabletOrMobile ? 2 : 4}`)
            const responce = await responceJSON.json()
            const { data } = responce
            setData(data)
            setIsLoading(false)
        }
        fetAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        {/* {data.length > 0 && (
                            data.map((ele, index) => (
                                <Col lg={3} sm={6} xs={6} key={index} >
                                    <Product
                                        primary
                                        data={ele}
                                    />
                                </Col>
                            ))
                        )} */}
                        {isLoading ? (
                            Array(isMobile ? 2 : 4)
                                .fill()
                                .map((item, index) => {
                                    return (
                                        <Col lg={3} sm={6} xs={6} key={index}  >
                                            <ProductSkeleton />
                                        </Col>
                                    )
                                })
                        ) : (
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