
import React, { useEffect, useState } from 'react'
import { SignedInStack, SignedOutStack } from './navigation'
import { firebase } from './firebase'

const AuthNavigation = () => {
    const [currentUser, setCurrentUser] = useState(null)

  const UserHandler = user => user ? setCurrentUser(user) : setCurrentUser(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => UserHandler(user)),
      []
  })
    return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>
}

export default AuthNavigation