import classes from '../../styles/LoginForm.module.scss';
import windowClass from '../../styles/Window.module.scss';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

function RegisterForm(props) {
    return (
        <Fade>
            <div className={windowClass.window}>
                <div className={classes.login}>
                    <h1>Podaj swoje dane:</h1>
                    <form className={classes.login__form}>
                        <label htmlFor="username"><h2>Nazwa użytkownika</h2></label>
                        <input type="text" name="username" id="username"/>
                        <label htmlFor="password"><h2>Hasło</h2></label>
                        <input type="text" name="password" id="password"/>
                        <label htmlFor="password_confirm"><h2>Powtórz hasło</h2></label>
                        <input type="text" name="password_confirm" id="password_confirm"/>
                        <label htmlFor="name"><h2>Imię</h2></label>
                        <input type="text" name="name" id="name"/>
                        <label htmlFor="surname"><h2>Nazwisko</h2></label>
                        <input type="text" name="surname" id="surname"/>
                        <label htmlFor="email"><h2>E-mail</h2></label>
                        <input type="text" name="email" id="email"/>
                        <div className={classes.login__buttons}>
                            <button className={classes.login__button} type="submit">Zatwierdź</button>
                            <button className={classes.login__button} onClick={props.onCloseBtnClick}>Anuluj</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fade>
    );
}

export default RegisterForm;