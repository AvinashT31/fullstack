import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Addproduct from './Components/Addproduct';
import Showproduct from './Components/Showproduct';
import Register from './Components/Register';
import Login from './Components/Login';
import Navbar from './Global/Navbar';
import Producthandler from './Components/Producthandler';


function App() {
  return (
    <div className="App">
      {<Navbar />}
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path='/addproduct' element={<Addproduct />} />
        <Route exact path ='/showproduct' element={<Showproduct/>} />
        <Route exact path='/producthandler' element={<Producthandler/>} />
      </Routes>
    </div>
  );
}

export default App;
