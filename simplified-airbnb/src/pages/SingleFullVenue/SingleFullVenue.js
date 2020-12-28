import React, { Component } from 'react'
import Point from './Point'
import './SingleFullVenue.css'
import axios from 'axios'

class SingleFullVenue extends Component {

    state = { 
        singleVenue: {},
        points: []
    }

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

    reserveNow =() => {
        console.log('user wants to reserve now')
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
                            <input type='date'></input>
                        </div>
                        <div className='col s6'>
                            Check-out
                            <input type='date'></input>
                        </div>

                        <div className='col s12'>
                            <select className='browser-default'>
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
                            <button onClick={this.reserveNow} className='btn red accent-2'>
                                Reserve
                            </button>
                        </div>
                    </div>
                  

                </div>
            </div>
        )
    }
}

export default SingleFullVenue