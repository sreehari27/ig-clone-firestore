import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/Post'
import { POSTS } from '../data/Posts'
import BottoTab, { bottomTabIcons } from '../components/home/BottoTab'
import { db } from '../firebase'


export default function HomeScreen({navigation}) {

  const [posts, setPosts]=useState([])

  useEffect(()=>{
    db.collectionGroup('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>doc.data()))
    })
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}

      </ScrollView>
      <BottoTab icons={bottomTabIcons} />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1
  }
})