import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { firebase } from '../../firebase'

const HandleSignout = async () => {
    try {
        await firebase.auth().signOut()
        console.log('signed out');
    } catch (error) {
        console.log(error);
    }
}


export default function Header({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={HandleSignout}>
                <Image style={styles.logo}
                    source={require('../../assets/header-logo.png')} />
            </TouchableOpacity>
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    onPress={() => navigation.push('NewPostScreen')}>
                    <Image source={{ uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png' }}
                        style={styles.icon} />
                </TouchableOpacity>

                {/* <TouchableOpacity>
                    <Image source={{ uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png' }}
                        style={styles.icon} />
                </TouchableOpacity> */}

                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgText}>11</Text>
                    </View>
                    <Image source={{ uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png' }}
                        style={styles.icon} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain'
    },
    iconContainer: {
        flexDirection: 'row',
    },
    icon: {
        height: 30,
        width: 30,
        marginLeft: 10,
        resizeMode: 'contain'
    },
    unreadBadge: {
        backgroundColor: '#FF3250',
        position: 'absolute',
        left: 20,
        bottom: 18,
        borderRadius: 30,
        width: 25,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    unreadBadgText: {
        color: 'white',
        fontWeight: '600',


    }
})

