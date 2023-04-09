import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth"
import { initializeApp } from "@firebase/app"
import { getFirestore } from "@firebase/firestore"
import { addUserDataIfNotExists } from "~/helpers/firestoreUtils"
// import { getAnalytics } from "@firebase/analytics"

export const useFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAEo17AKEuPEtrRn728DF0Djrx6xypjwTg",
    authDomain: "davinci-2e6b0.firebaseapp.com",
    projectId: "davinci-2e6b0",
    storageBucket: "davinci-2e6b0.appspot.com",
    messagingSenderId: "46666329123",
    appId: "1:46666329123:web:437119d5f29ee9ed515596",
    measurementId: "G-8SPRHQEL42",
  }

  const firebaseApp = initializeApp(firebaseConfig)
  const auth = getAuth(firebaseApp)
  const firestore = getFirestore(firebaseApp)
  // const analytics = getAnalytics(firebaseApp)

  const googleProvider = new GoogleAuthProvider()

  const googleSignIn = async () => {
    const { user } = await signInWithPopup(auth, googleProvider)
    try {
      await addUserDataIfNotExists(firestore, user)
    } catch (error) {
      console.error(error)
    }
  }

  const signOut = async () => {
    await auth.signOut()
  }

  return {
    auth,
    firestore,
    googleSignIn,
    signOut,
  }
}
