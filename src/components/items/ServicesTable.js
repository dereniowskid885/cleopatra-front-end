import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import classes from '../../styles/Tables.module.scss';

function Row(props) {
  const { row } = props;
  const [ open, setOpen ] = React.useState(false);

  return (
    <React.Fragment>
      {props.servicesPageIsOpen &&
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="left">{row.price} zł</TableCell>
          <TableCell align="left">{row.approx_time} minut</TableCell>
          <TableCell align="left">{row.notes}</TableCell>
        </TableRow>
      }
      {props.barbersPageIsOpen &&
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.first_name}
          </TableCell>
          <TableCell align="left">{row.last_name}</TableCell>
          <TableCell align="left">{row.phone_number}</TableCell>
          <TableCell align="left">{row.email}</TableCell>
        </TableRow>
      }
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  const [ servicesRows, setServicesRows ] = React.useState([]);
  const [ barberRows, setBarberRows ] = React.useState([]);

  const updateTables = (page) => {
    if (page === 'services') {
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
    
        setServicesRows(tempData);
      });
    } else if (page === 'barbers') {
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
    
        setBarberRows(tempData);
      });
    }
  }

  React.useEffect(() => { updateTables('services'); updateTables('barbers'); }, []);

  return (
    <TableContainer component={Paper} className={classes.servicesTable}>
      <Table aria-label="collapsible table">
        <TableHead className={classes.servicesTable__head}>
          {props.servicesPageIsOpen &&
            <TableRow>
              <TableCell />
              <TableCell>Usługa</TableCell>
              <TableCell>Cena</TableCell>
              <TableCell>Czas trwania</TableCell>
              <TableCell>Komentarz</TableCell>
            </TableRow>   
          }
          {props.barbersPageIsOpen &&
            <TableRow>
              <TableCell />
              <TableCell>Imię</TableCell>
              <TableCell>Nazwisko</TableCell>
              <TableCell>Numer telefonu</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>   
          }
        </TableHead>
        <TableBody className={classes.servicesTable__body}>
          {props.servicesPageIsOpen && servicesRows.map((row) => (
            <Row 
              key={row._id} 
              row={row}
              servicesPageIsOpen={props.servicesPageIsOpen}
            />
          ))}
          {props.barbersPageIsOpen && barberRows.map((row) => (
            <Row 
              key={row._id} 
              row={row}
              barbersPageIsOpen={props.barbersPageIsOpen}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
