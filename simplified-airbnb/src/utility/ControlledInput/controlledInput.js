import { useState } from 'react';
// to handle onChange inputs that need to be controlled to prevent warning in console

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