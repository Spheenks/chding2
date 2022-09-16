import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";

const NewPasswordScreen = () => {
    const [userEmail, setUserEmail] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass , setConfirmPass]= useState('');
    return (
        <SafeAreaView style={styles.root}>
            <Text style={styles.confirmEmailHeader}>RESET YOUR PASSWORD</Text>
           
            <CustomInput
                placeholder="New Password"
                value={newPass}
                setValue={setNewPass}
                secureTextEntry
            />
            <CustomInput
                placeholder="Confirm Password"
                value={confirmPass}
                setValue={setConfirmPass}
                secureTextEntry
            />
        

            <CustomButton text = "Reset Password" 
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

export default NewPasswordScreen;