import classes from '../../styles/LoginForm.module.scss';
import windowClass from '../../styles/Window.module.scss';
import Fade from 'react-reveal/Fade';
import { useRef } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { IconContext } from 'react-icons';

function RegisterForm(props) {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();

    function submitHandler(e) {
        e.preventDefault();
        let userExist = false;

        // fetch(
        //     'https://cleopatra-db-default-rtdb.europe-west1.firebasedatabase.app/users.json'
        // ).then(response => {
        //     return response.json();
        // }).then(data => {
        //     data.forEach(user => {
        //         if (user.username === usernameRef.current.value) {
        //             userExist = true;
        //         }
        //     });

        //     if ((!userExist) && (passwordRef.current.value === passwordConfirmRef.current.value)) {
        //         const userData = {
        //             username: usernameRef.current.value,
        //             password: passwordRef.current.value,
        //             name: nameRef.current.value,
        //             surname: surnameRef.current.value,
        //             email: emailRef.current.value
        //         }

        //         fetch(
        //             'https://cleopatra-db-default-rtdb.europe-west1.firebasedatabase.app/users.json',
        //             {
        //                 method: 'POST',
        //                 body: JSON.stringify(userData),
        //                 headers: { 'Content-type': 'application/json' }
        //             }
        //         );
        //     }
        // });

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
        );
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
                    <form className={classes.login__form} onSubmit={submitHandler}>
                        <label htmlFor="username"><h2>Nazwa użytkownika</h2></label>
                        <input type="text" name="username" id="username" ref={usernameRef}/>
                        <label htmlFor="password"><h2>Hasło</h2></label>
                        <input type="password" name="password" id="password" ref={passwordRef}/>
                        <label htmlFor="password_confirm"><h2>Powtórz hasło</h2></label>
                        <input type="password" name="password_confirm" id="password_confirm" ref={passwordConfirmRef}/>
                        <label htmlFor="name"><h2>Imię</h2></label>
                        <input type="text" name="name" id="name" ref={nameRef}/>
                        <label htmlFor="surname"><h2>Nazwisko</h2></label>
                        <input type="text" name="surname" id="surname" ref={surnameRef}/>
                        <label htmlFor="email"><h2>E-mail</h2></label>
                        <input type="text" name="email" id="email" ref={emailRef}/>
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