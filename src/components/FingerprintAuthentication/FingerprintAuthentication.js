import React, { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication'
import { StatusBar } from 'expo-status-bar';
import { View, Text, Alert, TouchableHighlight, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storedEmail, storedPassword } from '../../Constants/Constants';
import { useUserContext } from '../../UserContext/UserContextProvider';



const FingerprintAuthentication = ({navigation}) => {

    const {signInUser} = useUserContext();
    const [isBiometricSupported, setBiometricSupported] = useState(false);
    const [asyncedEmail, setAsyncedEmail] = useState('');
    const [asyncedPassword, setAsyncedPassword] = useState('');
   
    useEffect(() => {
        getAsyncData();
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setBiometricSupported(compatible);
        })();
        
    });
    const fallBackToDefaultAuth = () => {
        console.log('fall back to password authentication');
    }
    const alertComponent = (title, mess, btnTxt, btnFunc) => {
        return Alert.alert(title, mess, [
            {
                text: btnTxt,
                onPress: btnFunc,
            }
        ]);
    };

    const getAsyncData = async () => {
        try {
            const values = await AsyncStorage.multiGet([storedEmail, storedPassword]);
            if (values[0][1] !== null && values[1][1] !== null) {
                setAsyncedEmail(values[0][1]);
                setAsyncedPassword(values[1][1]);
            }
        } catch (error) {
            console.log("BIOMETRICS SCREEN LINE 46",error);
        }
    }


    async function handleBiometricAuth() {
        //Checks if hardware is supported for Biometric
        const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
        //Fallback if not supported
        if (!isBiometricAvailable) {
            return alertComponent(
                'Not supported',
                "OK",
                () => fallBackToDefaultAuth()
            )
        }
        //Checks what biometric/s is available
        let supportedBiometrics;
        if (isBiometricAvailable) {
            supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync()
        }
        //Checks if there is existing fingerprints
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        if (!savedBiometrics) {
            return alertComponent(
                'No Fingerprint Biometrics found',
                'Use password instead',
                'OK',
                () => fallBackToDefaultAuth()
            );
        }
        //authenticate
        const biometricAuth = await LocalAuthentication.authenticateAsync({
            // promptMessage: 'Login with biometrics',
            promptMessage: 'Finger me (ugh)',
            cancelLabel: 'Cancel',
            disableDeviceFallback: true,
        })
        // Authentication success
        if (biometricAuth.success === true) {

            // TwoButtonAlert();
            console.log("Available Biometric ? ", isBiometricAvailable);
            console.log("Supported Biometrics ? :", supportedBiometrics);
            console.log("Is there any saved biometrics? :", savedBiometrics);
            console.log("Success? ", biometricAuth.success);
            console.log("StoredEmail", storedEmail);
            console.log("StoredPassword", storedPassword);
            signInUser(storedEmail,storedPassword);
            navigation.navigate("DashBoard", { userEmail:  storedEmail});
            
        }else{
            
        }
    }
    return (
        <View>
            <Text>
                {isBiometricSupported
                    ? ''
                    : 'Face or finger is available'
                }
            </Text>

            <TouchableHighlight style={{ height: 60, marginTop: 20 }}>
                <Button title='Login with Biometric' color='black' onPress={handleBiometricAuth} />
            </TouchableHighlight>

            <StatusBar style='auto' />
        </View>
    )
}
export default FingerprintAuthentication;


