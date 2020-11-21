import { SET_DATA } from './store'

export const setData = (data) => {
    return {
        type: SET_DATA,
        payload: data
    }
}