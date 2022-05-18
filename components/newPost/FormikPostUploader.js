import { View, Text, Image, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db, firebase } from '../../firebase'

import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'

const PlaceHolderImg = 'http://placehold.jp/150x150.png'

const UploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  caption: Yup.string().max(2200, 'caption has reached the charecter')
})

const FormikPostUploader = ({ navigation }) => {

  const [thumNailUrl, setThumnailUrl] = useState(PlaceHolderImg)
  const [currentLogdinUser, setCurrentLogdinUser] = useState(null)

  const getUsername = () => {
    const user = firebase.auth().currentUser
    const unSubscribe = db.collection('users').where('owner_uid', '==', user.uid).limit(1).onSnapshot(
      snapshot => snapshot.docs.map(doc => {
        setCurrentLogdinUser({
          username: doc.data().username,
          proflePicture: doc.data().profile_picture
        })
      })
    )
    return unSubscribe
  }

  useEffect(() => {
    getUsername()
  }, [])

  const uploadPostToFirebase = (imageUrl, caption) => {
    const unSubscribe = db.collection('users')
      .doc(firebase.auth().currentUser.email)
      .collection('posts').add({
        imageUrl:imageUrl,
        user:currentLogdinUser.username,
        profile_picture:currentLogdinUser.proflePicture,
        owner_uid:firebase.auth().currentUser.uid,
        caption:caption,
        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users:[],
        comments:[],
      })
      .then(()=>navigation.goBack())
      return unSubscribe
  }

  return (
    <Formik
      initialValues={{ caption: '', imageUrl: '' }}
      onSubmit={(values) => {
        uploadPostToFirebase(values.imageUrl, values.caption)
      }}
      validationSchema={UploadPostSchema}
      validateOnMount={true}>
      {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) =>
        <>
          <View style={{
            margin: 20,
            justifyContent: 'space-between',
            flexDirection: 'row'
          }} >
            <Image source={{ uri: validUrl.isUri(thumNailUrl) ? thumNailUrl : PlaceHolderImg }}
              style={{ width: 100, height: 100 }} />

            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput placeholder='Write a caption...'
                placeholderTextColor='gray'
                multiline={true} style={{ color: 'white', fontSize: 20 }}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={values.caption} />
            </View>

          </View>
          <Divider width={0.2} orientation={'vertical'} />
          <TextInput
            onChange={e => setThumnailUrl(e.nativeEvent.text)}
            placeholder='Enter image url'
            placeholderTextColor='gray'
            style={{ color: 'white', fontSize: 20 }}
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl} />
          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: 'red' }} >{errors.imageUrl}</Text>
          )}

          <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
        </>
      }
    </Formik>
  )
}

export default FormikPostUploader