import MainScreen from "./components/pages/MainScreen"
import { useEffect } from "react"
// import SignUpAndLogin from "./components/pages/SignUpAndLogin"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/config"
import { useDispatch } from "react-redux"
import { fetchUser } from "./redux/features/userSlice"



function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth,(currentUser)=>{
      // console.log(auth, "authhhh")
      if(currentUser){
        // console.log(currentUser.uid, "checking user IDIDIDI" )
       try {
        dispatch(fetchUser(currentUser.uid)).unwrap().then((data)=>console.log(data, "currentUser Data after fetching on App.jsx"))
       } catch (error) {
        console.log(error)
       }
        // console.log(currentUser, "currentUser")
        // console.log(currentUser)
      }else{console.log("Nobody Logged In")}
    })
  
    return () => {
      unsub()
    }
  }, [])
  




  return (
    <>
    
      {/* <SignUpAndLogin /> */}
      <MainScreen />
    </>
  )
}

export default App
