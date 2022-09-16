import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";

const ConfirmEmailScreen = () => {
    const [code, setCode] = useState('');
    const [emailToReceiveCode, setEmailToReceiveCode] = useState('salimbaojoshua@gmail.com');
    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.confirmEmailHeader}>CONFIRM EMAIL</Text>
            <View style={styles.confirmationPromt}>
                <Text>Confirmation code has been sent to</Text>
                <Text style={{ color: 'red', fontWeight: 'bold', marginVertical: 5 }}>{emailToReceiveCode}</Text>
            </View>
            <CustomInput
                placeholder="Enter Confirmation Code"
                value={code}
                setValue={setCode}
            />
            <CustomButton text = "Resend code" 
            buttonType="SIGNUP"
            textType="SIGNUP"/>

            <CustomButton text = "Confirm" 
            buttonType="LOGIN"
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

export default ConfirmEmailScreen;