import classes from '../../../styles/ActionForm.module.scss';
import Fade from 'react-reveal/Fade';
import { IoMdCloseCircle } from "react-icons/io";
import { IconContext } from 'react-icons';
import { useRef, useState, useEffect } from 'react';

function BarberForm(props) {
    const [ phoneAlert, setPhoneAlertState ] = useState(false);
    const [ emailAlert, setEmailAlertState ] = useState(false);
    const [ skipValidation, setSkipValidationState ] = useState(false);

    const [ barberData, setBarberData ] = useState({});
    const [ barbers, setBarbers ] = useState([]);

    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const birthRef = useRef();

    useEffect(() => {
        fetch('http://localhost:8080/hairdressers')
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

            setBarbers(tempData);
        });
    }, []);

    useEffect(() => {
        if (props.editBarberIsOpen) {
            fetch('http://localhost:8080/hairdressers/' + props.barberId)
            .then(response => { return response.json(); })
            .then(data => { setBarberData(data); });
        }
    }, [props.editBarberIsOpen, props.barberId]);

    function overwrite() {
        setSkipValidationState(true);
    }

    function addBarber(e) {
        e.preventDefault();
        let registerAllowed = true;

        setPhoneAlertState(false);
        setEmailAlertState(false);

        if (barbers.length) {
            barbers.forEach(barber => {
                if (barber.phone_number === phoneRef.current.value) {
                    setPhoneAlertState(true);
                    registerAllowed = false;
                }

                if (barber.email === emailRef.current.value) {
                    setEmailAlertState(true);
                    registerAllowed = false;
                }
            });
        }

        if (registerAllowed || skipValidation) {
            const barberData = {
                first_name: nameRef.current.value,
                last_name: surnameRef.current.value,
                email: emailRef.current.value,
                phone_number: phoneRef.current.value,
                birth: birthRef.current.value
            }

            fetch(
                // eslint-disable-next-line no-useless-concat
                // 'https://cleopatra-db-default-rtdb.europe-west1.firebasedatabase.app/' + `${props.editBarberIsOpen ? 'barbers/' + props.barberId : 'barbers'}` + '.json',
                `http://localhost:8080/hairdressers/${props.editBarberIsOpen ? `${props.barberId}/update` : 'create'}`,
                {
                    method: 'POST',
                    body: JSON.stringify(barberData),
                    headers: { 'Content-type': 'application/json' }
                }
            ).then(() => {
                setSkipValidationState(false);
                props.barberAdded();
                props.onCloseBtnClick();
            });
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
                    <h1>Podaj dane:</h1>
                    <form onSubmit={addBarber}>
                        <div className={classes.window__form}>
                            <label htmlFor="name"><h2>Imię</h2></label>
                            <input type="text" name="name" id="name" ref={nameRef} defaultValue={barberData.first_name} minLength={2} maxLength={13} required/>
                            <label htmlFor="surname"><h2>Nazwisko</h2></label>
                            <input type="text" name="surname" id="surname" ref={surnameRef} defaultValue={barberData.last_name} minLength={2} maxLength={20} required/>
                            <label htmlFor="birth"><h2>Data urodzenia</h2></label>
                            <input type="date" name="birth" id="birth" ref={birthRef} defaultValue={barberData.birth} required/>
                            <label htmlFor="email"><h2>E-mail</h2></label>
                            <input type="email" name="email" id="email" ref={emailRef} defaultValue={barberData.email} minLength={5} maxLength={25} required/>
                            <label htmlFor="phone"><h2>Numer telefonu</h2></label>
                            <input type="text" name="phone" id="phone" ref={phoneRef} defaultValue={barberData.phone_number} minLength={12} maxLength={15} required/>
                        </div>
                        <div className={classes.window__buttons}>
                            <button className={classes.window__button} type="submit">Zatwierdź</button>
                            {props.editBarberIsOpen &&
                                <button className={classes.window__button} type="button" onClick={overwrite}>Nadpisz</button>
                            }
                            <button className={classes.window__button} onClick={props.onCloseBtnClick}>Anuluj</button>
                        </div>
                    </form>
                </div>
                {skipValidation &&
                    <Fade><h3 className={classes.window__alert}>Tryb nadpisywania włączony</h3></Fade>
                }
                {(emailAlert && !skipValidation) && 
                    <Fade><h3 className={classes.window__alert}>Fryzjer z danym adresem e-mail już istnieje.</h3></Fade>
                }
                {(phoneAlert && !skipValidation) &&
                    <Fade><h3 className={classes.window__alert}>Fryzjer z danym numerem telefonu już istnieje.</h3></Fade>
                }
            </div>
        </Fade>
    );
}

export default BarberForm;