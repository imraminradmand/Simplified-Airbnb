import React, { Component } from 'react'
import Point from './Point'
import './SingleFullVenue.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import logoutAction from '../../actions/logoutAction'
import openModal from '../../actions/openModal'
import Login from '../../components/Login'
import moment from 'moment'
import axios from 'axios'
import swal from 'sweetalert'
import loadScript from '../../UtilityFunctions/loadScript'

class SingleFullVenue extends Component {

    state = { 
        singleVenue: {},
        points: []
    }

    componentDidUpdate(oldProps) {
        if(oldProps.auth.token !== this.props.auth.token) {
            this.props.openModal('closed', '')
        }
    } //  close modal after user has signed up and you have a token

    async componentDidMount() {
        const vId = this.props.match.params.vid
        const url = `${window.apiHost}/venue/${vId}`
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
        this.setState({singleVenue, points})
    }

    changeNumGuests = (e) =>{this.setState({numberOfGuests: e.target.value})}
    changeCheckIn = (e) =>{this.setState({checkIn: e.target.value})}
    changeCheckOut = (e) =>{this.setState({checkOut: e.target.value})}

    reserveNow = async(e) => {
        const startDay = moment(this.state.checkIn)
        console.log(startDay)
        const endDay = moment(this.state.checkOut)
        console.log(endDay)
        const diff = endDay.diff(startDay, 'days')
        console.log(diff)

        if(diff < 1) {
            swal({
                title:'Invalid date',
                text:'CheckOut date has to be after CheckIn',
                icon:'error'
            })
        } else if (isNaN(diff)) {
            swal({
                title:'Bad date',
                text:'Please make sure your dates are valid',
                icon:'error'
            })
        } else {
            const price = this.state.singleVenue.pricePerNight * diff
            console.log(price) 
            const scriptUrl = 'https://js.stripe.com/v3'
            const stripePublicKey = 'pk_test_5198HtPL5CfCPYJ3X8TTrO06ChWxotTw6Sm2el4WkYdrfN5Rh7vEuVguXyPrTezvm3ntblRX8TpjAHeMQfHkEpTA600waD2fMrT' // should be in env file

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
            //gotta have it be an async await cause if the JS script doesnt run then line
            //96 wont run cause nothings there, incase internet speeds drop or something

            await loadScript(scriptUrl)
            console.log('good to go with Stripe')
            const stripe = window.Stripe(stripePublicKey)

        }
    }

    render () {
        const sv = this.state.singleVenue
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

                        {this.state.points}

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
                            <input onChange={this.changeCheckIn} value={this.state.checkIn} type='date'/>
                        </div>
                        <div className='col s6'>
                            Check-out
                            <input type='date' onChange={this.changeCheckOut} value={this.state.checkOut}/>
                        </div>

                        <div className='col s12'>
                            <select className='browser-default' onChange={this.changeNumGuests} value={this.state.numberOfGuests}>
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
                            {this.props.auth.email
                                    ?
                                    <>
                                        <button onClick={this.reserveNow} className='btn red accent-2'>
                                            Reserve
                                        </button>
                                    </>
                                    :
                                    <>
                                    <button onClick={() => {this.props.openModal('open', <Login />)}} className='btn red accent-2'>
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
}
function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatcher) {
    return bindActionCreators ({
        logoutAction: logoutAction,
        openModal: openModal
    }, dispatcher)
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleFullVenue)