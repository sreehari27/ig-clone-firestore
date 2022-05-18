import { USERS } from './Users'

export const POSTS = [
    {
        imageUrl: 'https://i.picsum.photos/id/1024/1920/1280.jpg?hmac=-PIpG7j_fRwN8Qtfnsc3M8-kC3yb0XYOBfVzlPSuVII',
        user: USERS[0].name,
        likes: '7856',
        caption: 'Tremendously gorgeous shot m8',
        profilePicture: USERS[0].image,
        comments: [
            {
                user: USERS[8].name,
                comment: 'Such classic.'
            },
            // {
            //     user: USERS[7].name,
            //     comment: 'Nice use of charcoal in this illustration!!'
            // }
        ]
    },

    {
        imageUrl: 'https://i.picsum.photos/id/1023/3955/2094.jpg?hmac=AW_7mARdoPWuI7sr6SG8t-2fScyyewuNscwMWtQRawU',
        user: USERS[5].name,
        likes: '563',
        caption: 'So graceful and engaging mate',
        profilePicture: USERS[5].image,
        comments: [
            // {
            //     user: USERS[4].name,
            //     comment: 'Radiant icons :-)'
            // },
            // {
            //     user: USERS[1].name,
            //     comment: 'I approve your shot!'
            // }
        ]
    },

    {
        imageUrl: 'https://i.picsum.photos/id/1018/3914/2935.jpg?hmac=3N43cQcvTE8NItexePvXvYBrAoGbRssNMpuvuWlwMKg',
        user: USERS[11].name,
        likes: '1235',
        caption: 'Mission accomplished. Its fab! Hand letterer, Lauren Hom, announces her new passion',
        profilePicture: USERS[11].image,
        comments: [
            {
                user: USERS[0].name,
                comment: 'Just minimal!!'
            },
            {
                user: USERS[18].name,
                comment: 'Let me take a nap... great type, anyway.'
            }
        ]
    },

    {
        imageUrl: 'https://i.picsum.photos/id/101/2621/1747.jpg?hmac=cu15YGotS0gIYdBbR1he5NtBLZAAY6aIY5AbORRAngs',
        user: USERS[18].name,
        likes: '15896',
        caption: 'Killer m8 I adore the use of blur and layout!',
        profilePicture: USERS[18].image,
        comments: [
            {
                user: USERS[4].name,
                comment: 'Gold. Ahhhhhhh...'
            },
            {
                user: USERS[7].name,
                comment: 'How do you make this? Photoshop?'
            }
        ]
    },
] 