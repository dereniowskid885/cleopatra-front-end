import  classes from '../styles/Services.module.scss';
import { AiFillRightCircle } from "react-icons/ai";
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import { useState } from 'react';
import UserInfo from '../components/layout/UserInfo';
import ServicesTable from '../components/items/ServicesTable';
import LoginErrorPage from '../pages/LoginErrorPage';
import { useNavigate } from 'react-router-dom';

function Services(props) {
    const [ barbersPageIsOpen, setBarbersPageState ] = useState(false);
    const [ servicesPageIsOpen, setServicesPageState ] = useState(true);
    const [ subpageOpen, setSubpageOpenState ] = useState(false);
    const navigate = useNavigate();

    if (props.userLoggedIn === '') {
        return <LoginErrorPage />
    }

    function openBarbersPage() {
        setServicesPageState(false);
        setBarbersPageState(true);
        setSubpageOpenState(true);
    }

    function openServicesPage() {
        setBarbersPageState(false);
        setServicesPageState(true);
    }

    function goToReservations() {
        navigate('/reservations');
    }

    function goToAccount() {
        navigate('/account');
    }

    return (
        <main className={classes.services}>
            <UserInfo userLoggedIn={props.userLoggedIn} />
            <div className={classes.services__pageBtn}>
                <IconContext.Provider value={
                    { 
                    size: "75px",
                    className: classes.services__pageBtnIcon + ' ' + classes.services__pageBtnIconLeft, 
                    title: "window close button" 
                    }
                }>
                    <AiFillRightCircle onClick={goToReservations}/>
                </IconContext.Provider>
                <h2 className={classes.services__pageTextLeft}>Rezerwacje</h2>
            </div>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={classes.services__wrapper}>
                {barbersPageIsOpen &&
                    <div className={classes.services__content}>
                        <h1 className={`${classes.services__title} ${subpageOpen && classes.services__titleAnimation}`}>Fryzjerzy</h1>
                        <h2 className={classes.services__subpage} onClick={openServicesPage}>Us??ugi</h2>
                        <motion.div 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}} 
                            exit={{opacity: 0}}
                            transition={{duration: 0.5}}
                            className={classes.services__contentWrapper}
                        >
                            <ServicesTable
                                barbersPageIsOpen={barbersPageIsOpen}
                            />
                        </motion.div>
                    </div>
                }
                {servicesPageIsOpen &&
                    <div className={classes.services__content}>
                        <h1 className={`${classes.services__title} ${subpageOpen && classes.services__titleAnimation}`}>Us??ugi</h1>
                        <h2 className={classes.services__subpage} onClick={openBarbersPage}>Fryzjerzy</h2>
                        <motion.div 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}} 
                            exit={{opacity: 0}}
                            transition={{duration: 0.5}}
                            className={classes.services__contentWrapper}
                        >
                            <ServicesTable
                                servicesPageIsOpen={servicesPageIsOpen}
                            />
                        </motion.div>
                    </div>
                }
            </motion.div>
            <div className={classes.services__pageBtn}>
                <IconContext.Provider value={
                    { 
                        size: "75px",
                        className: classes.services__pageBtnIcon + ' ' + classes.services__pageBtnIconRight, 
                        title: "window close button" 
                    }
                }>
                    <AiFillRightCircle onClick={goToAccount} />
                </IconContext.Provider>
                <h2 className={classes.services__pageTextRight}>Moje konto</h2>
            </div>
        </main>
    );
}

export default Services;