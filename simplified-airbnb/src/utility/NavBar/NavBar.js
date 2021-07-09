import React, {Component} from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import openModal from '../../actions/openModal'
import Login from '../../components/Login'
import Signup from '../../components/Signup'

class NavBar extends Component {

    componentDidUpdate(oldProps) {
        if(oldProps.auth.token !== this.props.auth.token) {
            this.props.openModal('closed', '')
        }
    } //  close modal after user has signed up and you have a token
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
                                {this.props.auth.email
                                    ?
                                    <>
                                        <li>Hi there, {this.props.email}</li>
                                        <li>Logout</li>
                                    </>
                                    :
                                    <>
                                        <li className ='login-signup' onClick={() => {this.props.openModal('open', <Login />)}}>Login</li>
                                        <li className = 'login-signup' onClick={() => {this.props.openModal('open', <Signup />)}}>Signup</li>
                                    </>
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}

//just so nav bar knows whats happening so it can adjust
function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatcher) {
    return bindActionCreators ({
        openModal: openModal
    }, dispatcher)
}
export default connect(mapStateToProps, mapDispatchToProps) (NavBar)