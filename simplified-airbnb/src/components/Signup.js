import React, {useState, useEffect} from 'react'
import { bindActionCreators } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import regAction from '../actions/regAction'
import openModal from '../actions/openModal'
import Login from './Login'
import axios from 'axios'
import swal from 'sweetalert'

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
            <div className='col m12'>
                <button type='submit' className='btn red accent-2'>SignUp</button>
            </div>

       </div>
    )
}

function SignUp(props) {

    const dispatch = useDispatch()

    const [ lowerPart, setLowerPart ] = useState("")
    const [ email, changeEmail ] = useState("")
    const [ password, changePassword ] = useState("")

    useEffect(() => {
        setLowerPart(
            <button 
                type="button" 
                onClick={showInput} 
                className="sign-up-button"
            >Sign up with email
            </button>
        )
    }, [])

    const showInput = () => {
        setLowerPart(
            <SignupForm
                changeEmail={(e)=>changeEmail(e.target.value)} 
                changePassword={(e)=>changePassword(e.target.value)} />
        )
    }

    const submitSignup = async(e) => {
        e.preventDefault()
        const url = `${window.apiHost}/users/signup`
        const data = {
            email: email,
            password: password
        }
        const res = await axios.post(url, data)
        const token = res.data.token
        console.log(res.data)
        
        if(res.data.msg === 'userExists') {
            swal({
                title: "Email Exists",
                text: "The provided email already exists",
                icon: "error",
              })
        } else if(res.data.msg === 'invalidData') {
            swal({
                title: "Email Invalid email or password",
                text: "Enter valid email or password",
                icon: "error",
              })
        } else {
            swal({
                title: "Success!",
                icon: "success",
              })

              dispatch(regAction(res.data)) //updates auth reducer
        }
    }


    return(
        <div className="login-form">
            <form onSubmit={submitSignup}>
                <button className="facebook-login">Connect With Facebook</button>
                <button className="google-login">Connect With Google</button>
                <div className="login-or center">
                    <span>or</span>
                    <div className="or-divider"></div>
                </div>
                {lowerPart}
                <div className="divider"></div>
                <div>Already have an account? 
                    <span onClick={()=>dispatch(openModal('open',<Login />))} className='signup-loginpage'> Login</span>
                </div>
            </form>
        </div>

    )
}
   
export default SignUp
    
    //using redux for this instead of cookies so everything can update itself
    //lets say their langauage needs to change after login or their currency needs to change
    //instead of cookies redux will ignite a chain reaction and eveything will update automatically