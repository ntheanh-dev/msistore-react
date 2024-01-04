import Home from '../pages/Home';
import Cart from "../pages/Cart";
import Filter from "../pages/Filter";
import Register from '~/pages/SignIng/Register';
import Login from '~/pages/SignIng/Login'
import ProductView from '~/pages/ProductView';
import CommingSoon from '~/pages/CommingSoon';
import UserDashboard from '~/pages/UserDashboard';
import Checkout from '~/pages/Checkout';
import ContactUs from '~/pages/ContactUs';
import OrderSuccess from '~/pages/OrderSuccess';
import NotFound from '~/pages/NotFound';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/yourcart', component: Cart },
    { path: '/filter', component: Filter },
    { path: '/filter/:pagrams', component: Filter },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/dashboard', component: UserDashboard },
    { path: '/dashboard/myorders', component: UserDashboard },
    { path: '/dashboard/account', component: UserDashboard },
    { path: '/dashboard/address', component: UserDashboard },
    { path: '/products/:productid', component: ProductView },
    { path: '/comming', component: CommingSoon },
    { path: '/checkout', component: Checkout },
    { path: '/contactus', component: ContactUs },
    { path: '/checkout/receipt/:uuid', component: OrderSuccess },
    { path: '*', isNotDefault: true, component: NotFound },
]

const priveRoutes = [

]

export { publicRoutes, priveRoutes } 