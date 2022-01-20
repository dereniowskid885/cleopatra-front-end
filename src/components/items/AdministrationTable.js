import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/LibraryAdd';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';
import { useCallback } from 'react';
import classes from '../../styles/Tables.module.scss';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const accountsHeadCells = [
  {
    id: 'email',
    numeric: false,
    disablePadding: true,
    label: 'E-mail',
  },
  {
    id: 'password',
    numeric: false,
    disablePadding: false,
    label: 'Hasło',
  },
  {
    id: 'gender',
    numeric: false,
    disablePadding: false,
    label: 'Płeć'
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Imię',
  },
  {
    id: 'surname',
    numeric: false,
    disablePadding: false,
    label: 'Nazwisko',
  },
  {
    id: 'phone',
    numeric: false,
    disablePadding: false,
    label: 'Telefon'
  },
];

const barbersHeadCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Imię',
  },
  {
    id: 'surname',
    numeric: false,
    disablePadding: false,
    label: 'Nazwisko',
  },
  {
    id: 'phone',
    numeric: false,
    disablePadding: false,
    label: 'Numer telefonu',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'E-mail',
  },
  {
    id: 'birth',
    numeric: false,
    disablePadding: false,
    label: 'Data urodzenia',
  }
];

const servicesHeadCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Usługa',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Cena',
  },
  {
    id: 'time',
    numeric: false,
    disablePadding: false,
    label: 'Czas trwania'
  },
  {
    id: 'comment',
    numeric: false,
    disablePadding: false,
    label: 'Komentarz',
  }
];

