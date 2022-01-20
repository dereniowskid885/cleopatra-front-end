import classes from './styles/App.module.scss';
import Home from './pages/Home';
import Reservations from './pages/Reservations';
import Services from './pages/Services';
import AdministrationPanel from './pages/AdministrationPanel';
import MyAccount from './pages/MyAccount';
import Background from './components/windowBackground/Background';
import RegisterForm from './components/loginForm/RegisterForm';
import LoginErrorPage from './pages/LoginErrorPage';
import { Route, Routes } from 'react-router-dom';
import { Component, React } from 'react';
import { AnimatePresence } from 'framer-motion';
import 'react-datepicker/dist/react-datepicker.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundShow: false,
      registerShow: false,
      name: '',
      userId: '',
      admin: false
    };

    this.showRegister = () => {
      this.setState({ 
        backgroundShow: true,
        registerShow: true 
      });
    };

    this.closeRegister = (e) => {
      e.preventDefault();
      
      this.setState({ 
        backgroundShow: false,
        registerShow: false 
      });
    };

    this.loginUser = (name, id, isAdmin) => {
      this.setState({
        name: name,
        userId: id,
        admin: isAdmin
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
                isAdmin={this.state.admin}
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
                isAdmin={this.state.admin}
              /> 
            }/>
            <Route path="/account" element={
              <MyAccount
                userId={this.state.userId}
                userLoggedIn={this.state.name}
                setUsername={this.loginUser}
                isAdmin={this.state.admin}
              />
            }/>
            <Route path="/error" element={
              <LoginErrorPage 
              />
            }/>
          </Routes>
        </AnimatePresence>
        { this.state.registerShow && 
          <RegisterForm
            isAdmin={this.state.admin}
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