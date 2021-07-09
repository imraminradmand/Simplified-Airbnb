import React from 'react'
import './SearchBox.css'
import controlledInput from '../../utility/ControlledInput/controlledInput'


function SearchBox(props) {

    const where = controlledInput('')
    const checkin = controlledInput('')
    const checkout = controlledInput('')
    const guests = controlledInput(1)



    return(
        <div className='home-search-box col m4'>
            <h1>Book Unique places to stay and things to do</h1>

            <form className='search-box-form'>
                <div className='col m12'>
                    <div className='form-label'>Where</div>
                    <div className='input-field' id='where'>
                        <input 
                        placeholder='Anywhere' 
                        {...where}
                        type='text'>
                        </input>
                    </div>
                </div>

                <div className='col m6'>
                    <div className='form-label'>Check-in</div>
                    <div className='input-field' id='checkin'>
                        <input  
                        placeholder='Anywhere' 
                        {...checkin}
                        type='date'>
                        </input>
                    </div>
                </div>

                <div className='col m6'>
                    <div className='form-label'>Check-out</div>
                    <div className='input-field' id='checkout'>
                        <input
                        placeholder='Anywhere' 
                        {...checkout}
                        type='date'>
                        </input>
                    </div>
                </div>

                <div className='col m12'>
                    <div className='form-label'>guest</div>
                    <div className='input-field' id='guest'>
                        <input
                        placeholder='Guests' 
                        {...guests}
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


export default SearchBox