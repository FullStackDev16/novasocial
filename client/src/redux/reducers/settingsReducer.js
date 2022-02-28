import { SETTINGS_TYPES } from '../actions/settingAction'

const initialState = {
    notifySound : true,
    messageSound : false,
}

const notifyReducer = (state = initialState, action) => {
    switch (action.type){
        case SETTINGS_TYPES.UPDATE_NOTIFY_SOUND:
            return { ...state, notifySound: action.payload};
        case SETTINGS_TYPES.UPDATE_MESSAGE_SOUND:
            return { ...state, messageSound: action.payload};
        default:
            return state;
    }
}


export default notifyReducer