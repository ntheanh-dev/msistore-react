import Home from '../pages/Home';
import Cart from "../pages/Cart";
import Fillter from "../pages/Fillter";
import Footer from "../pages/Footer";

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/fillter', component: Fillter },
    { path: '/footer', component: Footer },
]

const priveRoutes = [

]

export { publicRoutes, priveRoutes } 