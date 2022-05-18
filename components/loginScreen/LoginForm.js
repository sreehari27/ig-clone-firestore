import { View, Text, TextInput, Button, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import {firebase} from '../../firebase'

import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'

const LoginForm = ({navigation}) => {

  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    password: Yup.string().required().min(8, 'Your password has to have atleast 8 character')
  })



  const onLogin = async (email, password)=>{
    try{
      await firebase.auth().signInWithEmailAndPassword(email, password)
      navigation.push('HomeScreen')
      console.log("firebase login successfull", email,password)
    }catch(error){
      Alert.alert(error.message)
    }
  }

  return (
    <View>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => {
          onLogin(values.email,values.password)
          console.log(values);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View style={[styles.inputField,
            {
              borderColor: values.email.length < 1 ||
                Validator.validate(values.email) ? '#ccc' : '#e31305'

            }

            ]}>
              <TextInput
                placeholder='Phon number,username or e-mail'
                autoCapitalize='none'
                placeholderTextColor={'#444'}
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            <View style={[styles.inputField,
            {
              borderColor:
                1 > values.password.length || values.password.length > 7
                  ?
                  '#ccc'
                  :
                  '#e31305'
            }
            ]}>
              <TextInput
                placeholder='Password'
                autoCapitalize='none'
                placeholderTextColor={'#444'}
                secureTextEntry={true}
                textContentType='password'
                autoFocus={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
              <Text style={{ color: "#6BB0f5" }}>Forgot password?</Text>
            </View>
            <Pressable titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={{ fontSize: 20, color: 'white' }}>Log in</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={()=>navigation.push('SignupScreen')} >
                <Text style={{ color: "#6BB0f5" }}> Sign up</Text>
              </TouchableOpacity>

            </View>
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#fafafa',
    marginBottom: 10,
    borderWidth: 1
  },
  button: isValid => ({
    backgroundColor: isValid ? "#0096f6" : '#9ACAF7',
    alignItems: 'center',
    minHeight: 42,
    justifyContent: 'center',
    borderRadius: 4
  }),
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50
  }
})

export default LoginForm