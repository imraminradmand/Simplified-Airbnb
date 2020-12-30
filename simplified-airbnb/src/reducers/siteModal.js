export default(state = {openClose: 'closed', content: ''},  action) => {
   if(action.type === 'OPEN_MODAL') {
       return action.payload
   }
   return state
    }
   