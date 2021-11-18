import classes from './styles/App.module.scss';
import Home from './pages/Home';
import Reservations from './pages/Reservations';
import { Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';

class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <main className={classes.container}>
        <Routes>
          <Route path="/" element={ 
              <Home /> }
          />
          <Route path="/reservations" element={
              <Reservations /> 
            } 
          />
          <Route path="/backend" element={
              <p className="App-intro">{this.state.data}</p>         
            } 
          />
        </Routes>
      </main>
  );
  }
}

export default App;