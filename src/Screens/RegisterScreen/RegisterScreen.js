import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { setDoc, doc } from 'firebase/firestore/lite';
import { db } from '../../../Firebase/AuthFirebase';
import { PickerModal } from '../../components/PickerModal';
import { useUserContext } from '../../UserContext/UserContextProvider';



const RegisterScreen = ({ navigation }) => {

  const { registerUser } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAccountTypeModal, setShowAccountTypeModal] = useState(false);
  const [showSpecsModal, setShowSpecsModal] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAccountTypeSelected, setIsAccountTypeSelected] = useState(false);
  const [accountTypeValue, setAccountTypeValue] = useState('Select Account Type ▼');
  const [specialization, setSpecialization] = useState('Field ▼');

  const onSignUpPressed3 = () => {

    if (email && password) {
      registerUser(email, password);
    }


    // persistInitialInfo();
    console.log('ASDA');
    navigation.navigate("Login");

  }

  const specs = ['Albulary', 'Quack Quack'];

  



  return (
    <View style={styles.root}>

      <View style={styles.registerHeaderCont}>
        <Text style={styles.registerHeader}>SIGNUP</Text>
      </View>

      {
        isAccountTypeSelected === false ?
          <PickerModal
            style={styles.PickerCont}
            pickerValue={accountTypeValue}
            options={['Doctor', 'Patient']}
            onSelect={(value) => {
              setAccountTypeValue(value), setShowAccountTypeModal(false), setIsAccountTypeSelected(true)
            }}
            isVisible={showAccountTypeModal}
            onOpenPicker={() => setShowAccountTypeModal(true)}
            onClose={() => setShowAccountTypeModal(false)}
          />
          :
          <>
            <PickerModal
              style={styles.PickerCont}
              pickerValue={accountTypeValue}
              options={['Doctor', 'Patient']}
              onSelect={(value) => {
                setAccountTypeValue(value), setShowAccountTypeModal(false), setIsAccountTypeSelected(true)
              }}
              isVisible={showAccountTypeModal}
              onOpenPicker={() => setShowAccountTypeModal(true)}
              onClose={() => setShowAccountTypeModal(false)}
            />
            {accountTypeValue === 'Doctor' &&

              <PickerModal

                style={styles.PickerCont}
                pickerValue={specialization}
                options={specs}
                onSelect={(value) => {
                  setSpecialization(value), setShowSpecsModal(false)
                }}
                isVisible={showSpecsModal}
                onOpenPicker={() => setShowSpecsModal(true)}
                onClose={() => setShowSpecsModal(false)}
              />
            }
            <CustomInput
              placeholder="Email"
              value={email}
              setValue={setEmail}

            />



            <CustomInput
              placeholder="Password"
              value={password}
              setValue={setPassword}
              secureTextEntry={true}

            />

            <CustomInput
              placeholder="Confirm Password"
              value={confirmPassword}
              setValue={setConfirmPassword}
              secureTextEntry={true}

            />



            <CustomButton
              text="Register"
              onPress={onSignUpPressed3}
              buttonType="LOGIN"
              textType="LOGIN"

            />
          </>
      }


    </View>
  );
}

const styles = StyleSheet.create({
  registerHeader: {
    fontSize: 50,

  },
  root: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    height: '100%'
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    height: 100,
  },
  registerHeaderCont: {
    padding: 5,
    alignItems: 'center',

  },


});
export default RegisterScreen;