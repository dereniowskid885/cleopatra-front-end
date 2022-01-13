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
      name: '',
      userId: ''
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

    this.loginUser = (name, id) => {
      this.setState({
        name: name,
        userId: id
      });
    }
  }

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
                userLoggedIn={this.state.name}
              /> 
            }/>
            <Route path="/services" element={
              <Services
                userLoggedIn={this.state.name}
              /> 
            }/>
            <Route path="/panel" element={
              <AdministrationPanel
                userLoggedIn={this.state.name}
                userId={this.state.userId}
                setUsername={this.loginUser}
              /> 
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