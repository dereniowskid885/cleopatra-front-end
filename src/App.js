import classes from './styles/App.module.scss';
import Home from './pages/Home';
import Reservations from './pages/Reservations';
import Services from './pages/Services';
import AdministrationPanel from './pages/AdministrationPanel';
import Background from './components/windowBackground/Background';
import RegisterForm from './components/loginForm/RegisterForm';
import { Route, Routes } from 'react-router-dom';
import { Component, React } from 'react';
import { AnimatePresence } from 'framer-motion';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundShow: false,
      registerShow: false,
      username: ''
    };

    this.showRegister = () => {
      this.setState({ 
        backgroundShow: true,
        registerShow: true 
      });
    };

    this.closeRegister = () => {
      this.setState({ 
        backgroundShow: false,
        registerShow: false 
      });
    };

    this.loginUser = (username) => {
      this.setState({
        username: username
      });
    }
  }

  state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  };
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  render() {
    return (
      <main className={classes.container}>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={ 
              <Home 
                showRegister={this.showRegister}
                loginUser={this.loginUser}
              /> 
            }/>
            <Route path="/reservations" element={
              <Reservations
                userLoggedIn={this.state.username}
              /> 
            }/>
            <Route path="/services" element={
              <Services
                userLoggedIn={this.state.username}
              /> 
            }/>
            <Route path="/panel" element={
              <AdministrationPanel
                userLoggedIn={this.state.username}
                setUsername={this.loginUser}
              /> 
            }/>
            <Route path="/backend" element={
              <p className="App-intro">{this.state.data}</p>         
            }/>
          </Routes>
        </AnimatePresence>
        { this.state.registerShow && 
          <RegisterForm 
            onCloseBtnClick={this.closeRegister}
          />
        }
        { this.state.backgroundShow &&
          <Background />
        }
      </main>
    );
  }
}

export default App;