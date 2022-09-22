import Header from "../conponents/Header";
import Footer from "../conponents/Footer";
import Carousels from "../conponents/Carousels";
import Body from "../conponents/Body";
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                {children}
            </div>
            <Carousels />
            <Body />
            <Footer />
        </div>
    );
}

export default DefaultLayout;