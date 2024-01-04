import Header from "../sections/Header";
import Footer from "../sections/Footer";
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