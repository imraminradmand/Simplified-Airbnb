import React, { useState, useEffect } from 'react'
import Spinner from '../../utility/Spinner/Spinner'
import './Home.css'
import SearchBox from './SearchBox'
import Cities from '../../utility/City/Cities'
import Activities from '../../utility/Activity/Activities'
import Venues from '../../utility/Venues/Venues'
import axios from 'axios'
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min'

function Home (props){

    const [ cities, setCities ] = useState([])
    const [ activities, setActivities ] = useState({})
    const [ europeCities, setEuropeCities ] = useState({})
    const [ asiaCities, setAsiaCities ] = useState({})
    const [ exoticCities, setExoticCities ] = useState({})
    const [ recVenues, setRecVenues ] = useState({})


    useEffect(()=> {
        const citiesURL = `${window.apiHost}/cities/recommended`
        const europeCities = `${window.apiHost}/cities/europe`
        const asiaCities = `${window.apiHost}/cities/asia`
        const exoticCities = `${window.apiHost}/cities/exotic`
        const citiesPromises = []

        async function getData() {
            citiesPromises.push(axios.get(citiesURL))
            citiesPromises.push(axios.get(europeCities))
            citiesPromises.push(axios.get(asiaCities))
            citiesPromises.push(axios.get(exoticCities))
     
            const res = await Promise.all(citiesPromises)
            setCities(res[0].data)
            setEuropeCities(res[1].data)
            setAsiaCities(res[2].data)
            setExoticCities(res[3].data)

            const activitiesUrl = `${window.apiHost}/activities/today`
            const activities = await axios(activitiesUrl)
            setActivities(activities.data)

            const recVenuesUrl = `${window.apiHost}/venues/recommended`;
            const venues = await axios(recVenuesUrl);
            setRecVenues(venues.data)
        }
        getData()
    },[])


    

    if((!recVenues.venues) || cities.length === 0) {
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
                        <Cities cities={cities} header='Recommended Cities for you' />
                    </div>

                    <div className='col s12'>
                        <Activities activities={activities} header='Today in your area'/>
                    </div>

                    <div className='col s12'>
                        <Cities cities={europeCities.cities} header={europeCities.header} />
                    </div>

                    <div className='col s12'>
                        <Venues venues={recVenues.venues} header={recVenues.header} />
                    </div>

                    <div className='col s12'>
                        <Cities cities={asiaCities.cities} header={asiaCities.header} />
                    </div>

                    <div className='col s12'>
                        <Cities cities={exoticCities.cities} header={exoticCities.header} />
                    </div>
                </div>
            </div>
        </>  
    )
}


export default Home