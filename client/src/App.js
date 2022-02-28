import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { previousTheme } from "./redux/actions/themeAction";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PrivateRouter from "./customRouter/PrivateRouter"

import Header from "./components/Header";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Alert from "./components/alert/Alert";
import NotFound from "./components/NotFound";
import Offline from "./components/Offline";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import { useIsOnline } from 'react-use-is-online';

import PageRender from "./customRouter/PageRender";
import { CssBaseline } from "@mui/material";
import ActivationEmail from "./components/auth/ActivationEmail";

import io from 'socket.io-client'

import { GLOBALTYPES } from "./redux/actions/globalTypes";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";
import { refreshToken } from "./redux/actions/authAction";
import { getNotifies } from "./redux/actions/notifyAction";

import SocketClient from "./SocketClient";
import PostStatusModal from "./components/Modals/PostStatusModal";
import CallModal from "./components/message/CallModal";

import Peer from "peerjs"
import { SETTINGS_TYPES } from "./redux/actions/settingAction";

import FaviconBlue from "./media/Images/Favicons/blue.ico"
import FaviconPurple from "./media/Images/Favicons/purple.ico"
import FaviconYellow from "./media/Images/Favicons/yellow.ico"
import FaviconOrange from "./media/Images/Favicons/orange.ico"
import FaviconRed from "./media/Images/Favicons/red.ico"
import FaviconGreen from "./media/Images/Favicons/green.ico"

function App() {
  const dispatch = useDispatch();
  const { auth, status, call, theme } = useSelector(state => state)
  const { isOnline, isOffline } = useIsOnline();

  useEffect(() => {
    dispatch(previousTheme());
    if(isOnline){
      dispatch(refreshToken())
      
      const socket = io("localhost:5000/", { transports: ['websocket'] })
      dispatch({ type: GLOBALTYPES.SOCKET, payload: socket })
      return () => socket.close()
    }
  }, [dispatch,isOnline]);

  useEffect(() => {
    if (auth.token && isOnline) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }
  }, [dispatch, auth.token,isOnline])

  useEffect(() => {
    if(isOnline){

      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }
      else if (Notification.permission === "granted") { }
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") { }
        });
      }
    }
  }, [isOnline])

  useEffect(() => {
      if (localStorage.getItem("notification_sound")) { dispatch({ type: SETTINGS_TYPES.UPDATE_NOTIFY_SOUND, payload: localStorage.getItem("notification_sound") === "true" ? true : false }) }
      if (localStorage.getItem("message_sound")) { dispatch({ type: SETTINGS_TYPES.UPDATE_MESSAGE_SOUND, payload: localStorage.getItem("message_sound") === "true" ? true : false }) }
  }, [dispatch,SETTINGS_TYPES])

  useEffect(() => {
    if(isOnline){
      const newPeer = new Peer(undefined, {
        path: '/', secure: true
      })
      dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
    }
  }, [dispatch,isOnline])

  const ThemeFavicon = {
    red:FaviconRed,
    purple:FaviconPurple,
    green:FaviconGreen,
    yellow:FaviconYellow,
    blue:FaviconBlue,
    orange:FaviconOrange,
  }
  useEffect(() => {
    const faviconUpdate = async () => {
      const favicon = document.getElementById("favicon");
      favicon.href = ThemeFavicon[theme.color ? theme.color : "blue"];
    };
    faviconUpdate();
  }, [theme,ThemeFavicon]);

  return (
    <BrowserRouter>

      <CssBaseline />
      <Alert />

      {isOnline ?
        <>
          {status && <PostStatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}

          <Switch>

            <Route exact path="/" >{auth.token ? <Header><Home /></Header> : <Login />}</Route>
            <Redirect from="/home" to="/" />

            <Route exact path="/forgot_password">{auth.token ? <NotFound /> : <ForgotPassword />}</Route>
            <Route exact path="/user/reset/:token">{auth.token ? <NotFound /> : <ResetPassword />}</Route>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/user/activate/:activation_token" component={ActivationEmail} />

            <PrivateRouter exact path="/:page" component={PageRender} />
            <PrivateRouter exact path="/:page/:id" component={PageRender} />

          </Switch>
        </>
        : <Offline />
      }

    </BrowserRouter>
  );
}

export default App;
