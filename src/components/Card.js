import React, { useState, useEffect } from 'react';
import './Card.css';
import TinderCard from "react-tinder-card";
import axios from '../axios'

function Card() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get('/webchat/card');

            setPeople(req.data);
        }

        fetchData();
    })

    console.log(people)

    const swiped = (direction, nameToDelete) => {
        console.log("removing: " + nameToDelete);
        // setLastDirection(direction);
    };

    const outOfFrame = (name) => {
        console.log(name + " left the screen!");
    };

    return (
        <div className="card">
            <div className="card__container">
                {people.map(person => (
                    <TinderCard className="swipe"
                    key={person.name}
                    preventSwipe={["up", "down"]}
                    onSwipe={(dir) => swiped(dir, person.name)}
                    onCardLeftScreen={() => outOfFrame(person.name)}
                    >
                        <div
                        style = {{backgroundImage: `url(${person.url})`}}
                        className="card__card">
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default Card
