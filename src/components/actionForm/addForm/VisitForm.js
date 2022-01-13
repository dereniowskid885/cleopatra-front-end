import classes from '../../../styles/ActionForm.module.scss';
import Fade from 'react-reveal/Fade';
import { IoMdCloseCircle } from "react-icons/io";
import { IconContext } from 'react-icons';

function VisitForm(props) {
    function registerVisit() {

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
                    <h1>Podaj dane wizyty</h1>
                    <form onSubmit={registerVisit}>
                        <div className={classes.window__form}>
                            <label htmlFor="email"><h2>E-mail</h2></label>
                            <input type="email" name="email" id="email" required/>
                            <label htmlFor="password"><h2>Hasło</h2></label>
                            <input type="password" name="password" id="password" required/>
                            <label htmlFor="password_confirm"><h2>Powtórz hasło</h2></label>
                            <input type="password" name="password_confirm" id="password_confirm" required/>
                            <label htmlFor="name"><h2>Imię</h2></label>
                            <input type="text" name="name" id="name" required/>
                            <label htmlFor="surname"><h2>Nazwisko</h2></label>
                            <input type="text" name="surname" id="surname" required/>
                            <label htmlFor="phone"><h2>Numer telefonu</h2></label>
                            <input type="tel" name="phone" id="phone" minLength={12} maxLength={15} required/>
                        </div>
                        <div className={classes.window__buttons}>
                            <button className={classes.window__button} type="submit">Zatwierdź</button>
                            <button className={classes.window__button} onClick={props.onCloseBtnClick}>Anuluj</button>
                        </div>
                    </form>                 
                </div> 
            </div>
        </Fade>
    );
}

export default VisitForm;