import classes from '../styles/Home.module.scss';
import Logo from '../components/layout/Logo';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function LoginErrorPage() {
    const navigate = useNavigate();

    function goToHome() {
        navigate('/');
    }

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <main className={classes.home}>
                <Logo />
                <h1>Zaloguj się aby mieć dostęp do tej podstrony.</h1>
                <button className={classes.home__button} onClick={goToHome}>Zaloguj się</button>
            </main>
        </motion.div>
    );
}

export default LoginErrorPage;