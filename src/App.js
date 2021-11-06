import classes from './styles/App.module.scss';
import Home from './pages/Home';
import Reservations from './pages/Reservations';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
      <main className={classes.container}>
        <Routes>
          <Route path="/" element={ 
              <Home /> 
            } 
          />
          <Route path="/reservations" element={
              <Reservations /> 
            } 
          />
        </Routes>
      </main>
  );
}

export default App;
