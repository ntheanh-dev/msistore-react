import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, getAdditionalUserInfo } from "firebase/auth";

import { collection, addDoc, query, where, getDocs, getDoc } from "firebase/firestore";
import { GoogleLogin, FaceBookLogin } from '~/redux/authSlice';

const firebaseConfig = {
    apiKey: "AIzaSyC83f0lUBlx2346DJoyb0Vx3xj9CUAb2wA",
    authDomain: "my-msi-store.firebaseapp.com",
    projectId: "my-msi-store",
    storageBucket: "my-msi-store.appspot.com",
    messagingSenderId: "296166125323",
    appId: "1:296166125323:web:aa15dec2355bd283333c0e",
    measurementId: "G-H2F4XSKVEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const setUserData = async (loginDispach, naviage, type) => {
    if (type === "googleLogin") {
        const result = await GoogleLogin()
        const { isNewUser, profile } = getAdditionalUserInfo(result)
        if (isNewUser) {
            try {
                await addDoc(collection(db, "users"), {
                    displayName: profile.name,
                    email: profile.email,
                    uid: profile.id,
                    photoURL: profile.picture,
                    cart: {
                        cartItems: [],
                        cartTotalAmount: 0,
                        cartTotalQuantity: 0,
                    }
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }
    // else if (type === "facebookLogin") {
    //     const result = await FaceBookLogin()
    //     const { isNewUser, profile } = getAdditionalUserInfo(result)
    //     if (isNewUser) {
    //         const data = {
    //             displayName: profile.name,
    //             email: profile.email,
    //             uid: profile.id,
    //             photoURL: profile.picture
    //         }
    //         console.log(data)
    //     }
    // }
    auth.onAuthStateChanged(user => {
        if (user) {
            // loginDispach({
            //     displayName: user.displayName,
            //     email: user.email,
            //     uid: user.uid,
            //     photoURL: user.photoURL
            // });
            console.log("Changed: 1")
        }
    })
}

export { db, app, auth }