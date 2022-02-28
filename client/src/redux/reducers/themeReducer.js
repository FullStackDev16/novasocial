import { THEME_TYPES } from "../actions/themeAction";

const initialState = {
    mode:"",
    color:"",
    font:"",
    fontsize:"",
    borderradius:""
}

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case THEME_TYPES.COLOR_CHANGE:
            return { ...state, color: action.payload }
        case THEME_TYPES.MODE_CHANGE:
            return { ...state, mode: action.payload }
        case THEME_TYPES.FONT_CHANGE:
            return { ...state, font: action.payload }
        case THEME_TYPES.BORDER_RADIUS_CHANGE:
            return { ...state, borderradius: action.payload }
        case THEME_TYPES.FONT_SIZE_CHANGE:
            return { ...state, fontsize: action.payload }
        default:
            return state
    }


}

export default themeReducer