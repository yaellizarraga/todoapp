import React from 'react';
import Tasks from './Tasks';
import './app.css';

function App() {
  return (
    <div className="container">
      <div className="center blue-text text-darken-2"><h3>My todo list</h3></div>
        <Tasks />
      </div>
  );
}

export default App;
