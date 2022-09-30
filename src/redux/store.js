import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productsReducer from "./productsSlice";
import shoppingCartReducer from "./shoppingCart";
import filterReducer from "./filterSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        products: productsReducer,
        cart: shoppingCartReducer,
        filter: filterReducer
    }
})