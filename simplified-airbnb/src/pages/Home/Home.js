import React, {Component} from 'react'
import Spinner from '../../utility/Spinner/Spinner'
import './Home.css'
import SearchBox from './SearchBox'
import Cities from '../../utility/City/Cities'
import axios from 'axios'

class Home extends Component {

    state = {
        cities: [],
        europeCities: {},
        asiaCities: {},
        exoticCities: {},
    }

   async componentDidMount () {
       const citiesURL = `${window.apiHost}/cities/recommended`
       const europeCities = `${window.apiHost}/cities/europe`
       const asiaCities = `${window.apiHost}/cities/asia`
       const exoticCities = `${window.apiHost}/cities/exotic`

       const citiesPromises = []
       citiesPromises.push(axios.get(citiesURL))
       citiesPromises.push(axios.get(europeCities))
       citiesPromises.push(axios.get(asiaCities))
       citiesPromises.push(axios.get(exoticCities))

        Promise.all(citiesPromises).then((data)=>{
            const recommendedCities = data[0].data;
            const europeCities = data[1].data;
            const asiaCities = data[2].data;
            const exoticCities = data[3].data;

            this.setState({
                cities: recommendedCities,
                europeCities,
                asiaCities,
                exoticCities,
            })
        })
        
     
   }

    render(){

        if(this.state.cities.length === 0) {
            return(<Spinner/>)
        }

        return( <>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='home col s12'>
                            <div className='upper-fold'>
                                <SearchBox/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container-fluid lower-fold'>
                    <div className='row'>
                        <div className='col s12'>
                            <Cities cities={this.state.cities} header='Recommended Cities for you' />
                        </div>

                        <div className='col s12'>
                            <Cities cities={this.state.europeCities.cities} header={this.state.europeCities.header} />
                        </div>

                        <div className='col s12'>
                            <Cities cities={this.state.asiaCities.cities} header={this.state.asiaCities.header} />
                        </div>

                        <div className='col s12'>
                            <Cities cities={this.state.exoticCities.cities} header={this.state.exoticCities.header} />
                        </div>
                    </div>
                </div>
          </>  
        )
    }
}

export default Home