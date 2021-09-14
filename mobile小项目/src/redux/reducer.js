import {SAVE_PHONE} from './constans'
const initState = {
    phone:0
}
export default function reducer(state = initState,action){
    switch(action.type){
        case SAVE_PHONE:
            return{
                ...state,
                phone:action.phone
            }
        default:
            return state
    }
}