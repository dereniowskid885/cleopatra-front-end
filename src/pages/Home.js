import classes from '../styles/Home.module.scss'
import LoginForm from '../components/loginForm/LoginForm'
import Logo from '../components/layout/Logo'

function Home() {
    return (
        <main className={classes.home}>
            <Logo />
            <LoginForm />
        </main>
    );
}

export default Home;