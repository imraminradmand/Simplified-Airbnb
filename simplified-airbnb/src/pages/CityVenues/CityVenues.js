import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../../utility/Spinner/Spinner'
import Venues from '../../utility/Venues/Venues'

function CityVenues(props) {

    const [ venues, setVenues ] = useState([])
    const [ header, setHeader ] = useState("")

    useEffect(() => {
        const getVenues = async() => {
            const cityName = this.props.match.params.cityName
            const url = `${window.apiHost}/venues/city/${cityName}`
            console.log(url)
            const res = await axios.get(url, {cityName})
            setVenues(res.data.venues)
            setHeader(res.data.header)
        }
        getVenues()
    }, [])

    if(!header) {
        return <Spinner/>
    }

    return(
        <div className='row'>
            <Venues venues={this.state.venues} header={this.state.header} />
        </div>
    )
}

export default CityVenues