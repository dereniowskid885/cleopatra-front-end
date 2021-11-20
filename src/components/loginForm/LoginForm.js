import classes from '../../styles/LoginForm.module.scss';
import { Link } from 'react-router-dom';

function LoginForm(props) {
    return (
        <div className={classes.login}>
            <form className={classes.login__form}>
                <label htmlFor="username"><h2>Nazwa użytkownika</h2></label>
                <input type="text" name="username" id="username" />
                <label htmlFor="password"><h2>Hasło</h2></label>
                <input type="text" name="password" id="password" />
                <button className={classes.login__button} type="submit"><Link to="/reservations">Zaloguj się</Link></button>
            </form>
            <div className={classes.login__register}>
                <h3>Nie masz konta? Zarejestruj się!</h3>
                <button className={classes.login__button} onClick={props.showRegister}>Rejestracja</button>
            </div>
        </div>
    );
}

export default LoginForm;