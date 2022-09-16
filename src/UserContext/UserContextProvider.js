import { createContext, useEffect, useState, useContext } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    sendPasswordResetEmail,

} from 'firebase/auth';
import { authentication } from "../../Firebase/AuthFirebase";
import { firebase } from "../../FireConfig/FireConfig";
import { isBioEnabled, storedEmail, storedPassword } from "../Constants/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";



const UserContext = createContext({});
export const useUserContext = () => useContext(UserContext);
export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [trimmedUser, setTrimmedUser] = useState('');

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(authentication, res => {
            res ? setUser(res) : setUser(null)
            setError("");
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    //////////////////////////////////////////////////////1 REGISTER
    const registerUser = (email, password) => {
        setLoading(true);
        createUserWithEmailAndPassword(authentication, email, password)
            .then(() => {

                const trimmed = email.split('@')[0];
                const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
                const noSpecial = trimmed.replace(regex, '');

                return updateProfile(authentication.currentUser, {
                    displayName: noSpecial
                });

            })
            .then((res) => console.log("CONTEXT 51", res))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }

    //////////////////////////////////////////////////////2 SIGNIN
    const signInUser = (email, password) => {
        setLoading(true);
        signInWithEmailAndPassword(authentication, email, password)
            .then((res) => {
                console.log("CONTEXT 60", res)
            })
            .catch((err) => setError(err.message))
            .finally(() => {
                setLoading(false)
            });
    }
    //////////////////////////////////////////////////////LOGOUT
    const logoutUser = () => {
        signOut(authentication);
        try {
            AsyncStorage.multiSet([[storedEmail, ''], [storedPassword, ''], [isBioEnabled, '']]);
        } catch (error) {
            console.log("USER CONTEXT LINE 76", error);
        }

    }

    //////////////////////////////////////////////////////4 FORGOT PASSWORD
    const forgotPassword = (email) => {
        return sendPasswordResetEmail(authentication, email);
    }


    const sendVerif = async () => {
        firebase.auth().currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://ekonsulta-d7895.firebaseapp.com",
        }).then(() => {
            console.log("Verification email sent");
        }).catch((re) => {
            console.log("USER CONTEXT LINE 40", re);
        })
    }

    const setDispname = () => {

        setTrimmedUser(authentication.currentUser.displayName);
        console.log("CONTEXT 68", authentication.currentUser.displayName);

    }
    const contextValue = {
        user,
        trimmedUser,
        loading,
        error,
        registerUser,
        signInUser,
        logoutUser,
        forgotPassword,
        sendVerif,
        setDispname
    }
    return (<UserContext.Provider
        value={contextValue}>
        {children}
    </UserContext.Provider>
    );

};