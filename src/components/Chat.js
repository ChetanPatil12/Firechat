import { useState,useEffect } from "react";
import {addDoc, collection,serverTimestamp, query, onSnapshot,where, orderBy} from 'firebase/firestore';
import { auth, db } from "../Firebase-config";
import  "../Styles/Chat.css";

export const Chat = (props) =>{
    const {room} = props;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesRef = collection(db,"messages");

    useEffect(()=>{
        const queryMessages = query(messagesRef,where ("room", "==", room),orderBy("createdAt"));
        const unsuscribe = onSnapshot(queryMessages,(snapshot)=>{
            let messages = [];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(), id:doc.id })
            });
            setMessages(messages);
        });

        return () => unsuscribe();
    },[]);

    const handleSubmit = async (e) => { 
        e.preventDefault();
        if(newMessage === "") {return};

        await addDoc(messagesRef,{
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });
        setNewMessage("");
};
     return(
        <div className="chat-app">
        <div className="header">
            <h1>Welcome to: {room}</h1>
        </div>
            <div  className="messages">
            {messages.map((message)=>(
                <div className="message" key={message.id}>
                    <span className="user">{message.user}</span>
                    {message.text}
                </div>
            ))}
            </div>
            <form  onSubmit={handleSubmit} className="new-message-form">
                <input className="new-message-input" type="text"
                 placeholder="Type your message" 
                 onChange={(e)=>setNewMessage(e.target.value)}
                 value={newMessage}
                 />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
     )
}