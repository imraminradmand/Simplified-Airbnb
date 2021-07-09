import React, { useState } from 'react';
import './Login.css';
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import openModal from '../actions/openModal'
import regAction from '../actions/regAction';
import Signup from './Signup'
import Axios from 'axios';
import swal from 'sweetalert';


function Login(props) {

    const [ email, changeEmail ] = useState('')
    const [ password, changePassword ] = useState('')

    const dispatch = useDispatch()


    const submitLogin = async(e) => {
        e.preventDefault()
        

        const url = `${window.apiHost}/users/login`
        const data = {
            email: email,
            password: password
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

            dispatch(regAction(res.data))
        }

    }


    return(
        <div className="login-form">
            <form onSubmit={submitLogin}>
                <button className="facebook-login">Connect With Facebook</button>
                <button className="google-login">Connect With Google</button>
                <div className="login-or center">
                    <span>or</span>
                    <div className="or-divider"></div>
                </div>
                <input onChange={(e)=>changeEmail(e.target.value)} value={email} type="text" className="browser-default" placeholder="Email address" />
                <input onChange={(e)=>changePassword(e.target.value)} value={password} type="password" className="browser-default" placeholder="Password" />
                <button className="sign-up-button">Login</button>
                <div className="divider"></div>
                <div>Don't have an account? 
                    <span onClick={()=>dispatch(openModal('open',<Signup />))} className='signup-loginpage'> Sign up</span>
                </div>
            </form>
        </div>
    )
}



export default Login
