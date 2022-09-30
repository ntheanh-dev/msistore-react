import { Container, Row, Col } from "react-bootstrap";
import Pageing from "~/components/Pageing";
import classNames from "classnames/bind";
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdSort } from 'react-icons/md';
import { useSelector } from "react-redux";

import { productRemening } from "./ProductRemaning";
import Product from "~/components/Product";
import FilterNav from "./FilterNav";
import style from "./Filter.module.scss"
import SelectSort from "./SelectSort";
const cx = classNames.bind(style)

function Filter() {

    const navigate = useNavigate();
    let isMobile = useMediaQuery({ query: '(max-width: 576px)' })
    const { items } = useSelector(state => state.products)
    const productAffter = useSelector(productRemening)

    const [showNavFillter, setShowNavFillter] = useState(!isMobile)
    const [isFilter, setIsFlter] = useState(false)

    const [selected, setSelect] = useState('Position')

    return (
        <Container>
            <Pageing pages={['Laptops']} />
            <Row>
                {!isMobile && (
                    <Col lg={2} md={3}>
                        <div className={cx('back')}>
                            <button onClick={() => navigate('/')}>{'< Back'}</button>
                        </div>
                    </Col>
                )}
                <Col lg={10} md={9} sm={12}>
                    <div className={cx('sort-head')}>

                        {!isMobile ? <span>Items 1-35 of 61</span> :
                            <div
                                className={cx('showOnMobile')}
                                onClick={() => setShowNavFillter(!showNavFillter)}
                            >
                                <p>Filter</p>
                            </div>}

                        <div className={cx('sort-control')}>
                            <SelectSort values={['Position', 'Prices']} optionDetector={selected} setSelect={setSelect} />
                            {!isMobile && <MdSort className={cx('icon')} />}
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                {showNavFillter && (
                    <Col lg={2} md={3} className={cx('navFilterInmobile')}>
                        <FilterNav setIsFlter={setIsFlter} />
                    </Col>
                )}
                <Col lg={10} md={9} sm={12}>
                    <Row className=" d-flex flex-wrap" >
                        {isFilter ?
                            productAffter.map((ele) => (
                                <Col key={ele.id} lg={2} md={4} sm={6}>
                                    <Product primary data={ele} />
                                </Col>
                            ))
                            :
                            items.map((ele) => (
                                <Col key={ele.id} lg={2} md={4} sm={6}>
                                    <Product primary data={ele} />
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Filter;