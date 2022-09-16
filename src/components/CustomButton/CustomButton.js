import React from "react"
import {View,Text, Pressable,StyleSheet} from 'react-native'

const CustomButton = ({onPress,text,buttonType}) =>{
    return(
        <Pressable onPress={onPress} style={[styles.buttonCont,styles[`buttonCont_${buttonType}`]]}>
            <Text style={[styles.Text,styles[`Text_${buttonType}`]]}>{text}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    buttonCont:{
        // width: '100%',
        // alignItems:"center",
        marginVertical: 10,
    
    },
    buttonCont_LOGIN:{
        backgroundColor: '#74DA74',
        width: '100%',
        height: 50,
        borderRadius: 50,
        padding:15,
        alignItems:"center",
    
    },
    buttonCont_SIGNUP:{
        
    },
    buttonCont_FORGOTTEN:{
        
    },
    Text:{
        
    },
    Text_LOGIN:{
        
    },
    Text_SIGNUP:{
        
        fontStyle:'italic',
        color:'gray',
        textDecorationLine: 'underline',
    },
    
    Text_FORGOTTEN:{
        fontStyle:'italic',
        color:'gray',
        textDecorationLine: 'underline',
        
    },
    buttonCont_SIGNOUT:{
        width: '100%',
        alignItems:"center",
        marginVertical: 20,
     
        
    },
    Text_SIGNOUT:{
        
        fontStyle:'italic',
        color:'red',
        textDecorationLine: 'underline',
        
    },

    Text_NOTYOU:{
        fontStyle:'italic',
        color:'red',
        textDecorationLine: 'underline',
    },
    buttonCont_NOTYOU:{
        alignItems:"center",
        width:'45%',
        // backgroundColor:'green',
        
    },
    

    
})
export default CustomButton;