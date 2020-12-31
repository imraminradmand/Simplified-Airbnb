import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import openModal from '../actions/openModal'
import Login from './Login'


const SignupForm = (props) => {
    return (
       <div className='sign-up-wrapper'>
           <div className='col m12'>
               <div className='input-field' id='email'>
                   <div className='form-label'>
                        <input placeholder='Email' onChange={props.changeEmail}/>
                    </div>
                </div>
            </div>

            <div className='col m12'>
               <div className='input-field' id='password'>
                   <div className='form-label'>
                        <input type='password'placeholder='Password' onChange={props.changePassword}/>
                    </div>
                </div>
            </div>

       </div>
    )
}

class SignUp extends Component{

    constructor() {
        super()
        this.state = {
        lowerForm: <button type ='button'
        onClick ={this.showInput}className="sign-up-button">
            Sign up with email
        </button>   
        }
    }

    showLogin = () => {
        this.props.openModal('open', <Login/>)
    }

    changeEmail = (e) => {
        this.setState({email:e.target.value})
    }

    changePassword = (e) => {
        this.setState({password:e.target.value})
    }

    showInput = () => {
        this.setState({
            lowerForm: <SignupForm 
                        changeEmail={this.changeEmail} 
                        changePassword={this.changePassword}/>
        })
    }

    submitSignup = (e) => {
        e.preventDefault()
        console.log(this.state.email, this.state.password)
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
                    {this.state.lowerForm}
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
    