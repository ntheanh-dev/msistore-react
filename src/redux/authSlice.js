import { createSlice } from "@reduxjs/toolkit";
import {
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider,
} from "firebase/auth";

import { auth } from "~/components/firebase/config";
const GoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
}

const FaceBookLogin = async () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
};

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        displayName: null,
        email: null,
        uid: null,
        photoURL: null
    },
    reducers: {
        setLogin: (state, action) => {
            state.displayName = action.payload.displayName
            state.email = action.payload.email
            state.uid = action.payload.uid
            state.photoURL = action.payload.photoURL
        }
    }
})
export const { setLogin } = authSlice.actions
export { GoogleLogin, FaceBookLogin }
export default authSlice.reducer
