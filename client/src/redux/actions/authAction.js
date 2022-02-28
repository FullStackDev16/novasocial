import { postDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
import valid from "../../utils/validation/valid"

export const TYPES = {
  AUTH: "AUTH",
};

export const register = (data) => async (dispatch) => {
  const check = valid(data)
  if (check.errlength > 0) {
    return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errorMsg });
  }
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI("register", data);

    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });

  } catch (error) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
  }

};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    
    const res = await postDataAPI("login", data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: { token: res.data.access_token, user: res.data.user },
    });
    
    localStorage.setItem("firstlogin", true);

    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });

  } catch (error) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstlogin");
  if (firstLogin) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    try {
      const res = await postDataAPI('refresh_token');
      dispatch({ type: GLOBALTYPES.AUTH, payload: { token: res.data.access_token, user: res.data.user },});
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

    } catch (error) {
      try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })    
      } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Something went wrong while logging in" } })
      }
    }
  }
};

export const googleLogin = (tokenId) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    
    const res = await postDataAPI('google_login', { tokenId }, null)

    dispatch({type: GLOBALTYPES.AUTH,payload: { token: res.data.access_token, user: res.data.user },});
    localStorage.setItem("firstlogin", true);

    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });

  } catch (error) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
  }
}

export const logout = () => async (dispatch) => {
  try {
    
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      await postDataAPI('logout');
      localStorage.removeItem("firstlogin");
      localStorage.removeItem('palettemode')
      localStorage.removeItem('palettecolor')
      localStorage.removeItem('paletteborderradius')
      localStorage.removeItem('palettefont')
      localStorage.removeItem('palettefontsize')
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

      window.location.href = "/";      
      

  } catch (error) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
  }
}

