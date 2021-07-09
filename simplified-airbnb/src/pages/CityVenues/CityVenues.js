import React, { Component } from 'react'
import './CityVenues.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../../utility/Spinner/Spinner'
import Venues from '../../utility/Venues/Venues'

class CityVenues extends Component {

    state = {
        venues: [],
        header: ""
    }
    async componentDidMount() {
        const cityName = this.props.match.params.cityName
        const url = `${window.apiHost}/venues/city/${cityName}`
        console.log(url)
        const res = await axios.get(url, {cityName})
        this.setState({
            venues: res.data.venues,
            header: res.data.header,
        })
    }
    render(){
        if(!this.state.header) {
            return <Spinner/>
        }
        return(
            <div className='row'>
                <Venues venues={this.state.venues} header={this.state.header} />
            </div>
        )
    }
}

export default CityVenues