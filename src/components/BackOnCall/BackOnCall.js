import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const BackOnCall = ({ onBack }) => {
    return (
        <View style={styles.root}>
            <Pressable style ={styles.pressableContainer}>
                <Ionicons name="ios-caret-back" size={30} />
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        height: 80,
        width: '100%',
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    pressableContainer: {
        marginTop: 20,
        // backgroundColor:'red'
    }
})
export default BackOnCall;