const visitsHeadCells = [
  {
    id: 'when',
    numeric: false,
    disablePadding: true,
    label: 'Termin',
  },
  {
    id: 'service',
    numeric: false,
    disablePadding: false,
    label: 'Usługa',
  },
  {
    id: 'barber',
    numeric: false,
    disablePadding: false,
    label: 'Fryzjer'
  },
  {
    id: 'client',
    numeric: false,
    disablePadding: false,
    label: 'Klient',
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {props.accountsPageIsOpen && accountsHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {props.barbersPageIsOpen && barbersHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {props.servicesPageIsOpen && servicesHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {props.visitsPageIsOpen && visitsHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected === 1 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
          className={classes.administrationTable__toolbar}
        >{numSelected} rekord</Typography>
      ) : (numSelected < 5) && (numSelected !== 0) ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
          className={classes.administrationTable__toolbar}
        >{numSelected} rekordy</Typography>
      ) : numSelected > 4 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
          className={classes.administrationTable__toolbar}
        >{numSelected} rekordów</Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
          className={classes.administrationTable__toolbar}
        >0 rekordów</Typography>
      )}

      {props.servicesPageIsOpen &&
        <Tooltip title="Dodaj">
          <IconButton onClick={props.openAddService}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      }

      {props.servicesPageIsOpen && (numSelected > 0) && (
        <Tooltip title="Usuń">
          <IconButton onClick={props.deleteSelected}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}

      {props.servicesPageIsOpen && (numSelected === 1) && (
        <Tooltip title="Edytuj">
          <IconButton onClick={props.openEditService}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}

      {props.barbersPageIsOpen &&
        <Tooltip title="Dodaj">
          <IconButton onClick={props.openAddBarber}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      }

      {props.barbersPageIsOpen && (numSelected > 0) && (
        <Tooltip title="Usuń">
          <IconButton onClick={props.deleteSelected}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}

      {props.barbersPageIsOpen && (numSelected === 1) && (
        <Tooltip title="Edytuj">
          <IconButton onClick={props.openEditBarber}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}

      {props.accountsPageIsOpen &&
        <Tooltip title="Dodaj">
          <IconButton onClick={props.openAddAccount}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      }

      {props.accountsPageIsOpen && (numSelected > 0) && !props.userLoggedIsSelected && (
        <Tooltip title="Usuń">
          <IconButton onClick={props.deleteSelected}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}

      {props.accountsPageIsOpen && (numSelected === 1) && (
        <Tooltip title="Edytuj">
          <IconButton onClick={props.openEditAccount}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}

      {props.visitsPageIsOpen && (numSelected > 0) && (
        <Tooltip title="Usuń">
          <IconButton onClick={props.deleteSelected}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}

      {props.visitsPageIsOpen && (numSelected === 1) && (
        <Tooltip title="Edytuj">
          <IconButton onClick={props.openEditVisit}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}

    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(pages) {
  const [ order, setOrder ] = React.useState('asc');
  const [ orderBy, setOrderBy ] = React.useState('calories');
  const [ selected, setSelected ] = React.useState([]);
  const [ page, setPage ] = React.useState(0);
  const [ rowsPerPage, setRowsPerPage ] = React.useState(5);
  const [ accountRows, setAccountRows ] = React.useState([]);
  const [ barberRows, setBarberRows ] = React.useState([]);
  const [ servicesRows, setServicesRows ] = React.useState([]);
  const [ visitsRows, setVisitsRows ] = React.useState([]);
  const [ userLoggedIsSelected, setUserLoggedState ] = React.useState(false);
  const [ openedTable, setOpenedTable ] = React.useState('');

  const updateTables = useCallback(() => {
    if (pages.accountsPageIsOpen || pages.accountIsAdded) {
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
    
        setAccountRows(tempData);
        setOpenedTable('clients');
      });
    } else if (pages.barbersPageIsOpen || pages.barberIsAdded) {
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
        setOpenedTable('hairdressers');
      });
    } else if (pages.servicesPageIsOpen || pages.serviceIsAdded) {
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
        setOpenedTable('services');
      });
    } else if (pages.visitsPageIsOpen || pages.visitIsAdded) {
      fetch('http://localhost:8080/visits')
      .then(response => { return response.json(); })
      .then(data => {
        const tempData = [];
    
        for (const key in data) {
          const item = {
            _id: key,
            ...data[key]
          };

          const tempDate = new Date(item.when);
          item.when = tempDate.toLocaleDateString() + ' ' + tempDate.toLocaleTimeString();
    
          tempData.push(item);
        }
    
        setVisitsRows(tempData);
        setOpenedTable('visits');
      });
    }
  }, [pages]);

  React.useEffect(() => { updateTables(); }, [updateTables]); 

  const deleteSelected = () => {
    selected.forEach((id) => {
      let requestBody = {};

      if (pages.accountsPageIsOpen) { 
        requestBody.clientid = id;
        
        fetch('http://localhost:8080/visits')
        .then(response => { return response.json(); })
        .then(data => {
          for (const key in data) {
            const item = {
              _id: key,
              ...data[key]
            };

            if (item.client._id === id) {
              let requestBody = {}
              requestBody.visitid = item._id;

              fetch(
                'http://localhost:8080/visits/' + item._id + '/delete',
                {
                  method: 'POST',
                  headers: { 'Content-type': 'application/json' },
                  body: JSON.stringify(requestBody)
                }
              );
            }
          }
        });
      } else if (pages.barbersPageIsOpen) { 
        requestBody.hairdresserid = id;

        fetch('http://localhost:8080/visits')
        .then(response => { return response.json(); })
        .then(data => {
          for (const key in data) {
            const item = {
              _id: key,
              ...data[key]
            };

            if (item.hairdresser._id === id) {
              let requestBody = {}
              requestBody.visitid = item._id;

              fetch(
                'http://localhost:8080/visits/' + item._id + '/delete',
                {
                  method: 'POST',
                  headers: { 'Content-type': 'application/json' },
                  body: JSON.stringify(requestBody)
                }
              );
            }
          }
        });
      } else if (pages.servicesPageIsOpen) { 
        requestBody.serviceid = id;

        fetch('http://localhost:8080/visits')
        .then(response => { return response.json(); })
        .then(data => {
          for (const key in data) {
            const item = {
              _id: key,
              ...data[key]
            };

            if (item.service._id === id) {
              let requestBody = {}
              requestBody.visitid = item._id;

              fetch(
                'http://localhost:8080/visits/' + item._id + '/delete',
                {
                  method: 'POST',
                  headers: { 'Content-type': 'application/json' },
                  body: JSON.stringify(requestBody)
                }
              );
            }
          }
        });
      }
      else if (pages.visitsPageIsOpen) { requestBody.visitid = id; }

      fetch(
        'http://localhost:8080/' + openedTable + '/' + id + '/delete',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        }
      ).then(() => {
        setSelected([]);
        updateTables();
      });
    });
  };

  const selectedItemId = () => {
    if (pages.accountsPageIsOpen) {
      pages.openEditAccount(selected[0]);
    } else if (pages.barbersPageIsOpen) {
      pages.openEditBarber(selected[0]);
    } else if (pages.servicesPageIsOpen) {
      pages.openEditService(selected[0]);
    } else if (pages.visitsPageIsOpen) {
      pages.openEditVisit(selected[0]);
    }
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      if (pages.accountsPageIsOpen) {
        const newSelecteds = accountRows.map((n) => n._id);
        checkForLoggedUser(newSelecteds);
        setSelected(newSelecteds);
        return;
      } else if (pages.barbersPageIsOpen) {
        const newSelecteds = barberRows.map((n) => n._id);
        setSelected(newSelecteds);
        return;
      } else if (pages.servicesPageIsOpen) {
        const newSelecteds = servicesRows.map((n) => n._id);
        setSelected(newSelecteds);
        return;
      } else if (pages.visitsPageIsOpen) {
        const newSelecteds = visitsRows.map((n) => n._id);
        setSelected(newSelecteds);
        return;
      }
    }
    
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    checkForLoggedUser(newSelected);
    setSelected(newSelected);
  };  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const checkForLoggedUser = (selected) => {
    for (const key in selected) {
      if (selected[key] === pages.userId) {
        setUserLoggedState(true);
        break;
      } else {
        setUserLoggedState(false);
      }
    }
  };

  const rowCount = () => {
    if (pages.accountsPageIsOpen) {
      return accountRows.length;
    } else if (pages.barbersPageIsOpen) {
      return barberRows.length;
    } else if (pages.servicesPageIsOpen) {
      return servicesRows.length;
    } else if (pages.visitsPageIsOpen) {
      return visitsRows.length;
    }
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = () => {
    if (pages.accountsPageIsOpen) {
      return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - accountRows.length) : 0;
    } else if (pages.barbersPageIsOpen) {
      return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - barberRows.length) : 0;
    } else if (pages.servicesPageIsOpen) {
      return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - servicesRows.length) : 0;
    } else if (pages.visitsPageIsOpen) {
      return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - visitsRows.length) : 0;
    }
  };

  return (
    <Box>
      <Paper className={classes.administrationTable}>
        <EnhancedTableToolbar 
          numSelected={selected.length}
          openAddService={pages.openAddService}
          openAddBarber={pages.openAddBarber}
          openAddAccount={pages.openAddAccount}
          openAddVisit={pages.openAddVisit}
          openEditAccount={selectedItemId}
          openEditBarber={selectedItemId}
          openEditService={selectedItemId}
          openEditVisit={selectedItemId}
          accountsPageIsOpen={pages.accountsPageIsOpen}
          barbersPageIsOpen={pages.barbersPageIsOpen}
          servicesPageIsOpen={pages.servicesPageIsOpen}
          visitsPageIsOpen={pages.visitsPageIsOpen}
          deleteSelected={deleteSelected}
          userLoggedIsSelected={userLoggedIsSelected}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size='medium'
            className={classes.administrationTable}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowCount()}
              accountsPageIsOpen={pages.accountsPageIsOpen}
              barbersPageIsOpen={pages.barbersPageIsOpen}
              servicesPageIsOpen={pages.servicesPageIsOpen}
              visitsPageIsOpen={pages.visitsPageIsOpen}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {pages.accountsPageIsOpen && stableSort(accountRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.email}
                      </TableCell>
                      <TableCell align="left">{row.password}</TableCell>
                      <TableCell align="left">{row.gender}</TableCell>
                      <TableCell align="left">{row.first_name}</TableCell>
                      <TableCell align="left">{row.last_name}</TableCell>
                      <TableCell align="left">{row.phone_number}</TableCell>
                    </TableRow>
                  );
                })
              }
              {pages.barbersPageIsOpen && stableSort(barberRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.first_name}
                      </TableCell>
                      <TableCell align="left">{row.last_name}</TableCell>
                      <TableCell align="left">{row.phone_number}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.birth}</TableCell>
                    </TableRow>
                  );
                })
              }
              {pages.servicesPageIsOpen && stableSort(servicesRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.price} zł</TableCell>
                      <TableCell align="left">{row.approx_time} minut</TableCell>
                      <TableCell align="left">{row.notes}</TableCell>
                    </TableRow>
                  );
                })
              }
              {pages.visitsPageIsOpen && stableSort(visitsRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.when}
                      </TableCell>
                      <TableCell align="left">{row.service.name}</TableCell>
                      <TableCell align="left">{row.hairdresser.first_name}</TableCell>
                      <TableCell align="left">{row.client.first_name}</TableCell>
                    </TableRow>
                  );
                })
              }
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowCount()}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
