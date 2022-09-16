import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ImageBackground, Pressable, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import bg from '../../../assets/Johnny/Sins.jpeg';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';



const IncomingCallScreen = () => {
    const [currentPage, setCurrentPage] = useState('Calling');

    useEffect(() => {
        setCurrentPage('Calling');
    }, []);

    const onDecline = () => {
        Alert.alert("Info", "You Declined", [
            {
                text: 'OK',
                onPress: () => console.log('Ok Pressed')
            },
        ]);
    }

    const onAccept = () => {
        Alert.alert("Info", "You Accepted", [

            {
                text: 'OK',
                onPress: () => console.log('Ok Pressed')
            },
        ]);
    }


    switch (currentPage) {
        case 'Calling':
            return (

                <ImageBackground source={bg} style={styles.bg} resizeMode="cover" imageStyle={{ opacity: 0.5 }}>

                    <Text style={styles.nameCall}>Johnny S</Text>
                    <Text style={styles.statusCall}>Incoming call</Text>

                    {/* REMIND MESSAGE */}
                    <View style={[styles.row, { marginTop: 'auto' }]}>

                        {/* REMIND */}
                        <View style={styles.iconsContainer}>
                            <Ionicons name="alarm" color={"white"} size={30} />
                            <Text style={styles.iconText}>Remind me</Text>
                        </View>

                        {/* MESSAGE */}
                        <View style={styles.iconsContainer}>
                            <Entypo name="message" color={"white"} size={30} />
                            <Text style={styles.iconText}>Message</Text>
                        </View>

                    </View>

                    {/* ACCEPT REJECT */}
                    <View style={styles.row}>

                        {/* REJECT */}
                        <Pressable onPress={onDecline} style={styles.iconsContainer}>
                            <View style={styles.iconButtonCont}>
                                <Feather name="x" color={"white"} size={60} />
                            </View>
                            <Text style={styles.iconText}>Decline</Text>
                        </Pressable>

                        {/* ACCEPT */}
                        <Pressable onPress={onAccept} style={styles.iconsContainer}>
                            <View style={[styles.iconButtonCont, { backgroundColor: 'lightblue' }]}>
                                <Feather name="check" color={"white"} size={60} />
                            </View>
                            <Text style={styles.iconText}>Accept</Text>
                        </Pressable>
                    </View>

                </ImageBackground>


            )

        // break;

        default:
            break;
    }

}

export default IncomingCallScreen;

const styles = StyleSheet.create({
    root: {
        height: '100%',


    },

    nameCall: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 50,
        marginBottom: 20
    },
    statusCall: {
        color: 'white',
        fontSize: 25,
    },

    bg: {
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 10,

    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    iconsContainer: {
        alignItems: 'center',
        marginVertical: 20
    },
    iconText: {
        color: 'white',
        marginTop: 10
    },
    iconButtonCont: {
        backgroundColor: 'red',
        borderRadius: 100,
        padding: 15,
        margin: 20
    }

})