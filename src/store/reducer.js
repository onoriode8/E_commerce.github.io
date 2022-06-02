import * as actionType from './actions';

const initialState = {
    price: 100,
    toggleButton: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionType.TOGGLEBUTTON_TRUE):
            return {
                ...state,
                toggleButton: !state.toggleButton
            }
        default:
            return state;
    }
   
}

export default reducer;