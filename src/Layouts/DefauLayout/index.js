import Header from "../conponents/Header";
import Footer from "../conponents/Footer";
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;