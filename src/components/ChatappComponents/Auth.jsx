import { Button } from "@/components/ui/button"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, provider } from "../../pages/chatapp/config"
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";




function Auth( {setIsAuth} ) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [authUser, setAuthUser] = useState(null)
  // // to sign up user with email and password
  // const createUser = (e) => {
  //   e.preventDefault();
  //   createUserWithEmailAndPassword(auth, email, password)
  //   .then(userCredential => {
  //     console.log(userCredential)
  //   })
  //   .catch(error => console.error(error))
  // }
  // // to sign in with email and password
  // const signInWithEmail = (e) => {
  //   e.preventDefault();
  //   signInWithEmailAndPassword( auth, email, password )
  //     .then((userCredential) => {
  //       console.log(userCredential)
  //     })
  //     .catch(error => console.error(error))
  // }
  // useEffect(() => {
  //   const listen = onAuthStateChanged(auth, (user) => {
  //     if(user) setAuthUser(user)
  //     else setAuthUser(null)
  //     return () => listen();
  //     // get email as authUser.email
  //   })
  // }, [])
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const cookies = new Cookies()
      cookies.set("auth-token", result.user.refreshToken)
      setIsAuth(true);
    } catch (error) {
      console.error(error)
    } 
  }

  return (
    <div className="flex items-center justify-center gap-10 p-10 flex-col bg-slate-200 m-40 w-[40rem] mx-auto " >
      <p className=" text-lg font-bold " > Sign in with google to continue </p>
      <Button onClick={signInWithGoogle} > Sign in With Google</Button>
    </div>
  )
}

export default Auth