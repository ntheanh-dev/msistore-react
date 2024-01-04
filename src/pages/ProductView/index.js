import ProductDetail from "~/components/ProductDetail";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";

import style from './ProducView.module.scss'
import slide from '~/assets/images/detail-slide.png'
import { useState } from "react";
import API, { endpoints } from "~/configs/API";
import LoadingSpinner from "~/components/LoadingSpinner";
const cx = classNames.bind(style)
function ProductView() {
    const [product, setProduct] = useState(null)
    const { productid } = useParams()

    useEffect(() => {
        const fetchApi = async () => {
            const res = await API.get(endpoints['product'](productid))
            setProduct(res.data)
        }
        fetchApi()
        // document.title = `${product[0].name}`
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product])

    return (
        <div className={cx('wrapper')}>
            {product === null ? (
                <LoadingSpinner />
            ) : (
                <ProductDetail
                    data={product}
                />
            )}
            <div className={cx('slider')}>
                <Container>
                    <Row className={cx('slider-content')}>
                        <Col sm={12} md={6}>
                            <div className={cx('slider-desc')}>
                                <div className={cx('slider-heading')}>
                                    Outplay the Competittion
                                </div>
                                <div className={cx('slider-title')}>
                                    Experience a 40% boost in computing from last generation. MSI Desktop equips the 10th Gen. Intel® Core™ i7 processor with the upmost computing power to bring you an unparalleled gaming experience.
                                    *Performance compared to i7-9700. Specs varies by model.
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} md={6}>
                            <div className={cx('slider-img')}>
                                <img src={slide} alt="alt" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default ProductView;