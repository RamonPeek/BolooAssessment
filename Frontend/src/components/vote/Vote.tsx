import React, { useState, useEffect } from 'react';
import './Vote.css';

const Vote = () =>  {
    const [votes, setVotes] = useState();

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

  return (
      <>
        Vote
      </>
  );
}

export default Vote;
