import React, { Component } from 'react'
import './Activity.css'

class Activity extends Component {

    render() {
        const { activityType, cost, id, image, rating, title, totalRatings} = this.props.activity
        return (
            <div className='activity'>
                <img src={image} alt=''/>
                <div className='activity-type'>
                    {activityType}
                </div>

                <div className='title'>
                    {title}
                </div>

                <div className='cost'>
                    From ${cost}/ person
                </div>

                <div className='rating'>
                    <i className="material-icons">star</i>
                    {rating}({totalRatings})
                </div>
             </div>
        )
    }
}

export default Activity