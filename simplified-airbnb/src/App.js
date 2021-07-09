import React, { Component, lazy, Suspense } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Spinner from './utility/Spinner/Spinner';

const Home = lazy(()=>import ('./pages/Home/Home'))
const SingleFullVenue = lazy(()=>import ('./pages/SingleFullVenue/SingleFullVenue'))
const NavBar = lazy(()=>import ('./utility/NavBar/NavBar'))
const Modal = lazy(()=>import ('./utility/Modal/Modal'))
const CityVenues = lazy(()=>import ('./pages/CityVenues/CityVenues'))
const PaymentSuccess = lazy(()=>import ('./pages/PaymentSuccess/PaymentSuccess'))
const AccountPage = lazy(()=>import ('./pages/AccountPage/AccountPage'))
const Search = lazy(()=>import ('./utility/Search/Search'))
class App extends Component {
  render(){
    return(
    <Router basename='/fast'>
      <Suspense fallback={<Spinner/>}>
        <Route path='/' component={NavBar}/>
        <Route exact path='/' component={Home}/>
        <Route exact path='/venue/:vid' component={SingleFullVenue}/>
        <Route exact path='/city/:cityName' component={CityVenues}/>
        <Route exact path="/payment-success/:stripeToken" component={PaymentSuccess} />
        <Route exact path="/account" component={AccountPage} />
        <Route path="/search/:searchTerm" component={Search} />
        <Route path='/' component={Modal}/>
      </Suspense>
    </Router>
    )
  }
  
}

export default App
