import React, { useState } from 'react';
import './Login.css';
import { useDispatch } from 'react-redux'
import openModal from '../actions/openModal'
import regAction from '../actions/regAction';
import Signup from './Signup'
import Axios from 'axios';
import swal from 'sweetalert';


function Login(props) {

    const dispatch = useDispatch()

    const [ email, changeEmail ] = useState("");
    const [ password, changePassword ] = useState("");

    const submitLogin = async(e)=>{
        e.preventDefault();
        const url = `${window.apiHost}/users/login`;
        const data = {
            email: email,
            password: password
        }
        const resp = await Axios.post(url,data);
        const token = resp.data.token;
        
     
        if(resp.data.msg === "noEmail"){
            swal({
                title: "That email is not registered.",
                icon: "error",
              })
     
        }else if(resp.data.msg === "badPass"){
            swal({
                title: "Invalid email/password",
                text: "We don't have a match for that user name and password.",
                icon: "error",
              })
       
        }else if(resp.data.msg === "loggedIn"){
            swal({
                title: "Success!",
                icon: "success",
              });
            dispatch(regAction(resp.data))
            
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
                <div>Don't have an account? <span className="pointer" onClick={()=>dispatch(openModal('open',<Signup />))}>Sign up</span></div>
            </form>
        </div>
    )
}


export default Login
