import Header from "../conponents/Header";
import Footer from "../conponents/Footer";
function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default DefaultLayout;