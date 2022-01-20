import classes from '../styles/AdministrationPanel.module.scss';
import UserInfo from '../components/layout/UserInfo';
import AdministrationTable from '../components/items/AdministrationTable';
import { motion } from 'framer-motion';
import { AiFillRightCircle } from "react-icons/ai";
import { IconContext } from 'react-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Background from '../components/windowBackground/Background';
import ServiceForm from '../components/actionForm/addForm/ServiceForm';
import BarberForm from '../components/actionForm/addForm/BarberForm';
import RegisterForm from '../components/loginForm/RegisterForm';
import VisitForm from '../components/actionForm/addForm/VisitForm';
import LoginErrorPage from '../pages/LoginErrorPage';

function AdministrationPanel(props) {
    const [ barbersPageIsOpen, setBarbersPageState ] = useState(false);
    const [ accountsPageIsOpen, setAccountsPageState ] = useState(true);
    const [ servicesPageIsOpen, setServicesPageState ] = useState(false);
    const [ visitsPageIsOpen, setVisitsPageState ] = useState(false)

    const [ addServiceIsOpen, setAddServiceState ] = useState(false);
    const [ addBarberIsOpen, setAddBarberState ] = useState(false);
    const [ addAccountIsOpen, setAddAccountState ] = useState(false);

    const [ editAccountIsOpen, setEditAccountState ] = useState(false);
    const [ editBarberIsOpen, setEditBarberState ] = useState(false);
    const [ editServiceIsOpen, setEditServiceState ] = useState(false);
    const [ editVisitIsOpen, setEditVisitState ] = useState(false);

    const [ accountId, setAccountId ] = useState('');
    const [ barberId, setBarberId ] = useState('');
    const [ serviceId, setServiceId ] = useState('');
    const [ visitId, setVisitId ] = useState('');

    const [ accountIsAdded, setAccountIsAddedState ] = useState(false);
    const [ barberIsAdded, setBarberIsAddedState ] = useState(false);
    const [ serviceIsAdded, setServiceIsAddedState ] = useState(false);
    const [ visitIsAdded, setVisitIsAddedState ] = useState(false);

    const navigate = useNavigate();

    if (props.userLoggedIn === '') {
        return <LoginErrorPage />
    }

    function openBarbersPage() {
        setBarbersPageState(true);
        setAccountsPageState(false);
        setServicesPageState(false);
        setVisitsPageState(false);
    }

    function openAccountsPage() {
        setAccountsPageState(true);
        setServicesPageState(false);
        setBarbersPageState(false);
        setVisitsPageState(false);
    }

    function openServicesPage() {
        setServicesPageState(true);
        setAccountsPageState(false);
        setBarbersPageState(false);
        setVisitsPageState(false);
    }

    function openVisitsPage() {
        setVisitsPageState(true);
        setServicesPageState(false);
        setAccountsPageState(false);
        setBarbersPageState(false);
    }

    function openAddService() {
        setAddServiceState(true);
    }

    function openAddBarber() {
        setAddBarberState(true);
    }

    function openAddAccount() {
        setAddAccountState(true);
    }

    function openEditAccount(accountId) {
        setEditAccountState(true);
        setAccountId(accountId);
    }

    function openEditBarber(barberId) {
        setEditBarberState(true);
        setBarberId(barberId);
    }

    function openEditService(serviceId) {
        setEditServiceState(true);
        setServiceId(serviceId);
    }

    function openEditVisit(visitId) {
        setEditVisitState(true);
        setVisitId(visitId);
    }

    function userAdded() {
        setAccountIsAddedState(true);
    }

    function barberAdded() {
        setBarberIsAddedState(true);
    }

    function serviceAdded() {
        setServiceIsAddedState(true);
    }

    function visitAdded() {
        setVisitIsAddedState(true);
    }

    function goToAccount() {
        navigate('/account');
    }

    function closeWindow() {
        setAddAccountState(false);
        setEditAccountState(false);
        setAddBarberState(false);
        setEditBarberState(false);
        setAddServiceState(false);
        setEditServiceState(false);
        setEditVisitState(false);
        setAccountIsAddedState(false);
        setBarberIsAddedState(false);
        setServiceIsAddedState(false);
        setVisitIsAddedState(false);
    }

    return (
        <main className={classes.panel}>
            <UserInfo userLoggedIn={props.userLoggedIn} />
            <div className={classes.panel__pageBtn}>
                <IconContext.Provider value={
                    { 
                    size: "75px",
                    className: classes.panel__pageBtnIcon + ' ' + classes.panel__pageBtnIconLeft, 
                    title: "window close button" 
                    }
                }>
                    <AiFillRightCircle onClick={goToAccount}/>
                </IconContext.Provider>
                <h2 className={classes.panel__pageTextLeft}>Moje konto</h2>
            </div>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={classes.panel__wrapper}>
                <h1 className={classes.panel__title}>Panel administracyjny</h1>
                { barbersPageIsOpen &&
                    <div className={classes.panel__content}>
                        <div className={classes.panel__pageButtons}>
                            <h2 className={classes.panel__subpage} onClick={openAccountsPage}>Konta</h2>
                            <h2 className={classes.panel__subpage} onClick={openServicesPage}>Usługi</h2>
                            <h2 className={classes.panel__subpage + ' ' + classes.panel__subpageSelected}>Fryzjerzy</h2>
                            <h2 className={classes.panel__subpage} onClick={openVisitsPage}>Wizyty</h2>
                        </div>
                        <motion.div 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}} 
                            exit={{opacity: 0}}
                            transition={{duration: 0.5}}
                            className={classes.panel__contentWrapper}
                        >
                            <AdministrationTable
                                openAddBarber={openAddBarber}
                                openEditBarber={openEditBarber}
                                barbersPageIsOpen={barbersPageIsOpen}
                                barberIsAdded={barberIsAdded}
                            />
                        </motion.div>
                    </div>
                }
                { accountsPageIsOpen &&
                    <div className={classes.panel__content}>
                        <div className={classes.panel__pageButtons}>
                            <h2 className={classes.panel__subpage + ' ' + classes.panel__subpageSelected}>Konta</h2>
                            <h2 className={classes.panel__subpage} onClick={openServicesPage}>Usługi</h2>
                            <h2 className={classes.panel__subpage} onClick={openBarbersPage}>Fryzjerzy</h2>
                            <h2 className={classes.panel__subpage} onClick={openVisitsPage}>Wizyty</h2>
                        </div>
                        <motion.div 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}} 
                            exit={{opacity: 0}}
                            transition={{duration: 0.5}}
                            className={classes.panel__contentWrapper}
                        >
                            <AdministrationTable
                                openAddAccount={openAddAccount}
                                openEditAccount={openEditAccount}
                                accountsPageIsOpen={accountsPageIsOpen}
                                accountIsAdded={accountIsAdded}
                                userLoggedIn={props.userLoggedIn}
                                userId={props.userId}
                            />
                        </motion.div>
                    </div>
                }
                { servicesPageIsOpen &&
                    <div className={classes.panel__content}>
                        <div className={classes.panel__pageButtons}>
                            <h2 className={classes.panel__subpage} onClick={openAccountsPage}>Konta</h2>
                            <h2 className={classes.panel__subpage + ' ' + classes.panel__subpageSelected}>Usługi</h2>
                            <h2 className={classes.panel__subpage} onClick={openBarbersPage}>Fryzjerzy</h2>
                            <h2 className={classes.panel__subpage} onClick={openVisitsPage}>Wizyty</h2>
                        </div>
                        <motion.div 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}} 
                            exit={{opacity: 0}}
                            transition={{duration: 0.5}}
                            className={classes.panel__contentWrapper}
                        >
                            <AdministrationTable
                                openAddService={openAddService}
                                openEditService={openEditService}
                                servicesPageIsOpen={servicesPageIsOpen}
                                serviceIsAdded={serviceIsAdded}
                            />
                        </motion.div>
                    </div>
                }
                { visitsPageIsOpen &&
                    <div className={classes.panel__content}>
                        <div className={classes.panel__pageButtons}>
                            <h2 className={classes.panel__subpage} onClick={openAccountsPage}>Konta</h2>
                            <h2 className={classes.panel__subpage} onClick={openServicesPage}>Usługi</h2>
                            <h2 className={classes.panel__subpage} onClick={openBarbersPage}>Fryzjerzy</h2>
                            <h2 className={classes.panel__subpage + ' ' + classes.panel__subpageSelected}>Wizyty</h2>
                        </div>
                        <motion.div 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}} 
                            exit={{opacity: 0}}
                            transition={{duration: 0.5}}
                            className={classes.panel__contentWrapper}
                        >
                            <AdministrationTable
                                openEditVisit={openEditVisit}
                                visitsPageIsOpen={visitsPageIsOpen}
                                visitIsAdded={visitIsAdded}
                            />
                        </motion.div>
                    </div>
                }
            </motion.div>
            <div className={classes.panel__pageBtnHide}></div>
            { addServiceIsOpen &&
                <div>
                    <ServiceForm 
                        onCloseBtnClick={closeWindow}
                        serviceAdded={serviceAdded}
                    />
                    <Background />
                </div>
            }
            { addBarberIsOpen &&
                <div>
                    <BarberForm 
                        onCloseBtnClick={closeWindow}
                        barberAdded={barberAdded}
                    />
                    <Background />
                </div>
            }
            { addAccountIsOpen &&
                <div>
                    <RegisterForm 
                        onCloseBtnClick={closeWindow}
                        userAdded={userAdded}
                        administrationPanelIsOpen={true}
                    />
                    <Background />
                </div>
            }
            { editServiceIsOpen &&
                <div>
                    <ServiceForm 
                        onCloseBtnClick={closeWindow}
                        editServiceIsOpen={true}
                        serviceId={serviceId}
                        serviceAdded={serviceAdded}
                    />
                    <Background />
                </div>
            }
            { editBarberIsOpen &&
                <div>
                    <BarberForm 
                        onCloseBtnClick={closeWindow}
                        editBarberIsOpen={true}
                        barberId={barberId}
                        barberAdded={barberAdded}
                    />
                    <Background />
                </div>
            }
            { editVisitIsOpen &&
                <div>
                    <VisitForm 
                        onCloseBtnClick={closeWindow}
                        editVisitIsOpen={true}
                        myAccountEdit={true}
                        visitId={visitId}
                        isAdmin={props.isAdmin}
                        visitAdded={visitAdded}
                    />
                    <Background />
                </div>
            }
            { editAccountIsOpen &&
                <div>
                    <RegisterForm 
                        onCloseBtnClick={closeWindow}
                        editAccountIsOpen={true}
                        accountId={accountId}
                        userAdded={userAdded}
                        administrationPanelIsOpen={true}
                        userLoggedIn={props.userLoggedIn}
                        setUsername={props.setUsername}
                    />
                    <Background />
                </div>
            }
        </main>
    );
}

export default AdministrationPanel;