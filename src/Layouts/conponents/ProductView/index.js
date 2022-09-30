import ProductDetail from "~/components/ProductDetail";
import { useParams } from "react-router-dom";
import { memo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import { setId } from "~/redux/filterSlice";
import { ProductById } from "./ProductById";
import style from './ProducView.module.scss'
import slide from '~/assets/images/detail-slide.png'
const cx = classNames.bind(style)
function ProductView() {

    const dispatch = useDispatch()
    const { productid } = useParams()

    dispatch(setId(productid))
    const product = useSelector(ProductById)

    // const [data, setData] = useState('')

    // useEffect(() => {
    //     const fetAPI = async () => {
    //         const responceJSON = await fetch(`https://msi-data.herokuapp.com/api/data/${productid}`)
    //         const responce = await responceJSON.json()
    //         setData(responce)
    //     }

    //     fetAPI()
    // }, [])
    return (
        <div>
            {product[0] && (
                <ProductDetail
                    data={product[0]}
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

export default memo(ProductView);