import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    let item = null;

    if (Math.random() < 0.5) {
      item = (
        <p>Random less than 0.5</p>
      )
    } else {
      item = (
        <p>Random is greater than 0.5</p>
      )
    }
    return <>{ item }</>
  }
}

export default App;
