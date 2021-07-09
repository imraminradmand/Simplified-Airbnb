const initialState = {}
export default (state = initialState, action)=> {
    if (action.type === 'REGISTER_ACTION') {
        return action.payload
    } else if(action.type === 'LOGOUT') {
        return initialState
        //throwing out the auth so we can logout
    }else {
        return state
    }
}

//will listen for register action, if it gets it then it'll pass action.payload on to the store