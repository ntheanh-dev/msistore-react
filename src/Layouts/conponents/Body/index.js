import { Container } from "react-bootstrap";

import InforAuthor from "./inforAuthor";
import ProductsType from "./ProductsType";
import Brands from "./Brands";
import img from '../../../assets/images/laptoptype.png'
function Body() {
    return (
        <Container>
            <InforAuthor />
            <ProductsType name={'Cumstom builds'} img={img} />
            <Brands />
        </Container>
    );
}

export default Body;