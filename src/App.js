import './App.css';
import Footer from './components/Footer/footer';
import NavBar from './components/Header/navbar';
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
import { configureStore } from './components/redux/configureStore';
import { Provider } from 'react-redux';
import MainComp from './components/MainComponent';
const store = configureStore();
function App() {

  return (

    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <NavBar /><br></br>
          <MainComp />
          <Footer />
        </BrowserRouter>
      </Provider>




      {/*
      <Home/><br/> */}


    </div>
  );
}

export default App;
