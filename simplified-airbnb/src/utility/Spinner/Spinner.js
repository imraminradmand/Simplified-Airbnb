import React, { Component } from 'react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faSpinner} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
import './Spinner.css'

library.add(faSpinner)

class Spinner extends Component {

    render() {
        return (
            <div className = 'spinner-wrapper'>
                <FontAwesomeIcon icon='spinner' size='6px' spin/>
            </div>
        )
    }
}

export default Spinner