import axios from "axios";
import cookie from "react-cookies";

// const BASE_URL = "http://127.0.0.1:8000/"
const BASE_URL = "https://ntheanh.pythonanywhere.com/"
export const endpoints = {
    'register': '/users/',
    'current-user': '/users/current-user/',
    'change-password': '/users/change-password/',
    'user-info': '/userinfo/current_info/',
    'user-info-update': (userId) => `/userinfo/${userId}/`,
    'login': '/o/token/',
    'products': '/products/',
    'product': (productId) => `/products/${productId}/`,
    'product_filter': (pagrams) => `/products/?${pagrams}`,
    'order': '/order/create/',
    'receipt': '/order/get-receipt/',
    'refresh-tokent': '/o/token/',
    'payment': '/order/payment/',
    'category': '/category/',

}

export const authAPI = () => axios.create({
    baseURL: BASE_URL,
    headers: {
        "Authorization": `Bearer ${cookie.load('access-token')}`
    }

})

export default axios.create({
    baseURL: BASE_URL
})
