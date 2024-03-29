import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { library } from '@fortawesome/fontawesome-svg-core'
import Spinner from '../../utility/Spinner/Spinner'
import { Link } from 'react-router-dom'
import './PaymentSuccess.css'
library.add(faLongArrowAltRight)

//this page will only render on port 3000, just how the stripe.js backend is only setup for testing purposes

function PaymentSuccess(props){
    
    const token = useSelector(state => state.auth.token)
    const email = useSelector(state => state.auth.email)

    const [ reservationDetails, setReservationDetails ] = useState({})
    const [ venueData, setVenueData ] = useState({})
    const [ waiting, setWaiting ] = useState(true)
    
    useEffect(()=>{
        const stripeToken = this.props.match.params.stripeToken;
        const token = this.props.auth.token;
        const data = {stripeToken,token};
        const successUrl = `${window.apiHost}/payment/success`;

        async function fetchData(){
            const resp = await axios.post(successUrl,data);
            setReservationDetails(resp.data.reservationDetails)
            setWaiting(false)
        }

        fetchData()
    })

    if(waiting){
        return(<Spinner/>)
    }

    const rd = this.state.reservationDetails;
    const vd = rd.venueData;
    
    return(
        <div className="reservation-success row">
        <h1 className="col m12 center">Start Packing!</h1>
        <div className="resv-details col s8 offset-s2">
            <div className="confirmed col m12 row">
                <FontAwesomeIcon icon="long-arrow-alt-right" size="1x" color="#ED0000" />Confirmed: {rd.diffDays} nights in {vd.location}         
                <div className="header-text">
                    <div>Booked by: {email}</div>
                    <div>{moment().format('MMMM Do, YYYY')}</div>
                </div>
            </div>
            <div className="confirmed-detail row">
                <div className="col m5">
                    <div className="bordered col">
                        <div className="col m12 upper">
                            <div className="left">Check in</div><div className="right">Check out</div>
                        </div>
                        <div className="col m12 lower">
                            <div className="left">{moment(rd.checkIn).format('MMM Do, YYYY')}</div><div className="right">{moment(rd.checkOut).format('MMM Do, YYYY')}</div>
                        </div>
                        <div className="col m12 title-text">
                            {vd.title}
                        </div>  
                        <div className="col m12 details">
                            {vd.details}
                        </div>  
                    </div>
                </div>


                <div className="col m7">
                    <div className="bordered col">
                        <div className="col m12 upper charges">
                            <div className="charges-text col m12">Charges</div>
                            <div className="row col m12">
                                <div className="left">${rd.pricePerNight} x {rd.diffDays} days</div>
                                <div className="right">${rd.totalPrice}</div>
                            </div>
                            <div className="row col m12">
                                <div className="left">Discount</div>
                                <div className="right">$0</div>
                            </div>                                
                            <div className="row col m12 total">
                                <div className="left">TOTAL</div>
                                <div className="right">${rd.totalPrice}</div>
                            </div>
                        </div>
                        <div className="col m12 row">Want to make changes to your reservation? visit your <Link to="/account">account page</Link>.</div>
                        <div className="col m12 resv-image"><img src={vd.imageUrl} /></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}



export default PaymentSuccess