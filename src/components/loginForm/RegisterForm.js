import classes from '../../styles/ActionForm.module.scss';
import Fade from 'react-reveal/Fade';
import { useRef, useState, useEffect } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { IconContext } from 'react-icons';

function RegisterForm(props) {
    const [ emailAlert, setEmailAlertState ] = useState(false);
    const [ passwordAlert, setPasswordAlertState ] = useState(false);
    const [ phoneAlert, setPhoneAlertState ] = useState(false);
    const [ registerAlert, setRegisterAlertState ] = useState(false);

    const [ userData, setUserData ] = useState({});
    const [ users, setUsers ] = useState([]);

    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const genderRef = useRef();
    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();

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

    useEffect(() => {
        if (props.editAccountIsOpen) {
            fetch('http://localhost:8080/clients/' + props.accountId)
            .then(response => { return response.json(); })
            .then(data => { setUserData(data); });
        }
    }, [props.editAccountIsOpen, props.accountId]);

    function registerUser(e) {
        e.preventDefault();
        let registerAllowed = true;

        setEmailAlertState(false);
        setPasswordAlertState(false);
        setPhoneAlertState(false);
        
        if (users.length) {
            users.forEach(user => {
                if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                    setPasswordAlertState(true);
                    registerAllowed = false;
                }
                
                if (user.email === emailRef.current.value) {
                    if (props.editAccountIsOpen) {
                        registerAllowed = true;
                    } else {
                        setEmailAlertState(true);
                        registerAllowed = false;
                    }
                }

                if (user.phone_number === phoneRef.current.value) {
                    if (props.editAccountIsOpen) {
                        registerAllowed = true;
                    } else {
                        setPhoneAlertState(true);
                        registerAllowed = false;
                    }
                }
            });
        } else if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setPasswordAlertState(true);
            registerAllowed = false;
        }

        if (registerAllowed) {
            const userData = {
                email: emailRef.current.value,
                password: passwordRef.current.value,
                gender: genderRef.current.value,
                first_name: nameRef.current.value,
                last_name: surnameRef.current.value,
                phone_number: phoneRef.current.value
            }

            fetch(
                // eslint-disable-next-line no-useless-concat
                // 'https://cleopatra-db-default-rtdb.europe-west1.firebasedatabase.app/' + `${props.editAccountIsOpen ? 'users/' + props.accountId : 'users'}` + '.json',
                `http://localhost:8080/clients/${props.editAccountIsOpen ? `${props.accountId}/update` : 'create'}`,
                {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: { 'Content-type': 'application/json' }
                }
            ).then(() => {
                if (props.administrationPanelIsOpen) {
                    props.userAdded();
                    props.onCloseBtnClick();
                } else {
                    setRegisterAlertState(true);
                    window.location.reload();
                }
            });
        }

        if (props.editAccountIsOpen && props.userLoggedIn === userData.first_name) {
            props.setUsername(nameRef.current.value);
        }
    }

    return (
        <Fade>
            <div className={classes.window}>
                <IconContext.Provider value={
                    { 
                        size: "45px",
                        className: classes.window__icon, 
                        title: "window close button" 
                    }
                }>
                    <IoMdCloseCircle onClick={props.onCloseBtnClick}/>
                </IconContext.Provider>
                <div className={classes.window__container}>
                    <h1>Podaj 
                    {!props.administrationPanelIsOpen ? ' swoje ' : ' '} 
                    dane:</h1>
                    <form onSubmit={registerUser}>
                        <div className={classes.window__form}>
                            <label htmlFor="email"><h2>E-mail</h2></label>
                            <input type="email" name="email" id="email" ref={emailRef} defaultValue={userData.email} required/>
                            <label htmlFor="password"><h2>Hasło</h2></label>
                            <input type="password" name="password" id="password" ref={passwordRef} defaultValue={userData.password} required/>
                            <label htmlFor="password_confirm"><h2>Powtórz hasło</h2></label>
                            <input type="password" name="password_confirm" id="password_confirm" ref={passwordConfirmRef} defaultValue={userData.password} required/>
                            <label htmlFor="gender"><h2>Płeć</h2></label>
                            <select name="gender" id="gender" ref={genderRef} required>
                                {userData.gender === 'm' ? <option value="m" selected>Mężczyzna</option> : <option value="m">Mężczyzna</option>}
                                {userData.gender === 'k' ? <option value="k" selected>Kobieta</option> : <option value="k">Kobieta</option>}
                            </select>
                            <label htmlFor="name"><h2>Imię</h2></label>
                            <input type="text" name="name" id="name" ref={nameRef} defaultValue={userData.first_name} required/>
                            <label htmlFor="surname"><h2>Nazwisko</h2></label>
                            <input type="text" name="surname" id="surname" ref={surnameRef} defaultValue={userData.last_name} required/>
                            <label htmlFor="phone"><h2>Numer telefonu</h2></label>
                            <input type="tel" name="phone" id="phone" ref={phoneRef} defaultValue={userData.phone_number} minLength={12} maxLength={15} required/>
                        </div>
                        <div className={classes.window__buttons}>
                            <button className={classes.window__button} type="submit">Zatwierdź</button>
                            <button className={classes.window__button} onClick={props.onCloseBtnClick}>Anuluj</button>
                        </div>
                    </form>                 
                </div>
                {emailAlert && 
                    <Fade><h3 className={classes.window__alert}>Konto z danym adresem e-mail już istnieje.</h3></Fade>
                }
                {phoneAlert &&
                    <Fade><h3 className={classes.window__alert}>Konto z danym numerem telefonu już istnieje.</h3></Fade>
                }
                {passwordAlert && 
                    <Fade><h3 className={classes.window__alert}>Hasła muszą być takie same.</h3></Fade>
                }
                {registerAlert &&
                    <Fade><h3 className={classes.window__alert}>Konto założone !</h3></Fade>
                }     
            </div>
        </Fade>
    );
}

export default RegisterForm;