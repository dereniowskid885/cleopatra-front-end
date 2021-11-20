import classes from '../styles/Home.module.scss';
import LoginForm from '../components/loginForm/LoginForm';
import Logo from '../components/layout/Logo';

function Home(props) {
    return (
        <main className={classes.home}>
            <Logo />
            <LoginForm 
                showRegister={props.showRegister}
            />
        </main>
    );
}

export default Home;