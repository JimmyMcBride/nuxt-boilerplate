import { doc, Firestore, getDoc, setDoc } from "firebase/firestore"
import { User } from "@firebase/auth"

export const addUserDataIfNotExists = async (firestore: Firestore, user: User) => {
  const userRef = doc(firestore, "users", user.uid)
  const userDoc = await getDoc(userRef)

  if (!userDoc.exists()) {
    const userData = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }

    await setDoc(userRef, userData)
  }
}
