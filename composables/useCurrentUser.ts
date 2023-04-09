import { onAuthStateChanged } from "@firebase/auth"
import { doc, getDoc } from "firebase/firestore"

export const useCurrentUser = () => {
  const authState = useState<AuthState>("authState", () => {
    return {
      currentUser: null,
      isAuthLoading: true,
      isUserSignedIn: false,
    }
  })

  async function getCurrentUser(uid: string | undefined): Promise<CurrentUser | null> {
    const { firestore } = useFirebase()
    if (!uid) {
      return null
    }
    try {
      const userRef = doc(firestore, "users", uid)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        return {
          uid,
          ...userDoc.data(),
        } as CurrentUser
      } else {
        console.error("No such document!")
        return null
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }

  onMounted(() => {
    const { auth } = useFirebase()
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      authState.value = {
        currentUser: await getCurrentUser(user?.uid),
        isAuthLoading: false,
        isUserSignedIn: !!user,
      }
    })
    onUnmounted(unsubscribe)
  })

  return {
    currentUser: computed(() => authState.value.currentUser),
    isAuthLoading: computed(() => authState.value.isAuthLoading),
    isUserSignedIn: computed(() => authState.value.isUserSignedIn),
  }
}
