import InforAuthor from "./inforAuthor";
import ProductsType from "./ProductsType";
import { Container } from "react-bootstrap";

import img from '../../../assets/images/laptoptype.png'
function Body() {
    return (
        <Container>
            <InforAuthor />
            <ProductsType name={'Cumstom builds'} img={img} />
        </Container>
    );
}

export default Body;