import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from './InfoBar';
import Messages from './Messages';
import Input from './Input';
import './Chat.css'

let socket;

function Chat({location}) {
    const ENDPOINT = 'localhost:5000'
    var allowedOrigins = "http://localhost:*";
    var path = '/stomp';
    // eslint-disable-next-line
    const [name, setName] = useState('user');
    // eslint-disable-next-line
    const [room, setRoom] = useState('');
    const [message, setMessage]  = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT);

        console.log(location.search)
        console.log(`${name} and ${room}`)
        setName(name)
        setRoom(room)

        socket.emit('join', {name, room}, (error) => {
            if (error) {
                alert(error);
            }
        }, [ENDPOINT, location.search]);

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    
    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat
