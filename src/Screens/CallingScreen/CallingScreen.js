import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BackOnCall from "../../components/BackOnCall/BackOnCall";
import CallActionBox from "../../components/CallActionBox";
const CallingScreen = ({ navigation }) => {


    useEffect(() => {

    }, []);

    const backToChat = () => {
        navigation.navigate('ChatScreen');
    }




    return (
        <View style={styles.root}>
            <View style={styles.backCont}>
                <Pressable onPress={backToChat} style={styles.pressableBackCont}>
                    <Ionicons name="ios-caret-back" size={30} />
                </Pressable>
            </View>
            <View style={styles.cameraPreview}>
                <Text style={styles.nameCall}>BETLOG</Text>
                <Text style={styles.statusCall}>Calling</Text>
            </View>

            <CallActionBox />

        </View>
    )



}

export default CallingScreen;

const styles = StyleSheet.create({
    root: {
        height: '100%',
        backgroundColor: '#74DA74',

    },
    cameraPreview: {
        backgroundColor: '#74DA74',
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 10,

    },
    nameCall: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 50,
        marginBottom: 20
    },
    statusCall: {
        fontSize: 25,
    },
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
    },
    backCont: {
        height: 80,
        width: '100%',
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    pressableBackCont: {
        marginTop: 20,
        // backgroundColor:'red'
    }

})