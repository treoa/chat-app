import React, { useState } from 'react'
import './Join.css';
import { Link } from 'react-router-dom' 

function Join() {
    const [name, setName] = useState('user');
    const [room, setRoom] = useState('');
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join route</h1>
                <div> <input placeholder="Full name" className="joinInput" type="text" 
                    onChange={(event) => setName(event.target.value)} required /> </div>
                <div> <input placeholder="The room" className="joinInput mt-20" type="text" 
                    onChange={(event) => setRoom(event.target.value)} required /> </div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
