import React, {Component} from 'react'
import './Home.css'
import SearchBox from './SearchBox'
import axios from 'axios'

class Home extends Component {

    componentDidMount () {
        const recommendedCities = axios.get()
    }

    render(){
        return(
            <div className='container-fluid'>
                <div className='row'>
                    <div className='home col s12'>
                        <div className='upper-fold'>
                            <SearchBox/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home