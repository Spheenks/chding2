import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { getDoc, doc, updateDoc } from 'firebase/firestore/lite';
import { db } from '../../../Firebase/AuthFirebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from "../../UserContext/UserContextProvider";
import { isBioEnabled, storedEmail, storedPassword, loginScreen } from '../../Constants/Constants';
import CustomButton from "../../components/CustomButton";
import {Voximplant} from 'react-native-voximplant';
import { firebase } from "../../../FireConfig/FireConfig";
import { APP_NAME, ACC_NAME } from "../../Constants/Constants";



const DashboardScreen = ({ navigation }) => {
    let credKeys = [storedEmail, storedPassword, isBioEnabled];
    const { user, logoutUser, loading } = useUserContext();
    const [account, setAccount] = useState(null);
    const [currentUserEmail, setCurrentUserEmail] = useState('');
    const [storedAsyncedEmail, setStoredAsyncedEmail] = useState('');
    const [storedAsyncedPassword, setStoredAsyncedPassword] = useState('');
    const [currentPage, setCurrentPage] = useState('ChatList');


    // const client = Voximplant.getInstance();

    useEffect(() => {

        getAsyncedEmail();

        if (user) {
            const dispName = user.displayName;
            const fqUsername = `${dispName}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
            console.log(fqUsername);

            // const connect = async () => {
            //     const status = await voximplant.getClientState();
            //     console.log("DASH 29", status);
            //     if (status === Voximplant.ClientState.DISCONNECTED) {
            //         await voximplant.connect();
            //     }
            // }
            // connect();

            // logVoxi();

            ReadAccountData();
            setCurrentUserEmail(user.email);
        }
    }, []);
    const goToChat = () => {

        navigation.navigate("ConsultListing");

    }
    // const logVoxi = async () => {
    //     if (user) {
    //         try {
    //             const dispName = user.displayName;
    //             const fqUsername = `${dispName}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
    //             voximplant.login(fqUsername, storedAsyncedPassword);
    //         } catch (error) {
    //             console.log("DASH 49", error);
    //             Alert.alert(e.name, `Error Code:${e.code}`);
    //         }
    //     }

    // }
    const UpdateAccountBioEn = async () => {
        setAsyncBio();
        updateDoc(doc(db, 'accounts', user.email), {
            isBiometricEnable: true
        }).then(() => {
            console.log("updated");
        }).catch((error) => {
            console.log("DASHBOARD SCREEN LINE 33", error);
        })
    }

    const getAsyncedEmail = async () => {

        const asyncedEmail = await AsyncStorage.getItem(storedEmail);
        const asyncedPassword = await AsyncStorage.getItem(storedPassword);

        if (asyncedEmail !== null) {
            setStoredAsyncedEmail(asyncedEmail);
        }
        if (asyncedPassword !== null) {
            setStoredAsyncedPassword(asyncedPassword);
        }

    }
    const onSignOutPressed = () => {
        logoutUser();
        setb();
        navigation.navigate("Login");
    }
    async function setb() {
        try {
            await AsyncStorage.multiRemove(credKeys);
            AsyncStorage.multiSet([[storedEmail, ''], [storedPassword, ''], [isBioEnabled, '']]);
        } catch (error) {
            console.log("DASHBOARD SCREEN LINE 46", error);
        }
    }
    function ReadAccountData() {
        const myDoc = doc(db, "accounts", user.email)
        getDoc(myDoc).then((snapshot) => {
            if (!snapshot.empty) {
                setAccount(snapshot.data());
            } else {
                alert("NOTHING FOUND")
            }
        }).catch((error) => {
            console.log("LOGIN SCREEN LINE 63", error);
        })
    }
    function setAsyncBio() {
        try {
            AsyncStorage.setItem(isBioEnabled, 'true');
        } catch (error) {
            console.log("DASHBOARD SCREEN LINE 65", error);
        }
    }

    return (
        <View style={styles.root}>
            {loading === true ?
                <>
                    <Text>
                        BOBO KA
                    </Text>

                </>
                :
                <>
                    <Text>
                        {currentUserEmail}
                    </Text>

                    <Button title='Logout' onPress={onSignOutPressed} />
                    <Button title='Enable Biometric Auth' onPress={UpdateAccountBioEn} />
                    <CustomButton
                        text="FIND A FUCKING DOCTOR"
                        onPress={goToChat}
                        buttonType="LOGIN"
                        textType="LOGIN"
                    />

                </>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    registerHeader: {
        fontSize: 50,

    },
    root: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
        height: '100%'
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        height: 100,
    },
    registerHeaderCont: {
        padding: 5,
        alignItems: 'center',

    },
});
export default DashboardScreen;