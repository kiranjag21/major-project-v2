import './App.css';
import Footer from './components/Footer/footer';
import NavBar from './components/Header/navbar';
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
import { configureStore } from './components/redux/configureStore';
import { Provider } from 'react-redux';
import MainComp from './components/MainComponent';
import React from 'react';

const store = configureStore();
function App() {

  const [openLogin, setOpenLogin] = React.useState(false);
  const [openSignup, setOpenSignup] = React.useState(false);

  return (

    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <NavBar openLogin={openLogin} openSignup={openSignup} setOpenLogin={setOpenLogin} setOpenSignup={setOpenSignup}/><br></br>
          <MainComp openLogin={openLogin} setOpenLogin={setOpenLogin} setOpenSignup={setOpenSignup}/>
          <Footer />
        </BrowserRouter>
      </Provider>




      {/*
      <Home/><br/> */}


    </div>
  );
}

export default App;
