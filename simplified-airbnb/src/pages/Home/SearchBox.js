import React, { history } from 'react'
import './SearchBox.css'
import useControlled from '../../UtilityFunctions/useControlled.js/useControlled'

function SearchBox(props) {


    const where = useControlled('')
    const checkin = useControlled('')
    const checkout = useControlled('')
    const guest = useControlled('1')    


    const submitSearch = (e)=>{
        e.preventDefault();
        props.history.push(`/search/${where.value}`)
    }

    return(
        <div className='home-search-box col m4'>
            <h1>Book Unique places to stay and things to do</h1>

            <form className='search-box-form' onSubmit={submitSearch}>
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
                        {...checkin}
                        type='date'>

                        </input>
                    </div>
                </div>

                <div className='col m6'>
                    <div className='form-label'>Check-out</div>
                    <div className='input-field' id='checkout'>
                        <input  
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
                        {...guest}
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