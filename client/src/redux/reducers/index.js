import { combineReducers } from "redux";
import auth from "./authReducer";
import theme from "./themeReducer";
import alert from "./alertReducer";
import profile from "./profileReducer"
import status from "./statusReducer"
import homePosts from "./postReducer"
import detailPost from "./detailPostReducer"
import suggestions from "./suggestionsReducer"
import socket from "./socketReducer"
import notify from "./notifyReducer"
import online from "./onlineofflineReducer"
import discover from "./discoverReducer"
import modal from "./modalReducer"
import message from "./messageReducer"
import settings from "./settingsReducer"
import call from "./callReducer"
import peer from "./peerReducer"

export default combineReducers({
    theme,
    auth,
    alert,
    profile,
    status,
    homePosts,
    detailPost,
    suggestions,
    modal,
    discover,
    online,
    socket,
    notify,
    message,
    settings,
    call,
    peer
    
})