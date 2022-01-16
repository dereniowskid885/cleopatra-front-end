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
    data: [],
    columns: [
      {
        title: "Godzina",
        field: "when",
      },
      {
        title: "Usługa",
        field: "service",
      },
      {
        title: "Fryzjer",
        field: "hairdresser",
      },
      {
        title: "Klient",
        field: "client_name",
      }
    ]
  }

  // [
  //   { hour: "10:00 - 12:00", service: "Czesanie", client_name: "Andrzej", barber: "Staszek" },
  //   { hour: "12:00 - 13:00", service: "Strzyżenie męskie", client_name: "Jacek", barber: "Zdzisław" },
  //   { hour: "13:00 - 14:00", service: "Koloryzacja damska", client_name: "Aleksandra", barber: "Bronisław" }
  // ]

  fetchVisits = () => {
    fetch('http://localhost:8080/visits')
    .then(response => { return response.json(); })
    .then(data => {
      const tempData = [];

      for (const key in data) {
        const item = {
          _id: key,
          ...data[key]
        };

        tempData.push(item);
      }

      console.log(tempData);
      // this.setState({ data: tempData });
    });
  }

  componentDidMount() {
    this.fetchVisits();
  }

  onChange = date => this.setState({ date });
  closeWindow = () => this.setState({ reservationBtnIsClicked: false });
  showVisitForm = () => this.setState({ reservationBtnIsClicked: true });
  goToServices = () => { this.props.navigate('/services') };
  onClickDay = day => this.setState({ title: day.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" }) });

  render() {
    return (
      <main className={classes.reservations}>
        <UserInfo userLoggedIn={this.props.userLoggedIn} />
        <div className={classes.reservations__pageBtnHide}>
          {this.state.reservationBtnIsClicked &&
            <div>
              <VisitForm
                title={this.state.title}
                year={this.state.date.getFullYear()}
                day={this.state.date.getDate()}
                month={this.state.date.getMonth()}
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
                localization={{
                  body: {
                    emptyDataSourceMessage: 'Brak wyników wyszukiwania'
                  },
                  toolbar: {
                    searchPlaceholder: 'Szukaj'
                  }
                }}
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

export default PageRouter(Reservations);