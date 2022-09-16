import React, { useState, useEffect } from 'react';
import { View, Image, useWindowDimensions, StyleSheet, Text, ToastAndroid, Alert, LogBox } from 'react-native';
import FingerprintAuthentication from '../../components/FingerprintAuthentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Logo from '../../../assets/ECS_plus.png';
import { useUserContext } from '../../UserContext/UserContextProvider';
import { storedEmail, storedPassword, isBioEnabled } from '../../Constants/Constants';
import { authentication } from '../../../Firebase/AuthFirebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const { user, signInUser, logoutUser } = useUserContext();
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { height } = useWindowDimensions();
  const [asyncedBio, setAsyncedBio] = useState('');
  const [asyncedEmail, setAsyncedEmail] = useState('');
  const [asyncedPassword, setAsyncedPassword] = useState('');

  const [loading, setLoading] = useState(false);



  useEffect(() => {

    getAsyncData();

  }, []);

  // CHECK IF EMAIL VERIFIED
  // function checkVerification() {
  //   if (user) {
  //     if (!user.emailVerified) {

  //     } else {

  //     }
  //   }

  // }

  const getAsyncData = async () => {
    try {
      const values = await AsyncStorage.multiGet([storedEmail, storedPassword, isBioEnabled]);

      if (values[0][1] !== null) {
        setEmail(values[0][1]);
        setAsyncedEmail(values[0][1])
        setAsyncedPassword(values[1][1]);
        setAsyncedBio(values[2][1]);
      }
    } catch (error) {
      console.log("LOGIN SCREEN LINE 63", error);
    }
  }
  // LOG IN SUCCESSFUL (INPUTS)
  const onLoginPressed = (e) => {
    e.preventDefault();
    if (email && password) {
      // signInUser(email, password);


      setLoading(true);
      signInWithEmailAndPassword(authentication, email, password)
        .then((res) => console.log(res))
        .catch((err) => setError(err.message))
        .finally(() => {
          setLoading(false);
          setAsyncedCredentials(email, password);
          navigation.navigate("WaitingConfirmationScreen");

        });







      // checkVerification();
      // goToDashBoard();
    }

  }
  // GO TO DASHBOARD 
  // function goToDashBoard() {
  //   navigation.navigate("DashBoard");
  //   setEmail('');
  //   setPassword('');
  // }
  const onSignOutPressed = () => {
    setEmail('');
    setPassword('');
    setAsyncedBio('');
    setAsyncedEmail('');
    logoutUser();
  }
  const onForgotPassPressed = () => {
    navigation.navigate("ResetPassword");
  }

  const setAsyncedCredentials = (email, password) => {
    try {
      AsyncStorage.multiSet([[storedEmail, email], [storedPassword, password]]);
    } catch (error) {
      console.log("USER CONTEXT 76", error)
    }

  }
  return (
    <View style={styles.root}>
      {/* Logo */}
      <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />

      {/* Fingerprint Authentication */}
      {asyncedBio === 'true' &&
        <FingerprintAuthentication />
      }
      {/* Email Input */}
      {asyncedEmail === '' ?
        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />
        :
        <>
          <View style={styles.emailPlusLogOut}>
            <Text numberOfLines={1} style={styles.loggedEmail}>{email}</Text>
            <CustomButton styletextType="NOTYOU" buttonType="NOTYOU" text="Not you?" onPress={onSignOutPressed} />
          </View>
        </>
      }
      {/* Password Input */}
      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      {/* LoginButton */}
      <CustomButton
        text="Log in"
        onPress={onLoginPressed}
        buttonType="LOGIN"
        textType="LOGIN"
      />
      {/* ForgotPasswordButton */}
      <CustomButton
        text="Forgot Password"
        onPress={onForgotPassPressed}
        buttonType="FORGOTTEN"
        textType="FORGOTTEN"
      />
      {/* CreateAccountButton */}
      {asyncedEmail === '' &&
        < CustomButton
          text="Doesn't have an Account? Create one"
          onPress={() => navigation.navigate("Register")}
          buttonType="SIGNUP"
          textType="SIGNUP"
        />
      }
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: '100%'
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    height: 100,
  },
  loggedEmail: {
    fontSize: 20,
    width: '50%',
  },
  emailPlusLogOut: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});
export default LoginScreen;
