import { GLOBALTYPES } from './globalTypes'
import { postDataAPI, deleteDataAPI } from '../../utils/fetchData'
import { ImageUpload } from "../../utils/imageUpload";


export const createStory = ({ media, auth }) => async (dispatch) => {

    if (!media)
        return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "An Image is Required" } })

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        const mediaFile = await ImageUpload([media])

        dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: { ...auth.user, story: mediaFile[0].url } } })
        
        const res = await postDataAPI('story/create', { media: mediaFile[0].url }, auth.token)
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
        
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const deleteStory = (auth) => async (dispatch) => {
    
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: { ...auth.user, story: "" } } })
        
        const res = await deleteDataAPI(`story/delete/${auth.user._id}`,  auth.token)
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
        
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}