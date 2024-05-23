import axios from 'axios';
import cookie from 'react-cookies';

// const BASE_URL = "http://127.0.0.1:8000/"
const BASE_URL = 'https://ntheanh.pythonanywhere.com/';

const baseURLV2 = 'https://localhost:7122/';

export const endpoints = {
    register: '/users/',
    'current-user': '/users/current-user/',
    'change-password': '/users/change-password/',
    'user-info': '/userinfo/current_info/',
    'user-info-update': (userId) => `/userinfo/${userId}/`,
    login: '/o/token/',
    products: 'api/products/',
    product: (productId) => `api/products/${productId}/`,
    product_filter: (pagrams) => `api/products/?${pagrams}`,
    order: '/order/create/',
    receipt: '/order/get-receipt/',
    'refresh-tokent': '/o/token/',
    payment: '/order/payment/',
    category: '/category/',
};

export const endpointsV2 = {
    'register-user': 'create-user',
    'login-user': 'Login',
    'current-user': 'current-user',
};
export const authAPI = () =>
    axios.create({
        baseURL: baseURLV2,
        headers: {
            Authorization: `Bearer ${cookie.load('access-token')}`,
        },
    });

export default axios.create({
    baseURL: baseURLV2,
});
