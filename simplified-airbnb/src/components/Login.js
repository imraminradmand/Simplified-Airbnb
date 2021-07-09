import React, {Component} from 'react';
import './Login.css';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import openModal from '../actions/openModal'
import regAction from '../actions/regAction';
import Signup from './Signup'
import Axios from 'axios';
import swal from 'sweetalert';


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

    submitLogin = async(e) => {
        e.preventDefault()
        console.log(this.state.email, this.state.password)

        const url = `${window.apiHost}/users/login`
        const data = {
            email: this.state.email,
            password: this.state.password
        }

        const res = await Axios.post(url, data)
        const token = res.data.token

        if(res.data.msg === 'noEmail') {
            swal({
                title: 'Please provide an email',
                icon: 'error'
            })
        } else if (res.data.msg === 'badPass') {
            swal({
                title:'Invalid email and/or password',
                text:'No email found with that password',
                icon:'error'
            })
        } else if (res.data.msg === 'loggedIn') {
            swal({
                title:'Success',
                icon:'success'
            })

            this.props.regAction(res.data)
        }

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
        openModal: openModal,
        regAction: regAction
    }, dispatcher)
}

export default connect(null, mapDispatchToProps) (Login)
