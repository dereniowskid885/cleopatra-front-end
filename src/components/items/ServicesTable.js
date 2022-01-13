import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import classes from '../../styles/Tables.module.scss';

function Row(props) {
  const { row } = props;
  const [ open, setOpen ] = React.useState(false);

  return (
    <React.Fragment>
      {props.servicesPageIsOpen &&
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="left">{row.price} zł</TableCell>
          <TableCell align="left">{row.time} minut</TableCell>
          <TableCell align="left">
            {row.gender === 'm' ? 'Mężczyźni' : 'Kobiety'}
          </TableCell>
          <TableCell align="left">{row.comment}</TableCell>
        </TableRow>
      }
      {props.barbersPageIsOpen &&
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
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
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

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
              <TableCell>Nazwa usługi</TableCell>
              <TableCell>Cena</TableCell>
              <TableCell>Czas trwania</TableCell>
              <TableCell>Płeć</TableCell>
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
