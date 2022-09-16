import React from 'react';
import { StyleSheet } from 'react-native';
import { UserContextProvider } from './src/UserContext/UserContextProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './src/Screens/RegisterScreen';
import DashboardScreen from './src/Screens/DashboardScreen';
import ConfirmEmailScreen from './src/Screens/ConfirmEmailScreen';
import ResetPasswordScreen from './src/Screens/ResetPasswordScreen';
import NewPasswordScreen from './src/Screens/NewPasswordScreen';
import WaitingConfirmationScreen from './src/Screens/WaitingConfirmationScreen';
import LoginScreen from './src/Screens/LoginScreen';
import ChatScreen from './src/Screens/ChatScreen';
import FingerprintAuthentication from './src/components/FingerprintAuthentication';
import CallingScreen from './src/Screens/CallingScreen';
import IncomingCallScreen from './src/Screens/IncomingCallScreen';
import CallScreen from './src/Screens/CallScreen/CallScreen';
import ConsultListing from './src/components/ConsultListing';



// import { Toast } from 'react-native-toast-message/lib/src/Toast';


const { Navigator, Screen } = createNativeStackNavigator();

function ScreenStack() {
  return (
    <Navigator style={styles.root}>
      <Screen
        name="Login"
        options={{
          headerShown: false
        }}
        component={LoginScreen} />
      <Screen
        name="Register"
        options={{
          headerShown: false
        }}
        component={RegisterScreen} />
      <Screen
        name="ResetPassword"
        options={{
          headerShown: false
        }}
        component={ResetPasswordScreen} />
      <Screen
        name="BiometricScreen"
        options={{
          headerShown: false
        }}
        component={FingerprintAuthentication} />
      <Screen
        name="WaitingConfirmationScreen"
        options={{
          headerShown: false
        }}
        component={WaitingConfirmationScreen} />
      <Screen
        name="NewPassword"
        options={{
          headerShown: false
        }}
        component={NewPasswordScreen} />

      <Screen
        name="UserContextProvider"
        options={{
          headerShown: false
        }}
        component={UserContextProvider} />

      <Screen
        name="CallScreen"
        options={{
          // headerShown: false
        }}
        component={CallScreen}
      />




      <Screen
        name="IncomingCallScreen"
        options={{
          // headerShown: false
        }}
        component={IncomingCallScreen}
      />

      <Screen
        name="ChatScreen"
        options={{
          headerShown: false
        }}
        component={ChatScreen}
      />


      <Screen
        name="CallingScreen"
        options={{
          headerShown: false
        }}
        component={CallingScreen}
      />
      <Screen
        name="ConsultListing"
        options={{
          headerShown: false
        }}
        component={ConsultListing} />
      <Screen
        name="DashBoard"
        options={{
          headerShown: false
        }}
        component={DashboardScreen} />
      <Screen
        name="EmailConfirm"
        options={{
          headerShown: false
        }}
        component={ConfirmEmailScreen} />
    </Navigator>
  )
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <ScreenStack />

    </NavigationContainer>
  )
}


export default function App() {
  return (
    <UserContextProvider>
      <RootNavigator />
    </UserContextProvider>

  )
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});
