import React,{ useState, useRef } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import {Cookies} from "react-cookie";
import { Chat } from './components/Chat';
import { signOut } from 'firebase/auth';
import {auth} from './Firebase-config';

const cookies  = new Cookies();

function App() {
  const  [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room,setRoom] = useState(null);
  const rooomInputRef = useRef(null);
  const signUserOut = async () =>{
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if(!isAuth){
    return (
        <div className="App">
        <Auth setIsAuth={setIsAuth} />
        </div>
    );
  }
   
  return( 
    <>
    <div className="sign-out">
        <button onClick={signUserOut}>Sign Out</button>
    </div>
      
    <div>
    <h1 className='enter-room-heading'>Firechat🔥</h1>
    <div >
    {
      room ? (<div className='chat-container'><Chat room={room}/></div> ):(
        <div className="room select-room-container">
          <p>Enter room name:</p>
          <input ref={rooomInputRef} />
          <button onClick={()=>setRoom(rooomInputRef.current.value)}>Enter chat</button>
        </div>
      )}

      </div>
      
    </div>
      
      </>
      );
}

export default App;
