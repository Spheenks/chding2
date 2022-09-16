import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { useUserContext } from "../../UserContext/UserContextProvider";

const ResetPasswordScreen = () => {
    const {forgotPassword} = useUserContext();
    const [code, setCode] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const onForgotPressed =(e)=>{
        e.preventDefault();
        if(userEmail){
            forgotPassword(userEmail);
        }
    }


    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.confirmEmailHeader}>RESET PASSWORD</Text>
          
            <CustomInput
                placeholder="Enter Email"
                value={userEmail}
                setValue={setUserEmail}
            />

            <CustomButton text = "Reset Password" 
            buttonType="LOGIN"
            onPress={onForgotPressed}
            textType="LOGIN"/>


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
        fontWeight:'bold'
    },
    confirmationPromt: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 10
    }

});

export default ResetPasswordScreen;