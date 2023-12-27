import Cookies from "universal-cookie";
import {useEffect, useRef, useState} from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Auth from "../../components/ChatappComponents/Auth";
import TheChat from "../../components/ChatappComponents/TheChat";
import { signOut } from "firebase/auth";
import { auth } from "./config";



function Chat() {
  const cookies = new Cookies()
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null)


  const roomInputRef = useRef(null)

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
    cookies.remove("room");
  }

  const handleRoom = () =>{
    setRoom(roomInputRef.current.value);
    cookies.set("room", roomInputRef.current.value )
  }

  useEffect(() => {
    const newRoom = cookies.get("room")
    setRoom(newRoom);
  }, [])



  if(!isAuth){
      return (
        <div> 
          <Auth 
            setIsAuth = { setIsAuth }
          />
        </div>
      )
    }
    return  (
      <div className=" mt-20 rounded-md flex flex-col gap-10 w-[90vw] m-auto px-2 py-10 items-center justify-center bg-slate-200 max-w-[600px]  " >
        { 
          room ? 
            <TheChat room = {room} setRoom = { setRoom } /> 
          : 
          <div className=" flex-col gap-10 m-auto px-2 py-10 items-center justify-center flex " > 
            <label className=" text-5xl " > Enter room name : </label>
            <Input type="text" className=" m-auto px-4 py-2 rounded-sm" ref={roomInputRef} />
            <Button onClick={ handleRoom } >Enter Chat</Button>
          </div> 
        }
        <div>
          <Button className=" bg-blue-900 " onClick= { signUserOut } > Sign Out </Button>
        </div>
      </div>
    )
  }
export default Chat