import Home from '../pages/Home';
import Cart from "../pages/Cart";
import Filter from "../pages/Filter";
import Register from '~/pages/SignIng/Register';
import Login from '~/pages/SignIng/Login'
import ProductView from '~/pages/ProductView';
import NotFount from '~/pages/NotFound';
import CommingSoon from '~/pages/CommingSoon';
import UserDashboard from '~/pages/UserDashboard';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/yourcart', component: Cart },
    { path: '/filter', component: Filter },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/dashboard', component: UserDashboard },
    { path: '/product/:productid', component: ProductView },
    { path: '/comming', component: CommingSoon },
    { path: '*', isNotDefault: true, component: NotFount },
]

const priveRoutes = [

]

export { publicRoutes, priveRoutes } 