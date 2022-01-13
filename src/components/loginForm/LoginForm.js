import classes from '../../styles/ActionForm.module.scss';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function LoginForm(props) {
    const [ users, setUsers ] = useState([]);

    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        fetch('http://localhost:8080/clients')
        .then(response => { return response.json(); })
        .then(data => {
            const tempData = [];

            for (const key in data) {
                const item = {
                    _id: key,
                    ...data[key]
                };

                tempData.push(item);
            }

            setUsers(tempData);
        });
    }, []);

    function loginUser(e) {
        e.preventDefault();

        // bcrypt.hash(passwordRef.current.value, 10, (err, hashedPassword) => {
        //     let userAuth = false;
            
        //     const userData = {
        //         id: '',
        //         email: emailRef.current.value,
        //         password: hashedPassword,
        //     }

        //     console.log(userData.password);

        //     users.forEach(user => {
        //         if (userData.email === user.email && userData.password === user.password) {
        //             userAuth = true;
        //             userData.id = user._id;
        //         }
        //     });

        //     if (userAuth) {
        //         props.loginUser(userData.email, userData.id);
        //         navigate('/reservations');
        //     } else {
        //         props.showLoginAlert();
        //     }
        // });

        let userAuth = false;
            
        const userData = {
            id: '',
            name: '',
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        users.forEach(user => {
            if (userData.email === user.email && userData.password === user.password) {
                userAuth = true;
                userData.id = user._id;
                userData.name = user.first_name;
            }
        });

        if (userAuth) {
            props.loginUser(userData.name, userData.id);
            navigate('/reservations');
        } else {
            props.showLoginAlert();
        }
    }

    return (
        <div className={classes.login}>
            <form className={classes.login__form} onSubmit={loginUser}>
                <label htmlFor="email"><h2>E-mail</h2></label>
                <input type="text" name="email" id="email" ref={emailRef} required/>
                <label htmlFor="password"><h2>Hasło</h2></label>
                <input type="password" name="password" id="password" ref={passwordRef} required/>
                <button className={classes.login__button} type="submit">Zaloguj się</button>
            </form>
            <div className={`${classes.login__alert} ${props.loginAlert && classes.login__alertShow}`}>
                <h3>Nieprawidłowe hasło, lub adres e-mail.</h3>
            </div>
            <div className={classes.login__register}>
                <h3>Nie masz konta? Zarejestruj się!</h3>
                <button className={classes.login__button} onClick={props.showRegister}>Rejestracja</button>
            </div>
        </div>
    );
}

export default LoginForm;