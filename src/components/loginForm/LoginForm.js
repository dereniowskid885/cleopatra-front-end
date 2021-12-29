import classes from '../../styles/LoginForm.module.scss';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {
    const [ users, setUsers ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(
            'https://cleopatra-db-default-rtdb.europe-west1.firebasedatabase.app/users.json'
        ).then(response => {
            return response.json();
        }).then(data => {
            const tempData = [];

            for (const key in data) {
                const item = {
                    id: key,
                    ...data[key]
                };

                tempData.push(item);
            }

            setUsers(tempData);
        });
    }, []);

    const usernameRef = useRef();
    const passwordRef = useRef();

    function loginUser(e) {
        e.preventDefault();
        let userAuth = false;

        const userData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }

        users.forEach(user => {
            if (userData.username === user.username && userData.password === user.password) {
                userAuth = true;
            }
        });

        if (userAuth) {
            props.loginUser(userData.username);
            navigate('/reservations');
        } else {
            props.showLoginAlert();
        }
    }

    return (
        <div className={classes.login}>
            <form className={classes.login__form} onSubmit={loginUser}>
                <label htmlFor="username"><h2>Nazwa użytkownika</h2></label>
                <input type="text" name="username" id="username" ref={usernameRef} required/>
                <label htmlFor="password"><h2>Hasło</h2></label>
                <input type="password" name="password" id="password" ref={passwordRef} required/>
                <button className={classes.login__button} type="submit">Zaloguj się</button>
            </form>
            <div className={`${classes.login__alert} ${props.loginAlert && classes.login__alertShow}`}>
                <h3>Nieprawidłowe hasło, lub nazwa użytkownika.</h3>
            </div>
            <div className={classes.login__register}>
                <h3>Nie masz konta? Zarejestruj się!</h3>
                <button className={classes.login__button} onClick={props.showRegister}>Rejestracja</button>
            </div>
        </div>
    );
}

export default LoginForm;