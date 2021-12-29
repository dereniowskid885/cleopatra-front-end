import classes from '../../styles/LoginForm.module.scss';
import windowClass from '../../styles/Window.module.scss';
import Fade from 'react-reveal/Fade';
import { useRef, useState, useEffect } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { IconContext } from 'react-icons';

function RegisterForm(props) {
    const [ usernameAlert, setUsernameAlertState ] = useState(false);
    const [ emailAlert, setEmailAlertState ] = useState(false);
    const [ passwordAlert, setPasswordAlertState ] = useState(false);
    const [ registerAlert, setRegisterAlertState ] = useState(false);
    const [ users, setUsers ] = useState([]);

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
    const passwordConfirmRef = useRef();
    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();

    function registerUser(e) {
        e.preventDefault();

        setUsernameAlertState(false);
        setEmailAlertState(false);
        setPasswordAlertState(false);
        let registerAllowed = true;
        
        if (users.length) {
            users.forEach(user => {
                if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                    setPasswordAlertState(true);
                    registerAllowed = false;
                }

                if (user.username === usernameRef.current.value) {
                    setUsernameAlertState(true);
                    registerAllowed = false;
                }
                
                if (user.email === emailRef.current.value) {
                    setEmailAlertState(true);
                    registerAllowed = false;
                }
            });
        } else if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setPasswordAlertState(true);
            registerAllowed = false;
        }

        if (registerAllowed) {
            const userData = {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
                name: nameRef.current.value,
                surname: surnameRef.current.value,
                email: emailRef.current.value
            }
    
            fetch(
                'https://cleopatra-db-default-rtdb.europe-west1.firebasedatabase.app/users.json',
                {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: { 'Content-type': 'application/json' }
                }
            ).then(() => {
                setRegisterAlertState(true);
                window.location.reload();
            });
        }
    }

    return (
        <Fade>
            <div className={windowClass.window}>
                <IconContext.Provider value={
                    { 
                        size: "45px",
                        className: windowClass.window__icon, 
                        title: "window close button" 
                    }
                }>
                    <IoMdCloseCircle onClick={props.onCloseBtnClick}/>
                </IconContext.Provider>
                <div className={classes.login}>
                    <h1>Podaj swoje dane:</h1>
                    <form className={classes.login__form} onSubmit={registerUser}>
                        <label htmlFor="username"><h2>Nazwa użytkownika</h2></label>
                        <input type="text" name="username" id="username" ref={usernameRef} required/>
                        <label htmlFor="password"><h2>Hasło</h2></label>
                        <input type="password" name="password" id="password" ref={passwordRef} required/>
                        <label htmlFor="password_confirm"><h2>Powtórz hasło</h2></label>
                        <input type="password" name="password_confirm" id="password_confirm" ref={passwordConfirmRef} required/>
                        <label htmlFor="name"><h2>Imię</h2></label>
                        <input type="text" name="name" id="name" ref={nameRef} required/>
                        <label htmlFor="surname"><h2>Nazwisko</h2></label>
                        <input type="text" name="surname" id="surname" ref={surnameRef} required/>
                        <label htmlFor="email"><h2>E-mail</h2></label>
                        <input type="email" name="email" id="email" ref={emailRef} required/>
                        <div className={classes.login__buttons}>
                            <button className={classes.login__button} type="submit">Zatwierdź</button>
                            <button className={classes.login__button} onClick={props.onCloseBtnClick}>Anuluj</button>
                        </div>
                    </form>
                    { usernameAlert &&
                        <Fade><h3>Użytkownik o takiej nazwie już istnieje.</h3></Fade>
                    }
                    { emailAlert && 
                        <Fade><h3>Konto z danym adresem e-mail już istnieje.</h3></Fade>
                    }
                    { passwordAlert && 
                        <Fade><h3>Hasła muszą być takie same.</h3></Fade>
                    } 
                    { registerAlert &&
                        <Fade><h3>Konto założone !</h3></Fade>
                    }                      
                </div>
            </div>
        </Fade>
    );
}

export default RegisterForm;