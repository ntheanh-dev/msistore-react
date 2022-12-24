import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, getAdditionalUserInfo } from "firebase/auth";

import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
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

export const loginWithFirebase = async (userInfoDispatch, userCartDispatch, navigate, type) => {
    if (type === "googleLogin") {
        const result = await GoogleLogin()
        const { isNewUser, profile } = getAdditionalUserInfo(result)
        if (isNewUser) {
            try {
                await setDoc(doc(db, "users", profile.id), {
                    displayName: profile.name,
                    email: profile.email,
                    uid: profile.id,
                    photoURL: profile.picture,
                    password: -1,
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
    else if (type === "facebookLogin") {
        const result = await FaceBookLogin()
        const { isNewUser, profile } = getAdditionalUserInfo(result)
        console.log(isNewUser, profile)
        if (isNewUser) {
            try {
                await setDoc(doc(db, "users", profile.id), {
                    displayName: profile.name,
                    email: profile.email ? profile.email : 'Do not have eamil to display',
                    uid: profile.id,
                    photoURL: profile.picture.data.url,
                    password: -1,
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
    auth.onAuthStateChanged(user => {
        console.log(user)
        if (user) {
            (async () => {
                const { uid } = user.providerData[0]
                const q = query(collection(db, "users"), where("uid", "==", uid));
                const querySnapshot = await getDocs(q);
                // tim thay user
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    const data = doc.data()
                    const { cart, ...userInfo } = data
                    userInfoDispatch({
                        ...userInfo
                    })
                    userCartDispatch({
                        ...cart
                    })
                    navigate()
                });
            })()
        }
    })
}

export const updateCartData = async (data) => {
    const { uid } = JSON.parse(localStorage.getItem("userLocal"))
    if (uid) {
        const docRef = doc(db, "users", uid);
        setDoc(docRef, {
            cart: {
                ...data
            }
        }, { merge: true })
            .then()
            .catch(e => {
                console.log(e)
            })
    }
}

export const getPasswordFromFirebase = async () => {
    const { uid } = JSON.parse(localStorage.getItem("userLocal"))
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    // tim thay user
    if (querySnapshot.docs.length === 1) {
        let data = null
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data = doc.data()
        });
        return data.password
    }
}

export const LogOut = (dispatchLogoutUser, dispatchLogoutCart) => {
    dispatchLogoutUser()
    dispatchLogoutCart()
    auth.signOut()
}

export { db, app, auth }