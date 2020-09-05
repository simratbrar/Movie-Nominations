import React from 'react';
import './App.css';
import Layout from './components/layout';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path='*' component={Layout} />
    </div>
  );
}

export default App;
