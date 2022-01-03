import classes from '../styles/Reservations.module.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MaterialTable from 'material-table';
import UserInfo from '../components/layout/UserInfo';
import { AiFillRightCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Reservations(props) {
  const navigate = useNavigate();

  function goToServices() {
    navigate('/services');
  }

  const data = [
    { name: "John", email: "john@gmail.com", age: 12, gender: "Male" },
    { name: "Bren", email: "bren@gmail.com", age: 24, gender: "Male" },
    { name: "Marry", email: "marry@gmail.com", age: 18, gender: "Female" },
    { name: "Shohail", email: "shohail@gmail.com", age: 25, gender: "Male" },
    { name: "Aseka", email: "aseka@gmail.com", age: 19, gender: "Female" },
    { name: "Meuko", email: "meuko@gmail.com", age: 12, gender: "Female" }
  ];

  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Age",
      field: "age",
    },
    {
      title: "Gender",
      field: "gender",
    }
  ];

  return (
    <main className={classes.reservations}>
      <UserInfo userLoggedIn={props.userLoggedIn} />
      <div className={classes.reservations__pageBtnHide}></div>
      <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={classes.reservations__content}>
        <h1 className={classes.reservations__title}>Rezerwacje</h1>
        <div className={classes.reservations__wrapper}>
          <Calendar className={classes.reservations__calendar}/>
        </div>
        <div className={classes.reservations__table}>
          <MaterialTable
            title="Wizyty"
            data={data}
            columns={columns}
            options={{ search: true, paging: false, filtering: true }}
          />
        </div>
      </motion.div>
      <div className={classes.reservations__pageBtn}>
        <IconContext.Provider value={
          { 
            size: "75px",
            className: classes.reservations__pageBtnIcon + ' ' + classes.reservations__pageBtnIconRight, 
            title: "window close button"
          }
        }>
          <AiFillRightCircle onClick={goToServices}/>
        </IconContext.Provider>
        <h2 className={classes.reservations__pageTextRight}>Usługi</h2>
      </div>
    </main>
  );
}

export default Reservations;