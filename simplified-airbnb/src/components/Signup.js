import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import openModal from '../actions/openModal'
import Login from './Login'

class SignUp extends Component{

    showLogin = () => {
        this.props.openModal('open', <Login/>)
    }

    render(){
        return(
            <div className="login-form">
                <form onSubmit={this.submitSignup}>
                    <button className="facebook-login">Connect With Facebook</button>
                    <button className="google-login">Connect With Google</button>
                    <div className="login-or center">
                        <span>or</span>
                        <div className="or-divider"></div>
                    </div>
                    <button className="sign-up-button">Sign up with email</button>
                    <div className="divider"></div>
                    <div>Already have an account? 
                        <span onClick={this.showLogin} className='signup-loginpage'> Login</span>
                    </div>
                </form>
            </div>

        )
    }
}
    function mapDispatchToProps(dispatcher) {
        return bindActionCreators ({
            openModal: openModal
        }, dispatcher)
    }
    
    export default connect(null, mapDispatchToProps) (SignUp)
    