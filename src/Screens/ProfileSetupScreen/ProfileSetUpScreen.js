import React, { useState } from 'react';
import { View, Text, Image, useWindowDimensions, StyleSheet, SafeAreaView } from 'react-native';
import Logo from '../../../assets/ECS_plus.png';
import { authentication } from '../../../Firebase/AuthFirebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore/lite';
import { db } from '../../../Firebase/AuthFirebase';
import CustomDropdown from '../../components/CustomPicker';



const ProfileSetUpScreen = () => {
 
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');



 
  return (

    <View style={styles.root}>
      {/* <SafeAreaView> */}
      {/* <Image source ={Logo} style = {[styles.logo, {height:height * 0.3}]} resizeMode="contain"/> */}

      
      <CustomInput
        placeholder="Firstname"
        value={firstName}
        setValue={setFirstName}

      />

      <CustomInput
        placeholder="Lastname"
        value={lastName}
        setValue={setLastName}
      />



      <CustomButton
        text="Setup"
        // onPress={setUpPressed} 

        buttonType="LOGIN"
        textType="LOGIN"
      />
      {/* </SafeAreaView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginVertical: 100,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    height: 100,
  },
});
export default ProfileSetUpScreen;