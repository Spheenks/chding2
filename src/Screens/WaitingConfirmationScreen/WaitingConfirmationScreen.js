import React, { useState, useEffect } from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import { useUserContext } from "../../UserContext/UserContextProvider";
import { firebase } from "../../../FireConfig/FireConfig";
import 'firebase/database';
import { getDatabase, set, ref } from "firebase/database";
import { Voximplant } from "react-native-voximplant";


const WaitingConfirmationScreen = ({ navigation }) => {

    const [isVerifiedText, setIsVerifiedText] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const { user, sendVerif, setDispname } = useUserContext();

    

    
  

    useEffect(() => {
        setIsVerifiedText('Loading....');

        firebase.auth().currentUser.reload();

        if (firebase.auth().currentUser.emailVerified === true) {
            setDispname();
            navigation.navigate("DashBoard");

        }
        else {
            setIsVerifiedText('VERIFICATION EMAIL HAS BEEN SENT TO YOUR EMAIL');
            sendVerif();
            onLoad(firebase.auth().currentUser.displayName);
            const checkVerification = setInterval(() => {


                if (firebase.auth().currentUser.emailVerified) {
                    firebase.auth().currentUser.reload();
                    setDispname()

                    navigation.navigate("DashBoard");
                }
            }, 1000);
            return () => clearInterval(checkVerification);
        }
    }, []);

    const onLoad = async (userToPersist) => {
        if (firebase.auth().currentUser.emailVerified === false) {
            try {
                const database = getDatabase();
                console.log("WAITING 46", userToPersist);
                const newUserObj = {
                    username: userToPersist,
                };
                set(ref(database, `users/${userToPersist}`), newUserObj);
                // setMyData(newUserObj);
            } catch (error) {
                console.log(error);
            }
        }

    }

    


    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.confirmEmailHeader}>{isVerifiedText}</Text>
        </SafeAreaView>
    )

}



const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        height: '100%',

    },
    confirmEmailHeader: {
        fontSize: 20,
        marginVertical: 5,
        fontWeight: 'bold'
    },
    confirmationPromt: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 10
    }

});

export default WaitingConfirmationScreen;