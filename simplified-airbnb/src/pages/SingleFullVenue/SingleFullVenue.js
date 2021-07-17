import React, { useState, useEffect } from 'react'
import Point from './Point'
import './SingleFullVenue.css'
import { connect, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import logoutAction from '../../actions/logoutAction'
import openModal from '../../actions/openModal'
import Login from '../../components/Login'
import moment from 'moment'
import axios from 'axios'
import swal from 'sweetalert'
import loadScript from '../../UtilityFunctions/loadScript'

function SingleFullVenue(props) {

    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)

    const [ singleVenue, setSingleVenue ] = useState({})
    const [ points, setPoints ] = useState([])
    const [ checkIn, setCheckIn ] = useState("")
    const [ checkOut, setCheckOut ] = useState("")
    const [ numGuests, setNumGuests ] = useState("")

    useEffect(() => {
        const vId = props.match.params.vid
        const url = `${window.apiHost}/venue/${vId}`

        const getData = async() => {
            const axiosRes = await axios.get(url)
            const singleVenue = axiosRes.data

            const pointsUrl = `${window.apiHost}/points/get`
            const pAxiosRes = await axios.get(pointsUrl)



            const points = singleVenue.points
                .split(',').map((point, i)=> {
                    return(
                        <span key={i}>
                            <Point pointDesc={pAxiosRes.data} point={point}/>
                        </span>
                    )
                })
                setSingleVenue(singleVenue)
                setPoints(points)
            }
            getData()
    })



    const reserveNow = async(e)=>{
        const startDayMoment = moment(checkIn)
        const endDayMoment = moment(checkOut)
        const diffDays = endDayMoment.diff(startDayMoment,"days");
        if(diffDays < 1){
            
            swal({
                title: "Check out date must be after check in date",
                icon: 'error',
            })
        }else if(isNaN(diffDays)){
            
            swal({
                title: "Please make sure your dates are valid",
                icon: 'error',
            })
        }else{
            
            const pricePerNight = singleVenue.pricePerNight;
            const totalPrice = pricePerNight * diffDays;
            const scriptUrl = 'https://js.stripe.com/v3';
            const stripePublicKey = 'pk_test_5198HtPL5CfCPYJ3X8TTrO06ChWxotTw6Sm2el4WkYdrfN5Rh7vEuVguXyPrTezvm3ntblRX8TpjAHeMQfHkEpTA600waD2fMrT'; //should be an env var
            //PLACING IN OWN MODULE, KEEPING HERE FOR CODE UNDERSTANDABILITY
            // await new Promise((resolve, reject) =>{
            //     const script = document.createElement('script')
            //     script.type = 'text/javascript'
            //     script.src = scriptUrl
            //     script.onload = () => {
            //         console.log('script loaded')
            //         resolve()
            //     }
            //     document.getElementsByTagName('head')[0].appendChild(script)
            //     //could have used a script tag wanting to try something different
            //     console.log('Script added')
            // })
            await loadScript(scriptUrl) 
            const stripe = window.Stripe(stripePublicKey);
            const stripeSessionUrl = `${window.apiHost}/payment/create-session`;
            const data = {
                venueData: singleVenue,
                totalPrice,
                diffDays,
                pricePerNight,
                checkIn: checkIn,
                checkOut: checkOut,
                token: token,
                numberOfGuests: numGuests,
                currency: 'USD',
            }
            
            const sessionVar = await axios.post(stripeSessionUrl,data);
            // console.log(sessionVar.data);
            stripe.redirectToCheckout({
                sessionId: sessionVar.data.id,
            }).then((result)=>{
                console.log(result);
                //if the network fails, this will run
            })
        }
    }



        const sv = singleVenue
    return (
        <div className='row single-venue'>
            <div className='col s12 center'>
                <img src={sv.imageUrl} alt=''/>
            </div>
            <div className='col s8 location-details offset-s2'>
                <div className='col s8 left-details'>
                    <div className='location'>
                        {sv.location}
                    </div>
                    <div className='title'>
                        {sv.title}
                    </div>
                    <div className='guests'>
                        {sv.guests}
                    </div>
                    <div className='divider'></div>

                    {points}

                    <div className='details'> {sv.details}</div>
                    <div className='amenities'> {sv.amenities}</div>
                </div>
                <div className='col s4 right-details'>
                    <div className='price-per-day'>
                        ${sv.pricePerNight}
                        <span>
                            per day
                        </span>
                    </div>
                    <div className='rating'> {sv.rating} </div>

                    <div className='col s6'>
                        Check-In
                        <input onChange={(e)=>setCheckIn(e.target.value)} value={checkIn} type='date'/>
                    </div>
                    <div className='col s6'>
                        Check-out
                        <input type='date' onChange={(e)=>setCheckOut(e.target.value)} value={checkOut}/>
                    </div>

                    <div className='col s12'>
                        <select className='browser-default' onChange={(e)=>setNumGuests(e.target.value)} value={numGuests}>
                            <option value='1'>1 Guest</option>
                            <option value='2'>2 Guests</option>
                            <option value='3'>3 Guests</option>
                            <option value='4'>4 Guests</option>
                            <option value='5'>5 Guests</option>
                            <option value='6'>6 Guests</option>
                            <option value='7'>7 Guests</option>
                        </select>
                    </div>
                    <div className='col s12 center'>
                        {token
                                ?
                                <>
                                    <button onClick={reserveNow} className='btn red accent-2'>
                                        Reserve
                                    </button>
                                </>
                                :
                                <>
                                <button onClick={()=>dispatch(openModal('open',<Login />))} className='btn red accent-2'>
                                    Login
                                </button>
                                </>
                        }
                        
                    </div>
                </div>
                

            </div>
        </div>
    )
}

export default SingleFullVenue