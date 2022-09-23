import Home from '../pages/Home';
import Cart from "../pages/Cart";
import Fillter from "../pages/Fillter";
import Register from '~/pages/SignIng/Register';
import Login from '~/pages/SignIng/Login'

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/yourcart', component: Cart },
    { path: '/fillter', component: Fillter },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
]

const priveRoutes = [

]

export { publicRoutes, priveRoutes } 