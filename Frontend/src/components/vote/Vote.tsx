import React, { useState, useEffect } from 'react';
import './Vote.css';
import axios from 'axios';
import {Poll} from "../../models/Poll";

const Vote = () =>  {
    //Usually you get this Id from a list fetch action and use that to passdown the prop and fetch.
    let pollId = 1; //For now it is hardcoded.

    const [poll, setPoll] = useState<Poll>();
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();


    const pollPromise = axios.get("http://localhost:8000/polls/" + pollId)
        .then(({ data }) => data);

    function handleVote(answerId: number): any {
        axios.post("http://localhost:8000/polls/" + pollId + "/vote/" + answerId + "/" + firstName + "/" + lastName).then(vote => {
            alert('Succesfully voted!');
        }).catch(() => {
            //Usually better errorhandling here and printing the message.
            alert('You have already voted!')
        })
    }

    useEffect(() => {
        pollPromise.then(setPoll);
    }, []);

  return (
      <>
          Enter your name:
          <input
              value={firstName}
              placeholder="first name"
              onChange={(event) => {
                  setFirstName(event.target.value);
              }}
          />
          <input
              value={lastName}
              placeholder="last name"
              onChange={(event) => {
                  setLastName(event.target.value);
              }}
          />
          <br/><br/>
          {poll?.question}
          {poll?.answerOptions.map((o, i) => {
              return <button key={o.id} onClick={() => handleVote(o.id)}>
                  {o.text}
              </button>
          })
          }
      </>
  );
}

export default Vote;
