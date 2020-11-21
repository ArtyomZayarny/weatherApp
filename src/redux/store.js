import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const SET_DATA = 'SET_DATA';

const initialState = {
    data: [],
    isError: false,
    msg: ''
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            return { ...state, ...action.payload };
        default: return state
    }
}

const store = createStore(rootReducer, composeWithDevTools());

export default store;