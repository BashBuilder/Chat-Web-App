import {useState, useEffect} from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { auth, db } from '../../pages/chatapp/config'
import moment from 'moment'
import Cookies from "universal-cookie";

function TheChat( { room, setRoom } ) {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([])

  const messagesRef = collection(db, "messages")
  const cookies= new Cookies();

  useEffect(() => {
    const queryMessages = query(messagesRef, 
      where( "room", "==", room ),
      orderBy("createdAt")
      )
    const unsubscribe = onSnapshot(queryMessages, (snapShot) => {
      let messages = []
      snapShot.forEach(doc => {
        messages.push({ ...doc.data(), id:doc.id })
      })
      setMessages(messages)
    });


    return () => unsubscribe();
  }, [])
  

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
      photoUrl: auth.currentUser.photoURL,
    });
    setNewMessage("")
  }
  const removeRoom = () => {
    setRoom("");
    cookies.remove("room")
  }


  return (
    <div className='flex flex-col gap-4  w-full  '>
      <div className=' bg-slate-800 text-center text-4xl p-3 text-slate-100 '>
        <h1> Welcome to: { room.toUpperCase() } </h1>
      </div>

      <div className='flex flex-col gap-4 pb-10' >
        {
          messages.map((message) => (
            <div key={message.id} className={`flex  flex-col ${ message.user === auth.currentUser.displayName ? " items-end" : "item-start" }` }>
              <div className='max-w-[25rem] bg-slate-50 w-fit p-2 flex gap-4 rounded-lg min-w-[20rem] items-start ' >
                <img src={message.photoUrl} alt="" className=' h-10 w-10 rounded-full ' />
                <div>
                  <span className=' font-bold text-sm' > {message.user} </span>
                  <h3> {message.text}</h3>
                  {/* <p className=' italic text-[.75rem] mt-4' > { moment(message.createdAt.toDate()).fromNow()} </p> */}
                  {/* <p className=' italic text-[.75rem] mt-4' > { moment(message.createdAt.toDate()).calendar()} </p> */}
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <form onSubmit={handleSubmit} className=' flex relative items-center   ' >
        <Input
          className=" m-auto pl-8 pr-20 py-2 w-[100%] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 "
          placeholder=" Type your message here ... "
          onChange={(e) => setNewMessage(e.target.value) }
          value={newMessage}
        />
        <Button type="submit" className="absolute right-0"  > Send </Button>
      </form>
      <Button className=" bg-red-600 py-6 m-auto" onClick={removeRoom} > Leave room </Button>
    </div>
  )
}

export default TheChat