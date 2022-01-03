import  classes from '../styles/Services.module.scss';
import { AiFillRightCircle } from "react-icons/ai";
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UserInfo from '../components/layout/UserInfo';
import ServicesTable from '../components/items/ServicesTable';

function Services(props) {
    const [ barbersPageIsOpen, setBarbersPageState ] = useState(false);
    const [ subpageOpen, setSubpageOpenState ] = useState(false);
    const navigate = useNavigate();

    function openBarbersPage() {
        setBarbersPageState(true);
        setSubpageOpenState(true);
    }

    function openServicesPage() {
        setBarbersPageState(false);
    }

    function goToReservations() {
        navigate('/reservations');
    }

    function goToPanel() {
        navigate('/panel');
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
                { barbersPageIsOpen &&
                    <div className={classes.services__content}>
                        <h1 className={`${classes.services__title} ${subpageOpen && classes.services__titleAnimation}`}>Fryzjerzy</h1>
                        <h2 className={classes.services__subpage} onClick={openServicesPage}>Usługi</h2>
                        <motion.div 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}} 
                            exit={{opacity: 0}}
                            transition={{duration: 0.5}}
                            className={classes.services__contentWrapper}
                        >
                            <ServicesTable />
                        </motion.div>
                    </div>
                }
                { !barbersPageIsOpen &&
                    <div className={classes.services__content}>
                        <h1 className={`${classes.services__title} ${subpageOpen && classes.services__titleAnimation}`}>Usługi</h1>
                        <h2 className={classes.services__subpage} onClick={openBarbersPage}>Fryzjerzy</h2>
                        <motion.div 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}} 
                            exit={{opacity: 0}}
                            transition={{duration: 0.5}}
                            className={classes.services__contentWrapper}
                        >
                            <ServicesTable />
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
                    <AiFillRightCircle onClick={goToPanel} />
                </IconContext.Provider>
                <h2 className={classes.services__pageTextRight}>Panel <br />administracyjny</h2>
            </div>
        </main>
    );
}

export default Services;