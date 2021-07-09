import { useState } from 'react';
// handle onChange inputs that throw warning in console

export default (initValue)=>{
    const [ value, setValue ] = useState(initValue);
    return {
        value: value,
        onChange: (e)=>{
            console.log(e.target.value);
            setValue(e.target.value);
        }
    }
}