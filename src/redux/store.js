import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productsReducer from "./productsSlice";
import filterReducer from "./filterSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        products: productsReducer,
        filter: filterReducer
    }
})