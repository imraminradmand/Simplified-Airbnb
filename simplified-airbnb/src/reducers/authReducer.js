export default (state = {}, action)=> {
    if (action.type === 'REGISTER_ACTION') {
        return action.payload
    } else {
        return state
    }
}

//will listen for register action, if it gets it then it'll pass action.payload on to the store