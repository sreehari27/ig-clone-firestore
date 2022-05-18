import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Divider } from 'react-native-elements'
import { firebase, db } from '../firebase'

const postFooterIcon = [
    {
        name: 'Like',
        imageUrl: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/ffffff/external-like-instagram-flatart-icons-outline-flatarticons.png',
        likedImageUrl: 'https://img.icons8.com/ios-filled/50/fa314a/filled-like.png'
    },
    {
        name: 'Comment',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/48/ffffff/speech-bubble--v1.png',
    },
    {
        name: 'Share',
        imageUrl: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/ffffff/external-send-email-flatart-icons-outline-flatarticons.png',
    },
    {
        name: 'Save',
        imageUrl: 'https://img.icons8.com/material-outlined/24/ffffff/bookmark-ribbon--v1.png',
    }
]

const Post = ({ post }) => {

    const handleLike = post => {
        const currentLikeStatus = !post.likes_by_users.includes(
            firebase.auth().currentUser.email
        )

        db.collection('users')
            .doc(post.owner_email)
            .collection('posts')
            .doc(post.id)
            .update({
                likes_by_users: currentLikeStatus ? firebase.firestore.FieldValue.arrayUnion(
                    firebase.auth().currentUser.email
                )
                    : firebase.firestore.FieldValue.arrayRemove(
                        firebase.auth().currentUser.email
                    ),
            })
            .then(() => {
                console.log('document successfully updated')
            })
            .catch(error => {
                console.log('error updating document: ', error);
            })
    }
    return (
        <View style={{ marginBottom: 30 }}>
            <Divider width={1} orientation='vertical' />
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{
                marginHorizontal: 15,
                marginTop: 10
            }}>
                <PostFooter post={post} />
                <Like post={post} handleLike={handleLike} />
                <Caption post={post} />
                <CommentSetion post={post} />
                <Comments post={post} />
            </View>

        </View>
    )
}

const PostHeader = ({ post }) => (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        alignItems: 'center'
    }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: post.profilePicture }} style={styles.story} />
            <Text style={{ color: 'white', marginLeft: 8, fontWeight: '700' }}>{post.user}</Text>
        </View>

        <Text style={{ color: 'white', fontWeight: 'bold' }}>...</Text>
    </View>
)

const PostImage = ({ post }) => (
    <View style={{
        width: '100%',
        height: 450
    }} >
        <Image source={{ uri: post.imageUrl }}
            style={{ height: '100%', resizeMode: 'cover' }} />
    </View>

)

const PostFooter = ({ handleLike, post }) => (
    <View style={{
        flexDirection: 'row',
    }}>
        <View style={styles.leftFooterContainer}>
            {/* <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcon[0].imageUrl} /> */}
            <TouchableOpacity onPress={() => handleLike(post)}>
                <Image style={styles.footerIcon} source={{ uri: postFooterIcon[0].imageUrl }} />
            </TouchableOpacity>

            <Icon imgStyle={[styles.footerIcon, styles.commentIcone]} imgUrl={postFooterIcon[1].imageUrl} />
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcon[2].imageUrl} />
        </View>
        <View style={{
            flex: 1,
            alignItems: 'flex-end'
        }}>
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcon[3].imageUrl} />
        </View>

    </View>

)

const Icon = ({ imgStyle, imgUrl }) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={{ uri: imgUrl }} />
    </TouchableOpacity>
)
const Like = ({ post }) => (
    <View style={{ flexDirection: 'row', marginTop: 4 }}>
        <Text style={{ color: 'white', fontWeight: '600' }}>
            {post.likes_by_users.length.toLocaleString('en')} likes
        </Text>
    </View>

)

const Caption = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        <Text style={{ color: 'white' }}>
            <Text style={{ fontWeight: 'bold' }}>{post.user} </Text>
            <Text>{post.caption}</Text>

        </Text>
    </View>

)

const CommentSetion = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        {!!post.comments.length && (
            <Text style={{ color: 'gray' }}>
                View {post.comments.length > 1 ? 'all ' : ''}
                {post.comments.length > 1 ? post.comments.length : ''}
                {post.comments.length > 1 ? ' comments' : 'comment'}
            </Text>
        )}
    </View>

)

const Comments = ({ post }) => (
    <>
        {post.comments.map((comment, index) => (
            <View key={index} style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text style={{ color: 'white' }}>
                    <Text style={{ fontWeight: 'bold' }}>{comment.user} </Text>
                    {comment.comment}
                </Text>
            </View>
        ))}
    </>
)

const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: '#ff8501'
    },
    footerIcon: {
        height: 33,
        width: 33
    },
    leftFooterContainer: {
        flexDirection: 'row',
        width: '32%',
        justifyContent: 'space-between'
    },
    commentIcone: {
        transform: [{ rotate: '270deg' }]
    }
})

export default Post