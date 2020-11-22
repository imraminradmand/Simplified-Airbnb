import React, {Component} from 'react'
import './SearchBox.css'

class SearchBox extends Component {

    state = {
        where: '',
        checkin: '',
        checkout: '',
        guest: 0,
    }

    changePlace = (e) => {
        this.setState({
            where: e.target.value
        })
    }

    changeCheckin = (e) => {
        this.setState({
            checkin: e.target.value
        })
    }

    changeCheckout = (e) => {
        this.setState({
            checkout: e.target.value
        })
    }

    changeGuest = (e) => {
        this.setState({
            guest: e.target.value
        })
    }

    render(){
        return(
            <div className='home-search-box col m4'>
                <h1>Book Unique places to stay and things to do</h1>

                <form className='search-box-form'>
                    <div className='col m12'>
                        <div className='form-label'>Where</div>
                        <div className='input-field' id='where'>
                            <input onChange={this.changePlace} 
                            placeholder='Anywhere' 
                            value={this.state.where}
                            type='text'>

                            </input>
                        </div>
                    </div>

                    <div className='col m6'>
                        <div className='form-label'>Check-in</div>
                        <div className='input-field' id='checkin'>
                            <input onChange={this.changeCheckin} 
                            placeholder='Anywhere' 
                            value={this.state.checkin}
                            type='date'>

                            </input>
                        </div>
                    </div>

                    <div className='col m6'>
                        <div className='form-label'>Check-out</div>
                        <div className='input-field' id='checkout'>
                            <input onChange={this.changeCheckout} 
                            placeholder='Anywhere' 
                            value={this.state.checkout}
                            type='date'>

                            </input>
                        </div>
                    </div>

                    <div className='col m12'>
                        <div className='form-label'>guest</div>
                        <div className='input-field' id='guest'>
                            <input onChange={this.changeGuest} 
                            placeholder='Guests' 
                            value={this.state.guest}
                            type='number'>

                            </input>
                        </div>
                    </div>

                    <div className='col m12 submit-btn'>
                        <div className='input-field' id='submit-btn'>
                            <input className='btn-large waves-effect waves-light red accent-2' type='submit'>
                            </input>
                        </div>
                    </div>

                </form>
            </div>
        )
    }


}
export default SearchBox