import classes from '../styles/Reservations.module.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MaterialTable from 'material-table';
import UserInfo from '../components/layout/UserInfo';
import VisitForm from '../components/actionForm/addForm/VisitForm';
import Background from '../components/windowBackground/Background';
import { AiFillRightCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import PageRouter from '../pageRouter';
import React from 'react';

class Reservations extends React.Component {
  state = {
    date: new Date(),
    reservationBtnIsClicked: false,
    title: new Date().toLocaleDateString(),
    data: [
      { hour: "10:00 - 12:00", service: "Czesanie", client_name: "Andrzej", barber: "Staszek" },
      { hour: "12:00 - 13:00", service: "Strzyżenie męskie", client_name: "Jacek", barber: "Zdzisław" },
      { hour: "13:00 - 14:00", service: "Koloryzacja damska", client_name: "Aleksandra", barber: "Bronisław" }
    ],
    columns: [
      {
        title: "Godzina",
        field: "hour",
      },
      {
        title: "Usługa",
        field: "service",
      },
      {
        title: "Fryzjer",
        field: "barber",
      },
      {
        title: "Klient",
        field: "client_name",
      }
    ]
  }

  onChange = date => this.setState({ date });
  closeWindow = () => this.setState({ reservationBtnIsClicked: false });
  showVisitForm = () => this.setState({ reservationBtnIsClicked: true });
  goToServices = () => { this.props.navigate('/services') };

  onClickDay = (day) => this.setState({ title: day.toLocaleDateString() });

  render() {
    return (
      <main className={classes.reservations}>
        <UserInfo userLoggedIn={this.props.userLoggedIn} />
        <div className={classes.reservations__pageBtnHide}>
          {this.state.reservationBtnIsClicked &&
            <div>
              <VisitForm 
                onCloseBtnClick={this.closeWindow}
              />
              <Background />
            </div>
          }
        </div>
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={classes.reservations__content}>
          <h1 className={classes.reservations__title}>Rezerwacje</h1>
          <div className={classes.reservations__wrapper}>
            <Calendar 
              className={classes.reservations__calendar}
              onChange={this.onChange}
              value={this.state.date}
              onClickDay={this.onClickDay}
            />
          <div className={classes.reservations__table}>
              <MaterialTable
                title={this.state.title} 
                data={this.state.data}
                columns={this.state.columns}
                options={{ search: true, paging: false, filtering: true }}
              />
              <button className={classes.reservations__button} onClick={this.showVisitForm}>Zarezerwuj</button>
            </div>
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
            <AiFillRightCircle onClick={this.goToServices}/>
          </IconContext.Provider>
          <h2 className={classes.reservations__pageTextRight}>Usługi</h2>
        </div>
      </main>
    );
  }
}

// function Reservations(props) {
//   var data = [
//     { name: "John", email: "john@gmail.com", age: 12, gender: "Male" },
//     { name: "Bren", email: "bren@gmail.com", age: 24, gender: "Male" },
//     { name: "Marry", email: "marry@gmail.com", age: 18, gender: "Female" },
//   ];

//   const navigate = useNavigate();
//   const [ dateValue, setDateValue ] = useState(new Date());
//   const [ dayIsClicked, setDayIsClickedState ] = useState(false);

//   // let title = `Wizyty ${value}`;

//   function goToServices() {
//     navigate('/services');
//   }

//   function showVisitForm() {
//     setDayIsClickedState(true);
//   }

//   function closeWindow() {
//     setDayIsClickedState(false);
//   }

//   const changeDate = date => setDateValue(date);

//   // function setTableTitleDate() {
//   //   let date = new Date();
//   //   setValue(date.getDay());
//   // }

//   const clickedDay = (value) => alert('clicked day: ', value);

//   const columns = [
//     {
//       title: "Imię",
//       field: "name",
//     },
//     {
//       title: "Imię",
//       field: "name",
//     },
//     {
//       title: "Email",
//       field: "email",
//     },
//     {
//       title: "Age",
//       field: "age",
//     },
//     {
//       title: "Gender",
//       field: "gender",
//     }
//   ];

//   // function onChange(nextValue) {
//   //   var today = new Date();
//   //   setValue(today);
//   //   var data = [{name: value.getHours() + ' ' + value.getMinutes(), email: "john@gmail.com", age: 12, gender: "Male" }];
//   //   setData(data);
//   // }

//   return (
//     <main className={classes.reservations}>
//       <UserInfo userLoggedIn={props.userLoggedIn} />
//       <div className={classes.reservations__pageBtnHide}>
//         {dayIsClicked &&
//           <div>
//             <VisitForm 
//               onCloseBtnClick={closeWindow}
//             />
//             <Background />
//           </div>
//         }
//       </div>
//       <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={classes.reservations__content}>
//         <h1 className={classes.reservations__title}>Rezerwacje</h1>
//         <div className={classes.reservations__wrapper}>
//           <Calendar 
//             className={classes.reservations__calendar}
//             onChange={changeDate}
//             value={dateValue}
//             onClickDay={clickedDay}
//           />
//           <div className={classes.reservations__table}>
//             <MaterialTable
//               // title={title} 
//               // data={dataa}
//               columns={columns}
//               options={{ search: true, paging: false, filtering: true }}
//             />
//             <button className={classes.reservations__button} onClick={showVisitForm}>Zarezerwuj</button>
//           </div>
//         </div>
//       </motion.div>
//       <div className={classes.reservations__pageBtn}>
//         <IconContext.Provider value={
//           { 
//             size: "75px",
//             className: classes.reservations__pageBtnIcon + ' ' + classes.reservations__pageBtnIconRight, 
//             title: "window close button"
//           }
//         }>
//           <AiFillRightCircle onClick={goToServices}/>
//         </IconContext.Provider>
//         <h2 className={classes.reservations__pageTextRight}>Usługi</h2>
//       </div>
//     </main>
//   );
// }

export default PageRouter(Reservations);