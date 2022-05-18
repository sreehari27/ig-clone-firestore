import { View, Text, TextInput, Button, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { firebase, db } from '../../firebase'

import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'

const SignupForm = ({ navigation }) => {

  const SignFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    username: Yup.string().required().min(2, 'A username is required'),
    password: Yup.string().required().min(8, 'Your password has to have atleast 8 character')
  })

  const getRandomProfilePicture = async () => {
    const response = await fetch('http://randomuser.me/api')
    const data = await response.json()
    return data.results[0].picture.large
  }

  const onSignup = async (email, password, username) => {
    try {
      const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
      navigation.push("HomeScreen")
      console.log("firebase Signup successfull", email, password, username)

      db.collection('users').doc(authUser.user.email).set({
        owner_uid: authUser.user.uid,
        username: username,
        email: authUser.user.email,
        profile_picture: await getRandomProfilePicture(),
      })
    } catch (error) {
      Alert.alert(error.message)
    }
  }

  return (
    <View>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={values => {
          onSignup(values.email, values.password, values.username)
          console.log(values);
        }}
        validationSchema={SignFormSchema}
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
                placeholder='Email'
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
                1 > values.username.length || values.username.length > 2
                  ?
                  '#ccc'
                  :
                  '#e31305'
            }

            ]}>
              <TextInput
                placeholder='Username'
                autoCapitalize='none'
                placeholderTextColor={'#444'}
                autoFocus={true}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
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
                autoFocus={false}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            <Pressable titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={{ fontSize: 20, color: 'white' }}>Sign up</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
                <Text style={{ color: "#6BB0f5" }}> Log in</Text>
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

export default SignupForm