import React, {Component} from 'react'
import Spinner from '../../utility/Spinner/Spinner'
import './Home.css'
import SearchBox from './SearchBox'
import Cities from '../../utility/City/Cities'
import axios from 'axios'

class Home extends Component {

    state = {
        cities: [],
    }

   async componentDidMount () {
        const recommendedCities = await axios.get(`${window.apiHost}/cities/recommended`)
        this.setState({
            cities: recommendedCities.data
        })
    }

    render(){

        if(this.state.cities.length === 0) {
            return(
                <Spinner/>
            )
        }

        const recCity = <Cities cities={this.state.cities} />

        console.log(recCity)

        return(
            <div className='container-fluid'>
                <div className='row'>
                    <div className='home col s12'>
                        <div className='upper-fold'>
                            <SearchBox/>
                        </div>
                    </div>
                    {recCity}
                </div>
            </div>
        )
    }
}

export default Home