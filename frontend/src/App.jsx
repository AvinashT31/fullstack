import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Addproduct from './Components/Addproduct';
import Register from './Components/Register';
import Login from './Components/Login';
import Navbar from './Global/Navbar';


function App() {
  return (
    <div className="App">
      {<Navbar />}
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path='/addproduct' element={<Addproduct />} />
      </Routes>
    </div>
  );
}

export default App;
