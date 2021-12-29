import  classes from '../styles/Services.module.scss';
import { AiFillRightCircle } from "react-icons/ai";
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../components/layout/UserInfo';
import ServicesTable from '../components/items/ServicesTable';

function Services(props) {
    const navigate = useNavigate();

    function goToReservations() {
        navigate('/reservations');
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
            </div>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={classes.services__content}>
                <h1 className={classes.services__title}>Usługi</h1>
                <h2 className={classes.services__subpage}>Fryzjerzy</h2>
                <ServicesTable />
            </motion.div>
            <div className={classes.services__pageBtn}>
                <IconContext.Provider value={
                    { 
                        size: "75px",
                        className: classes.services__pageBtnIcon, 
                        title: "window close button" 
                    }
                }>
                    <AiFillRightCircle />
                </IconContext.Provider>
            </div>
        </main>
    );
}

export default Services;