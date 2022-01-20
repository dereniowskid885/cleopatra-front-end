import classes from '../../../styles/ActionForm.module.scss';
import Fade from 'react-reveal/Fade';
import { IoMdCloseCircle } from "react-icons/io";
import { IconContext } from 'react-icons';
import { useState, useEffect, useRef } from 'react';
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

function VisitForm(props) {
    const [ services, setServices ] = useState([]);
    const [ barbers, setBarbers ] = useState([]);
    const [ clients, setClients ] = useState([]);
    const [ visits, setVisits ] = useState([]);
    const [ price, setPrice ] = useState();
    const [ timeInterval, setTimeInterval ] = useState();
    const [ hour, setHour ] = useState();
    const [ excludeTimes, setExcludeTimes ] = useState(new Set());

    const clientRef = useRef();
    const barberRef = useRef();
    const serviceRef = useRef();

    function checkAvailableTimes(timeInterval) {
        const excludeTimes = new Set();

        visits.forEach(visit => {
            const visitHours = new Set();
            const visitDate = new Date(visit.when);

            if (visitDate.toLocaleDateString() === props.title) {
                const visitServiceTime = new Date();
                const companyStartDate = new Date(visit.when);

                visitHours.add([visitDate, visitServiceTime]);
                console.log(timeInterval);
                visitServiceTime.setTime(visitDate.getTime() + (visit.service.approx_time * 60 * 1000));
                companyStartDate.setHours(8, 0, 0, 0);

                visitHours.forEach(timePair => {
                    let visitStartTime = timePair[0].getTime();
                    let visitEndTime = timePair[1].getTime();
                    let interval = (15 * 60 * 1000);
                    let newVisitDuration = (timeInterval * 60 * 1000);
        
                    for (let i = visitStartTime; i < visitEndTime; i += interval) {
                        excludeTimes.add(new Date(i));
                        const timeDiff = i - newVisitDuration;
        
                        if (timeDiff < visitStartTime && timeDiff >= companyStartDate.getTime()) {
                            excludeTimes.add(new Date(timeDiff));
                        }
                    }
                });
            }
        });

        setExcludeTimes(excludeTimes);
    }

    useEffect(() => {
        fetch('http://localhost:8080/services')
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

            setPrice(tempData[0].price);
            setTimeInterval(tempData[0].approx_time);
            setServices(tempData);
        });

        fetch('http://localhost:8080/hairdressers')
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

            setBarbers(tempData);
        });

        fetch('http://localhost:8080/clients')
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

            setClients(tempData);
        });

        fetch('http://localhost:8080/visits')
        .then(response => { return response.json(); })
        .then(data => {
            const tempData = [];

            for (const key in data) {
                const item = {
                    _id: key,
                    ...data[key]
                };

                if (item._id === props.visitId) {
                    const tempDate = new Date(item.when);

                    setHour(tempDate);
                }

                tempData.push(item);
            }

            setVisits(tempData);
        });
    }, [props.visitId]);

    function registerVisit(e) { 
        e.preventDefault();

        let tempVisitData = {};

        tempVisitData = {
            service: serviceRef.current.value,
            hairdresser: barberRef.current.value,
            client: clientRef.current.value
        }

        if (!props.myAccountEdit) {
            hour.setMonth(props.month);
            hour.setDate(props.day);
            hour.setYear(props.year);
        }

        tempVisitData.when = hour;

        fetch(
            // eslint-disable-next-line no-useless-concat
            // 'https://cleopatra-db-default-rtdb.europe-west1.firebasedatabase.app/' + `${props.editAccountIsOpen ? 'users/' + props.accountId : 'users'}` + '.json',
            `http://localhost:8080/visits/${props.myAccountEdit || props.editVisitIsOpen ? `${props.visitId}/update` : 'create'}`,
            {
                method: 'POST',
                body: JSON.stringify(tempVisitData),
                headers: { 'Content-type': 'application/json' }
            }
        ).then(() => {
            if (props.myAccountEdit || props.editVisitIsOpen) {
                props.visitAdded();
            } else {
                props.fetchVisits();
            }
            props.onCloseBtnClick();
        });
    }   

    return (
        <Fade>
            <div className={classes.window}>
                <IconContext.Provider value={
                    { 
                        size: "45px",
                        className: classes.window__icon, 
                        title: "window close button" 
                    }
                }>
                    <IoMdCloseCircle onClick={props.onCloseBtnClick}/>
                </IconContext.Provider>
                <div className={classes.window__container}>
                    {(props.editVisitIsOpen || props.myAccountEdit) ?
                        <h1>Dane:</h1>
                        :
                        <h1>Data: {props.title}</h1>
                    }
                    <form onSubmit={registerVisit}>
                        <div className={classes.window__form + ' ' + classes.window__formTimePicker}>
                            <label htmlFor="time"><h2>Godzina</h2></label>
                                <DatePicker
                                    selected={hour}
                                    onChange={(hour) => setHour(hour)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Godzina"
                                    dateFormat="HH:mm"
                                    timeFormat="HH:mm"
                                    minTime={setHours(setMinutes(new Date(), 0), 8)}
                                    maxTime={setHours(setMinutes(new Date(), 0), 16)}
                                    excludeTimes={[...excludeTimes]}
                                    required
                                />
                            <label htmlFor="client"><h2>Klient</h2></label>
                            {props.isAdmin ?
                                <select name="client" id="client" ref={clientRef} required>
                                    {clients.map(client => (
                                        <option 
                                            value={client._id} 
                                            key={client._id}
                                        >
                                            {client.first_name + ' ' + client.last_name}
                                        </option>
                                    ))}
                                </select>
                                :
                                <select name="client" id="client" ref={clientRef} required>
                                    {clients.map(client => {
                                        if (client.first_name === props.clientName) {
                                            return <option 
                                                        value={client._id} 
                                                        key={client._id}
                                                        selected
                                                    >
                                                        {client.first_name + ' ' + client.last_name}
                                                    </option>
                                        } else {
                                            return '';
                                        }
                                    })}
                                </select>
                            }
                            <label htmlFor="barber"><h2>Fryzjer</h2></label>
                            <select name="barber" id="barber" ref={barberRef} required>
                                {barbers.map(barber => (
                                    <option 
                                        value={barber._id} 
                                        key={barber._id}
                                    >
                                        {barber.first_name + ' ' + barber.last_name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="service"><h2>Usługa</h2></label>
                            <select 
                                name="service"
                                id="service"
                                ref={serviceRef}
                                onChange={event => {
                                    services.forEach(service => {
                                        if(service._id === event.target.value) {
                                            setPrice(service.price);
                                            setTimeInterval(service.approx_time);
                                            checkAvailableTimes(service.approx_time); 
                                        }
                                    })
                                }}
                                required
                            >
                                {services.map(service => (
                                    <option 
                                        value={service._id} 
                                        key={service._id}
                                    >
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="price"><h2>Cena</h2></label>
                            <input type="text" name="price" id="price" value={price + ' zł'} readOnly/>
                            <label htmlFor="time"><h2>Czas</h2></label>
                            <input type="text" name="time" id="time" value={timeInterval + ' min'} readOnly/>
                        </div>
                        <div className={classes.window__buttons}>
                            <button className={classes.window__button} type="submit">Zatwierdź</button>
                            <button className={classes.window__button} onClick={props.onCloseBtnClick}>Anuluj</button>
                        </div>
                    </form>                 
                </div> 
            </div>
        </Fade>
    );
}

export default VisitForm;