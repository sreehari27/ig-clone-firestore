import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export const bottomTabIcons = [
    {
      name: 'Home',
      active: 'https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png',
      inactive:
        'https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png',
    },
    {
      name: 'Search',
      active: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
      inactive: 'https://img.icons8.com/ios/500/ffffff/search--v1.png',
    },
    {
      name: 'Reels',
      active: 'https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png',
      inactive: 'https://img.icons8.com/ios/500/ffffff/instagram-reel.png',
    },
    {
      name: 'Like',
      active:
        'https://img.icons8.com/ios-filled/50/ffffff/filled-like.png',
      inactive:
        'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png',
    },
    {
      name: 'Profile',
      active:
        'https://img.icons8.com/material/24/ffffff/user-male-circle--v1.png',
      inactive:
        'https://img.icons8.com/small/16/ffffff/user-male-circle.png',
    },
  ]

const BottoTab = ({icons}) => {
    const [activeTab, setActiveTab]=useState('Home')

    const Icon=({icon})=>(
        <TouchableOpacity onPress={()=>setActiveTab(icon.name)}>
            <Image source={{uri:activeTab==icon.name ? icon.active : icon.inactive}} style={styles.icon} />
        </TouchableOpacity>
    )
  return (
    <View style={styles.container}>
      {icons.map((icon, index)=>(
          <Icon key={index} icon={icon} />
      ))}
    </View>
  )
}

const styles =StyleSheet.create({
    wraper:{
      position:'absolute',
      width:'100%',
      bottom:'3%',
      zIndex:999,
      backgroundColor:'#000'
    },
    container:{
        flexDirection:'row',
        justifyContent:'space-around',
        height:50,
        paddingTop:10
    },
    icon:{
        width:30,
        height:30
    }
})

export default BottoTab