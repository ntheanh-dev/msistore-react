import { Container, Row, Col } from "react-bootstrap";
import Pageing from "~/components/Pageing";
import classNames from "classnames/bind";
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdSort } from 'react-icons/md';

import Product from "~/components/Product";
import FillterNav from "./FillterNav";
import style from "./Fillter.module.scss"
import SelectSort from "./SelectSort";
const cx = classNames.bind(style)
function Fillter() {
    let isMobile = useMediaQuery({ query: '(max-width: 576px)' })
    const navigate = useNavigate();
    const [selected, setSelect] = useState('Position')

    const [data, setData] = useState('')

    const [valueOptions, setValueOptions] = useState({
        category: '',
        price: '',
        color: '',
    })

    useEffect(() => {
        const fetAPI = async () => {
            const responceJSON = await fetch(`http://localhost:3000/api/data?_page=1&_limit=10`)
            const responce = await responceJSON.json()
            console.log(responceJSON)
            setData(responce)
        }
        fetAPI()
    }, [])

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

                        {!isMobile ? <span>Items 1-35 of 61</span> : <div className={cx('showOnMobile')}><p>Fillter</p></div>}

                        <div className={cx('sort-control')}>
                            <SelectSort values={['Position', 'Prices']} optionDetector={selected} setSelect={setSelect} />
                            {!isMobile && <MdSort className={cx('icon')} />}
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                {!isMobile && (
                    <Col lg={2} md={3}>
                        <FillterNav setValueOptions={setValueOptions} />
                    </Col>
                )}
                <Col lg={10} md={9} sm={12}>
                    <Row className=" d-flex flex-wrap" >
                        {data && (
                            data.map((ele) => (
                                <Col key={ele.id} lg={2} md={4} sm={6}>
                                    <Product primary data={ele} />
                                </Col>
                            ))
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Fillter;