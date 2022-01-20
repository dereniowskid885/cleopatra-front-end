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
    columnTitles: [
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
        field: "client",
      }
    ],
    columnData: [],
    reservationBtnIsClicked: false
  }

  fetchVisits = () => {
    fetch('http://localhost:8080/visits')
    .then(response => { return response.json(); })
    .then(data => {
      const visits = [];

      for (const key in data) {
        const item = {
          _id: key,
          ...data[key]
        };

        const visitDate = new Date(item.when);

        if (visitDate.toLocaleDateString() === this.state.date.toLocaleDateString()) {
          const visitStartTime = visitDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const visitServiceTime = new Date();

          visitServiceTime.setTime(visitDate.getTime() + (item.service.approx_time * 60 * 1000));

          const visitEndTime = visitServiceTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const visitDuration = visitStartTime + ' - ' + visitEndTime;
          const visit = {
            when: visitDuration,
            service: item.service.name,
            client: item.client.first_name,
            hairdresser: item.hairdresser.first_name
          }

          visits.push(visit);
        }
      }

      this.setState({ columnData: visits });
    });
  }

  componentDidMount() {
    this.fetchVisits();
  }

  componentDidUpdate() {
    if(this.props.userLoggedIn === '') {
      this.props.navigate('/error');
    }
  }

  onChange = date => { this.setState({ date: date }); this.fetchVisits(); };
  closeWindow = () => this.setState({ reservationBtnIsClicked: false });
  showVisitForm = () => this.setState({ reservationBtnIsClicked: true });
  goToServices = () => { this.props.navigate('/services') };

  render() {
    return (
      <main className={classes.reservations}>
        <UserInfo userLoggedIn={this.props.userLoggedIn} />
        <div className={classes.reservations__pageBtnHide}>
          {this.state.reservationBtnIsClicked &&
            <div>
              <VisitForm
                title={this.state.date.toLocaleDateString()}
                year={this.state.date.getFullYear()}
                day={this.state.date.getDate()}
                month={this.state.date.getMonth()}
                onCloseBtnClick={this.closeWindow}
                fetchVisits={this.fetchVisits}
                clientName={this.props.userLoggedIn}
                isAdmin={this.props.isAdmin}
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
            />
          <div className={classes.reservations__table}>
              <MaterialTable
                title={this.state.date.toLocaleDateString()} 
                data={this.state.columnData}
                columns={this.state.columnTitles}
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