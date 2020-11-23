import React, { Component } from 'react'
import './City.css'

class City extends Component {

    render() {
        console.log(this.props.City)
        return (
            <div className='city'>
                <h1>City</h1>
            </div>
        )
    }
}

export default City