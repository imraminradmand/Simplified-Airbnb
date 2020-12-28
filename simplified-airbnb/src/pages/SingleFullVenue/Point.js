import React from 'react'


function Point(props) {
    console.log(props)

    const descObject = props.pointDesc.find((point) => (
        point.pointTitle === props.point
    ))

    return (
        <div>
            <div className='point-title'>
                <div> {props.point} </div>
                <div> {descObject.text}</div>
            </div>
        
        </div>
    )
}

export default Point