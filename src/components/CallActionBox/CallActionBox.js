import React, { useState } from "react";
import { StyleSheet, View, Pressable, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CallActionBox = () => {

    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);

    const onReverseCamera = () => {
        Alert.alert("Info", "Camera Reverse", [

            {
                text: 'OK',
                onPress: () => console.log('Ok Pressed')
            },
        ]);
    }
    const onCameraToggle = () => {
        setIsCameraOn((currentValue)=>!currentValue);
        Alert.alert("Info", "Camera off", [

            {
                text: 'OK',
                onPress: () => console.log('Ok Pressed')
            },
        ]);
    }
    const onMicrophoneToggle = () => {
        setIsMicOn((currentValue)=>!currentValue);
        Alert.alert("Info", "Microphone Off", [

            {
                text: 'OK',
                onPress: () => console.log('Ok Pressed')
            },
        ]);
    }
    const onHangup = () => {
        Alert.alert("Info", "Hangup", [

            {
                text: 'OK',
                onPress: () => console.log('Ok Pressed')
            },
        ]);
    }

    return (
        <View style={styles.buttonsContainer}>
            <Pressable onPress={onReverseCamera} style={styles.iconButton}>
                <Ionicons name="ios-camera-reverse" size={50} color={'white'} />
            </Pressable>
            <Pressable onPress={onCameraToggle} style={styles.iconButton}>
                <MaterialIcons name={isCameraOn?"camera-off" : "camera"} size={50} color={'white'} />
            </Pressable>
            <Pressable onPress={onMicrophoneToggle} style={styles.iconButton}>
                <MaterialIcons name={isMicOn? "microphone-off":"microphone"} size={50} color={'white'} />
            </Pressable>
            <Pressable onPress={onHangup} style={[styles.iconButton, { backgroundColor: 'red' }]}>
                <MaterialIcons name="phone-hangup" size={50} color={'white'} />
            </Pressable>

        </View>
    )

}

const styles = StyleSheet.create({
    buttonsContainer: {
        backgroundColor: '#333333',
        padding: 25,
        paddingBottom: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        marginTop: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',


    },
    iconButton: {
        backgroundColor: '#4a4a4a',
        padding: 10,
        borderRadius: 50,
    }
})

export default CallActionBox;