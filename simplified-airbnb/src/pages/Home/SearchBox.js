import React, {Component} from 'react'
import './SearchBox.css'

class SearchBox extends Component {

    state = {
        where: '',
    }

    changePlace = (e) => {
        this.setState({
            where: e.target.value
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
                            value={this.state.wehere}
                            type='text'>

                            </input>
                        </div>
                    </div>

                </form>
            </div>
        )
    }


}
export default SearchBox