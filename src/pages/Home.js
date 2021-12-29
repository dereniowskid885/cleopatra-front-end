import classes from '../styles/Home.module.scss';
import LoginForm from '../components/loginForm/LoginForm';
import Logo from '../components/layout/Logo';
import { useState } from 'react';
import { motion } from 'framer-motion';

function Home(props) {
    const [ loginAlert, setLoginAlertState ] = useState(false);

    function showRegister() {
        setLoginAlertState(false);
        props.showRegister();
    }

    function showLoginAlert() {
        setLoginAlertState(true);
    }

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <main className={classes.home}>
                <Logo />
                <LoginForm 
                    showRegister={showRegister}
                    showLoginAlert={showLoginAlert}
                    loginAlert={loginAlert}
                    loginUser={props.loginUser}
                />
            </main>
        </motion.div>
    );
}

export default Home;