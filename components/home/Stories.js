import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { USERS } from '../../data/Users'



export default function Stories() {
    return (
        <View style={{ marginBottom: 13 }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {USERS.map((story, index) => (
                    <View key={index} style={{alignItems:'center'}}>
                        <Image source={{ uri: story.image }}
                            style={styles.story} />
                        <Text style={styles.storyText}>
                            {story.name.length>11 ? story.name.slice(0,10).toLowerCase()+'...':
                            story.name.toLowerCase()}
                        </Text>
                    </View>
                ))}

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    story: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 3,
        borderColor: '#ff8501'
    },
    storyText: {
        color: 'white'
    }
})