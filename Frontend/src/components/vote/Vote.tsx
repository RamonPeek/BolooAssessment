import React, { useState, useEffect } from 'react';
import './Vote.css';
import axios from 'axios';
import {Poll} from "../../models/Poll";

const Vote = () =>  {
    //Usually you get this Id from a list fetch action and use that to passdown the prop and fetch.
    let pollId = 1; //For now it is hardcoded.

    const [poll, setPoll] = useState<Poll>();

    const pollPromise = axios.get("http://localhost:8000/polls/" + pollId)
        .then(({ data }) => data);

    function handleVote(firstName: string, lastName: string): any {
        axios.post("http://localhost:8000/polls/" + pollId + "/vote/" + firstName + "/" + lastName).then(vote => {
            alert('Succesfully voted!');
        })
    }

    useEffect(() => {
        pollPromise.then(setPoll);
    }, []);

  return (
      <>
          {poll?.question}
          {poll?.answerOptions.map((o, i) => {
              return <button onClick={() => handleVote('Ramon', 'Peek')}>
                  {o.text}
              </button>
          })
          }
      </>
  );
}

export default Vote;
