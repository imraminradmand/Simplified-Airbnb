import React, {Component} from 'react';
import './Login.css';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import openModal from '../actions/openModal'
import Signup from './Signup'


class Login extends Component{

    state = {
        emai: '',
        password: ''
    }

    changeEmail = (e) => {
        this.setState({email:e.target.value})
    }

    changePassword = (e) => {
        this.setState({password:e.target.value})
    }

    showSignup = () => {
        this.props.openModal('open', <Signup/>)
    }

    submitLogin = (e) => {
        e.preventDefault()
        console.log(this.state.email, this.state.password)
    }


    render(){
        return(
            <div className="login-form">
                <form onSubmit={this.submitLogin}>
                    <button className="facebook-login">Connect With Facebook</button>
                    <button className="google-login">Connect With Google</button>
                    <div className="login-or center">
                        <span>or</span>
                        <div className="or-divider"></div>
                    </div>
                    <input type="text" className="browser-default" placeholder="Email address" onChange={this.changeEmail}/>
                    <input type="password" className="browser-default" placeholder="Password" onChange={this.changePassword} />
                    <button className="sign-up-button">Login</button>
                    <div className="divider"></div>
                    <div>Don't have an account? 
                        <span onClick={this.showSignup} className='signup-loginpage'> Sign up</span>
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

export default connect(null, mapDispatchToProps) (Login)
