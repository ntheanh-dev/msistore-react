import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productsReducer from "./productsSlice";
import authSlice from "./authSlice";
import userCartSlice from "./userCartSlice";
import userAddressSlice from "./userAddressSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        products: productsReducer,
        auth: authSlice,
        userCart: userCartSlice,
        userAddress: userAddressSlice,
    }
})
