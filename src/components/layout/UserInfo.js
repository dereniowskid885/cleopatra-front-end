import classes from '../../styles/UserInfo.module.scss';
import { FaUserCircle } from "react-icons/fa";
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

function UserInfo(props) {
    return (
        <div className={classes.userInfo}>
            <IconContext.Provider value={
                { 
                    size: "45px",
                    title: "user icon" 
                }
            }>
                <FaUserCircle />
            </IconContext.Provider>
            <h2 className={classes.userInfo__message}>Witaj, {props.userLoggedIn}!</h2>
            <button className={classes.userInfo__button}><Link to="/">Wyloguj się</Link></button>
        </div>
    );
}

export default UserInfo;