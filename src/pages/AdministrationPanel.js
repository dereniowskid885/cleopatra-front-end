import classes from '../styles/AdministrationPanel.module.scss';
import UserInfo from '../components/layout/UserInfo';
import AdministrationTable from '../components/items/AdministrationTable';
import { motion } from 'framer-motion';
import { AiFillRightCircle } from "react-icons/ai";
import { IconContext } from 'react-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Background from '../components/windowBackground/Background';
import ServiceAddForm from '../components/actionForm/addForm/ServiceAddForm';
import BarberAddForm from '../components/actionForm/addForm/BarberAddForm';
import RegisterForm from '../components/loginForm/RegisterForm';

function AdministrationPanel(props) {
    const [ barbersPageIsOpen, setBarbersPageState ] = useState(false);
    const [ accountsPageIsOpen, setAccountsPageState ] = useState(false);
    const [ servicesPageIsOpen, setServicesPageState ] = useState(true);

    const [ addServiceIsOpen, setAddServiceState ] = useState(false);
    const [ addBarberIsOpen, setAddBarberState ] = useState(false);
    const [ addAccountIsOpen, setAddAccountState ] = useState(false);

    const [ editAccountIsOpen, setEditAccountState ] = useState(false);
    const [ accountId, setAccountId ] = useState('');

    const [ accountIsAdded, setAccountIsAddedState ] = useState(false);

    const navigate = useNavigate();

    function openBarbersPage() {
        setBarbersPageState(true);
        setAccountsPageState(false);
        setServicesPageState(false);
    }

    function openAccountsPage() {
        setAccountsPageState(true);
        setServicesPageState(false);
        setBarbersPageState(false);
    }

    function openServicesPage() {
        setServicesPageState(true);
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

    function closeAddAccount() {
        setAddAccountState(false);
        setEditAccountState(false);
    }

    function closeAddBarber() {
        setAddBarberState(false);
    }

    function closeAddService() {
        setAddServiceState(false);
    }

    function goToServices() {
        navigate('/services');
    }

    function userIsAdded() {
        setAccountIsAddedState(true);
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
                    <AiFillRightCircle onClick={goToServices}/>
                </IconContext.Provider>
                <h2 className={classes.panel__pageTextLeft}>Usługi</h2>
            </div>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={classes.panel__wrapper}>
                <h1 className={classes.panel__title}>Panel administracyjny</h1>
                { barbersPageIsOpen &&
                    <div className={classes.panel__content}>
                        <h2 className={classes.panel__subpage + ' ' + classes.panel__subpageSelected}>Fryzjerzy</h2>
                        <h2 className={classes.panel__subpage} onClick={openServicesPage}>Usługi</h2>
                        <h2 className={classes.panel__subpage} onClick={openAccountsPage}>Konta</h2>
                        <motion.div 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}} 
                            exit={{opacity: 0}}
                            transition={{duration: 0.5}}
                            className={classes.panel__contentWrapper}
                        >
                            <AdministrationTable
                                openAddBarber={openAddBarber}
                                servicesPageIsOpen={servicesPageIsOpen}
                                barbersPageIsOpen={barbersPageIsOpen}
                                accountsPageIsOpen={accountsPageIsOpen}
                            />
                        </motion.div>
                    </div>
                }
                { accountsPageIsOpen &&
                    <div className={classes.panel__content}>
                        <h2 className={classes.panel__subpage + ' ' + classes.panel__subpageSelected}>Konta</h2>
                        <h2 className={classes.panel__subpage} onClick={openServicesPage}>Usługi</h2>
                        <h2 className={classes.panel__subpage} onClick={openBarbersPage}>Fryzjerzy</h2>
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
                                servicesPageIsOpen={servicesPageIsOpen}
                                barbersPageIsOpen={barbersPageIsOpen}
                                accountsPageIsOpen={accountsPageIsOpen}
                                accountIsAdded={accountIsAdded}
                            />
                        </motion.div>
                    </div>
                }
                { servicesPageIsOpen &&
                    <div className={classes.panel__content}>
                        <h2 className={classes.panel__subpage + ' ' + classes.panel__subpageSelected}>Usługi</h2>
                        <h2 className={classes.panel__subpage} onClick={openBarbersPage}>Fryzjerzy</h2>
                        <h2 className={classes.panel__subpage} onClick={openAccountsPage}>Konta</h2>
                        <motion.div 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}} 
                            exit={{opacity: 0}}
                            transition={{duration: 0.5}}
                            className={classes.panel__contentWrapper}
                        >
                            <AdministrationTable
                                openAddService={openAddService}
                                servicesPageIsOpen={servicesPageIsOpen}
                                barbersPageIsOpen={barbersPageIsOpen}
                                accountsPageIsOpen={accountsPageIsOpen}
                            />
                        </motion.div>
                    </div>
                }
            </motion.div>
            <div className={classes.panel__pageBtnHide}></div>
            {addServiceIsOpen &&
                <div>
                    <ServiceAddForm onCloseBtnClick={closeAddService}/>
                    <Background />
                </div>
            }
            {addBarberIsOpen &&
                <div>
                    <BarberAddForm onCloseBtnClick={closeAddBarber}/>
                    <Background />
                </div>
            }
            {addAccountIsOpen &&
                <div>
                    <RegisterForm 
                        onCloseBtnClick={closeAddAccount}
                        administrationPanelIsOpen={true}
                        userIsAdded={userIsAdded}
                    />
                    <Background />
                </div>
            }
            {editAccountIsOpen &&
                <div>
                    <RegisterForm 
                        onCloseBtnClick={closeAddAccount}
                        administrationPanelIsOpen={true}
                        editAccountIsOpen={true}
                        userLoggedIn={props.userLoggedIn}
                        setUsername={props.setUsername}
                        accountId={accountId}
                        userIsAdded={userIsAdded}
                    />
                    <Background />
                </div>
            }
        </main>
    );
}

export default AdministrationPanel;