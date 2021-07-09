import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import SingleFullVenue from './pages/SingleFullVenue/SingleFullVenue'
import NavBar from './utility/NavBar/NavBar'
import Modal from './utility/Modal/Modal'
import CityVenues from './pages/CityVenues/CityVenues'
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess'
import AccountPage from './pages/AccountPage/AccountPage'

class App extends Component {
  render(){
    return(
      <Router>
        <Route path='/' component={NavBar}/>
        <Route exact path='/' component={Home}/>
        <Route exact path='/venue/:vid' component={SingleFullVenue}/>
        <Route exact path='/city/:cityName' component={CityVenues}/>
        <Route exact path="/payment-success/:stripeToken" component={PaymentSuccess} />
        <Route exact path="/account" component={AccountPage} />
        <Route path='/' component={Modal}/>
      </Router>
    )
  }
  
}

export default App