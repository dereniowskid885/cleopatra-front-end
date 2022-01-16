import classes from '../../../styles/ActionForm.module.scss';
import Fade from 'react-reveal/Fade';
import { IoMdCloseCircle } from "react-icons/io";
import { IconContext } from 'react-icons';
import { useRef, useState, useEffect } from 'react';

function ServiceForm(props) {
    const [ nameAlert, setNameAlertState ] = useState(false);

    const [ serviceData, setServiceData ] = useState({});
    const [ services, setServices ] = useState([]);

    const nameRef = useRef();
    const priceRef = useRef();
    const timeRef = useRef();
    const commentRef = useRef();

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

            setServices(tempData);
        });
    }, []);

    useEffect(() => {
        if (props.editServiceIsOpen) {
            fetch('http://localhost:8080/services/' + props.serviceId)
            .then(response => { return response.json(); })
            .then(data => { setServiceData(data); });
        }
    }, [props.editServiceIsOpen, props.serviceId]);

    function addService(e) {
        e.preventDefault();
        let registerAllowed = true;

        setNameAlertState(false);

        if (services.length) {
            services.forEach(service => {
                if (service.name === nameRef.current.value) {
                    if (props.editServiceIsOpen) {
                        registerAllowed = true;
                    } else {
                        setNameAlertState(true);
                        registerAllowed = false;
                    }
                }
            })
        }

        if (registerAllowed) {
            const serviceData = {
                name: nameRef.current.value,
                approx_time: timeRef.current.value,
                price: priceRef.current.value,
                notes: commentRef.current.value
            }

            fetch(
                // eslint-disable-next-line no-useless-concat
                // 'https://cleopatra-db-default-rtdb.europe-west1.firebasedatabase.app/' + `${props.editServiceIsOpen ? 'services/' + props.serviceId : 'services'}` + '.json',
                `http://localhost:8080/services/${props.editServiceIsOpen ? `${props.serviceId}/update` : 'create'}`,
                {
                    method: 'POST',
                    body: JSON.stringify(serviceData),
                    headers: { 'Content-type': 'application/json' }
                }
            ).then(() => {
                props.serviceAdded();
                props.onCloseBtnClick();
            });
        }
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
                    <h1>Podaj dane usługi:</h1>
                    <form onSubmit={addService}>
                        <div className={classes.window__form}>
                            <label htmlFor="name"><h2>Nazwa usługi</h2></label>
                            <input type="text" name="name" id="name" ref={nameRef} defaultValue={serviceData.name} required/>
                            <label htmlFor="price"><h2>Cena (zł)</h2></label>
                            <input type="number" name="price" id="price" ref={priceRef} defaultValue={serviceData.price} min={1} max={200} required/>
                            <label htmlFor="time"><h2>Czas trwania (m)</h2></label>
                            <select name="time" id="time" ref={timeRef} defaultValue={serviceData.approx_time}>
                                <option value={serviceData.approx_time} disabled selected>{serviceData.approx_time} minut</option>
                                <option value="15">15 minut</option>
                                <option value="30">30 minut</option>
                                <option value="45">45 minut</option>
                                <option value="60">60 minut</option>
                                <option value="75">75 minut</option>
                                <option value="90">90 minut</option>
                            </select>
                            <label htmlFor="comment"><h2>Komentarz</h2></label>
                            <textarea name="comment" id="comment" rows="6" cols="30" ref={commentRef} defaultValue={serviceData.notes} required/>
                        </div>
                        <div className={classes.window__buttons}>
                            <button className={classes.window__button} type="submit">Zatwierdź</button>
                            <button className={classes.window__button} onClick={props.onCloseBtnClick}>Anuluj</button>
                        </div>
                    </form>
                </div>
                {nameAlert && 
                    <Fade><h3 className={classes.window__alert}>Usługa już istnieje.</h3></Fade>
                }
            </div>
        </Fade>
    );
}

export default ServiceForm;