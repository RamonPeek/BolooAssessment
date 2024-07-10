import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import './App.css';
import Vote from "./components/vote/Vote";
import Results from "./components/results/Results";

const App = () =>  {
  return (
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Vote</Link>
            </li>
            <li>
              <Link to="/results">Results</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Vote/>}/>
          <Route path="/results" element={<Results/>}/>
        </Routes>
      </>
  );
}

export default App;
