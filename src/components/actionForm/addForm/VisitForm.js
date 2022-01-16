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

    const clientRef = useRef();
    const barberRef = useRef();
    const serviceRef = useRef();

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
            setTimeInterval(tempData[0].approx_time)
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

                tempData.push(item);
            }

            setVisits(tempData);
            console.log(tempData);
        });
    }, []);

    function registerVisit(e) { 
        e.preventDefault();

        hour.setMonth(props.month);
        hour.setDate(props.day);
        hour.setYear(props.year);

        const visitData = {
            when: hour,
            service: serviceRef.current.value,
            hairdresser: barberRef.current.value,
            client: clientRef.current.value
        }

        fetch(
            // eslint-disable-next-line no-useless-concat
            // 'https://cleopatra-db-default-rtdb.europe-west1.firebasedatabase.app/' + `${props.editAccountIsOpen ? 'users/' + props.accountId : 'users'}` + '.json',
            'http://localhost:8080/visits/create',
            {
                method: 'POST',
                body: JSON.stringify(visitData),
                headers: { 'Content-type': 'application/json' }
            }
        ).then(() => {
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
                    <h1>Data: {props.title}</h1>
                    <form onSubmit={registerVisit}>
                        <div className={classes.window__form}>
                            <label htmlFor="time"><h2>Godzina</h2></label>
                                <DatePicker
                                    selected={hour}
                                    onChange={(hour) => setHour(hour)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={timeInterval}
                                    timeCaption="Godzina"
                                    dateFormat="HH:mm"
                                    timeFormat="HH:mm"
                                    minTime={setHours(setMinutes(new Date(), 0), 8)}
                                    maxTime={setHours(setMinutes(new Date(), 0), 16)}
                                    excludeTimes={[
                                        setHours(setMinutes(new Date(), 30), 9),
                                        setHours(setMinutes(new Date(), 30), 18),
                                        setHours(setMinutes(new Date(), 30), 19),
                                        setHours(setMinutes(new Date(), 30), 17),
                                    ]}
                                    required
                                />
                            <label htmlFor="client"><h2>Klient</h2></label>
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
                            <label htmlFor="barber"><h2>Fryzjer</h2></label>
                            <select name="barber" id="barber" defaultValue="random" ref={barberRef} required>
                                <option value="random">Dowolny fryzjer</option>
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
                                onChange={event => { services.forEach(service => { if(service._id === event.target.value) { setPrice(service.price); setTimeInterval(service.approx_time) }})} }
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