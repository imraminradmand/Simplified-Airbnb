import React, {Component} from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import openModal from '../../actions/openModal'
import Login from '../../components/Login'
import Signup from '../../components/Signup'

class NavBar extends Component {
    render(){

       let navColour ='transparent'
        if(this.props.location.pathname !== '/') {
            navColour='black'
        }

        return(
            <div className='container-fluid nav'>
                <div className='row'>
                    <nav className={navColour}>
                        <div className='nav-wrapper'>
                            <Link to='/' className='left'>airbnb</Link>
                            <ul id='nav-mobile' className='right'>
                                <li><Link to='/'>English US</Link></li>
                                <li><Link to='/'>$ USD</Link></li>
                                <li><Link to='/'>Become a host</Link></li>
                                <li><Link to='/'>Help</Link></li>
                                <li onClick={() => {this.props.openModal('open', <Login />)}}>Login</li>
                                <li onClick={() => {this.props.openModal('open', <Signup />)}}>Signup</li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatcher) {
    return bindActionCreators ({
        openModal: openModal
    }, dispatcher)
}
export default connect(null, mapDispatchToProps) (NavBar)