import { Container } from "react-bootstrap";

import InforAuthor from "./inforAuthor";
import ProductsType from "./ProductsType";
import Review from "../Review";
import Brands from "./Brands";
import lap from '~/assets/images/laptoptype.png'
import des from '~/assets/images/destoptype.png'
function Body() {
    return (
        <Container>
            <InforAuthor />
            <ProductsType name={'MSI Laptops'} img={lap} cateId={6} />
            <ProductsType name={'Desktops'} img={des} cateId={2} />
            <Brands />
            <Review />
        </Container>
    );
}

export default Body;