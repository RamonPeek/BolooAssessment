import React, { useState, useEffect } from 'react';
import './Results.css';
import axios from 'axios';
import {Vote} from "../../models/Vote";

const Results = () =>  {
    //Usually you get this Id from a list fetch action and use that to passdown the prop and fetch.
    let pollId = 1; //For now it is hardcoded.

    const [votes, setVotes] = useState<Vote[]>();

    const votesPromise = axios.get("http://localhost:8000/polls/" + pollId + "/votes")
        .then(({ data }) => data);

    useEffect(() => {
        votesPromise.then(setVotes);
    }, []);

    return (
        <>
            <ul>
                <b>Votes:</b>
                {votes?.map((o: Vote, i) => {
                    return <li key={i}>
                        {o.firstName} {o.lastName} -
                        {o.answerId}
                    </li>
                })
                }
            </ul>

        </>
    );
}

export default Results;
