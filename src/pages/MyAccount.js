import UserInfo from '../components/layout/UserInfo';
import RegisterForm from '../components/loginForm/RegisterForm';
import Background from '../components/windowBackground/Background';
import UserTable from '../components/items/UserTable';
import VisitForm from '../components/actionForm/addForm/VisitForm';
import classes from '../styles/MyAccount.module.scss';
import { AiFillRightCircle } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function MyAccount(props) {
    const [ accountPageIsOpen, setAccountPageState ] = useState(true);
    const [ visitsPageIsOpen, setVisitsPageState ] = useState(false);

    const [ editAccountIsOpen, setEditAccountState ] = useState(false);
    const [ editVisitIsOpen, setEditVisitState ] = useState(false);

    const [ visitIsAdded, setVisitIsAddedState ] = useState(false);

    const [ visitId, setVisitId ] = useState('');

    const [ userData, setUserData ] = useState([]);
    const navigate = useNavigate();

    if(props.userLoggedIn === '') {
        navigate('/error')
    }

    useEffect(() => {
        fetch('http://localhost:8080/clients/' + props.userId)
        .then(response => { return response.json(); })
        .then(data => { setUserData(data); });
    }, [props.userId]);

    function openVisitsPage() {
        setVisitsPageState(true);
        setAccountPageState(false);
    }

    function openAccountPage() {
        setAccountPageState(true);
        setVisitsPageState(false);
    }

    function openEditAccount() {
        setEditAccountState(true);
    }

    function openEditVisit(visitId) {
        setEditVisitState(true);
        setVisitId(visitId);
    }

    function visitAdded() {
        setVisitIsAddedState(true);
    }

    function closeWindow() {
        setEditAccountState(false);
        setEditVisitState(false);
    }

    function goToServices() {
        navigate('/services');
    }

    function goToPanel() {
        navigate('/panel');
    }

    function updateUserData(userData) {
        setUserData(userData);
    }

    return (
        <main className={classes.account}>
            <UserInfo userLoggedIn={props.userLoggedIn}/>
            <div className={classes.account__pageBtn}>
                <IconContext.Provider value={
                    { 
                    size: "75px",
                    className: classes.account__pageBtnIcon + ' ' + classes.account__pageBtnIconLeft, 
                    title: "window close button" 
                    }
                }>
                    <AiFillRightCircle onClick={goToServices}/>
                </IconContext.Provider>
                <h2 className={classes.account__pageTextLeft}>Usługi</h2>
            </div>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={classes.account__wrapper}>
                <h1 className={classes.account__title}>Moje konto</h1>
                { accountPageIsOpen &&
                    <div className={classes.account__content}>
                        <div className={classes.account__pageButtons}>
                            <h2 className={classes.account__subpage + ' ' + classes.account__subpageSelected}>Dane</h2>
                            <h2 className={classes.account__subpage} onClick={openVisitsPage}>Rezerwacje</h2>
                        </div>
                        <motion.div 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}} 
                            exit={{opacity: 0}}
                            transition={{duration: 0.5}}
                            className={classes.account__contentWrapper}
                        >
                            <div className={classes.account__details}>
                                <IconContext.Provider value={
                                    { 
                                        title: "user icon",
                                        className: classes.account__icon
                                    }
                                }>
                                    <FaUserCircle />
                                </IconContext.Provider>
                                <h2>E-mail: </h2><h3>{userData.email}</h3>
                                <h2>Imię: </h2><h3>{userData.first_name}</h3>
                                <h2>Nazwisko: </h2><h3>{userData.last_name}</h3>
                                <h2>Telefon: </h2><h3>{userData.phone_number}</h3>
                                <button className={classes.account__button} onClick={openEditAccount}>Edytuj</button>
                            </div>
                        </motion.div>
                        { editAccountIsOpen &&
                            <div>
                                <RegisterForm
                                    onCloseBtnClick={closeWindow}
                                    accountId={props.userId}
                                    editAccountIsOpen={true}
                                    myAccountPageIsOpen={true}
                                    updateUserData={updateUserData}
                                    isAdmin={props.isAdmin}
                                    setUsername={props.setUsername}
                                />
                                <Background />
                            </div>
                        }
                    </div>
                }
                { visitsPageIsOpen &&
                    <div className={classes.account__content}>
                        <div className={classes.account__pageButtons}>
                            <h2 className={classes.account__subpage} onClick={openAccountPage}>Dane</h2>
                            <h2 className={classes.account__subpage + ' ' + classes.account__subpageSelected}>Rezerwacje</h2>
                        </div>
                        <motion.div 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}} 
                            exit={{opacity: 0}}
                            transition={{duration: 0.5}}
                            className={classes.account__wrapper}
                        >
                           <UserTable
                                openEditVisit={openEditVisit}
                                accountId={props.userId}
                                visitIsAdded={visitIsAdded}
                           />
                        </motion.div>
                        { editVisitIsOpen &&
                            <div>
                                <VisitForm 
                                    onCloseBtnClick={closeWindow}
                                    myAccountEdit={true}
                                    clientName={props.userLoggedIn}
                                    visitId={visitId}
                                    isAdmin={props.isAdmin}
                                    visitAdded={visitAdded}
                                />
                                <Background />
                            </div>
                        }
                    </div>
                }
            </motion.div>
            <div className={classes.account__pageBtn}>
                { props.isAdmin && 
                    <div className={classes.account__pageBtnPanel}>
                        <IconContext.Provider value={
                            { 
                                size: "75px",
                                className: classes.account__pageBtnIcon + ' ' + classes.account__pageBtnIconRight, 
                                title: "window close button" 
                            }
                        }>
                            <AiFillRightCircle onClick={goToPanel} />
                        </IconContext.Provider>
                        <h2 className={classes.account__pageTextRight}>Panel<br />administracyjny</h2>
                    </div>
                }
            </div>
        </main>
    );
}

export default MyAccount;