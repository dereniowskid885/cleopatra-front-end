import classes from '../styles/Reservations.module.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MaterialTable from "material-table";
import Reservation from '../components/items/Reservation';
import { Link } from 'react-router-dom';

function Reservations() {
    const data = [
        { name: "John", email: "john@gmail.com", age: 12, gender: "Male" },
        { name: "Bren", email: "bren@gmail.com", age: 24, gender: "Male" },
        { name: "Marry", email: "marry@gmail.com", age: 18, gender: "Female" },
        { name: "Shohail", email: "shohail@gmail.com", age: 25, gender: "Male" },
        { name: "Aseka", email: "aseka@gmail.com", age: 19, gender: "Female" },
        { name: "Meuko", email: "meuko@gmail.com", age: 12, gender: "Female" },
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
        },
      ];

    return (
        <main className={classes.reservations}>
            <Calendar className={classes.reservations__calendar}/>
            <div className={classes.reservations__items}>
            <MaterialTable
                title="Wizyty"
                data={data}
                columns={columns}
                options={{ search: true, paging: false, filtering: true }}
            />
            </div>
            <button className={classes.reservations__button}><Link to="/">Wyloguj się</Link></button>
        </main>
    );
}

export default Reservations;