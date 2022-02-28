import { getDataAPI, patchDataAPI } from "../../utils/fetchData"
import { ImageUpload } from "../../utils/imageUpload";
import { DeleteData, GLOBALTYPES } from "./globalTypes";

export const PROFILE_TYPES = {
    LOADING: "LOADING",
    GET_USER: "GET_USER",
    FOLLOW: "FOLLOW",
    UNFOLLOW: "UNFOLLOW",
    GET_ID: 'GET_PROFILE_ID',
    GET_POSTS: 'GET_PROFILE_POSTS',
    UPDATE_POST: 'UPDATE_PROFILE_POST'
}

export const getProfileUsers = ({ id, auth }) => async (dispatch) => {
    dispatch({ type: PROFILE_TYPES.GET_ID, payload: id })

    try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: true })
        const users = await getDataAPI(`/user/${id}`, auth.token)
        const posts = await getDataAPI(`/user_posts/${id}`, auth.token)
        dispatch({ type: PROFILE_TYPES.GET_USER, payload: users.data })
        dispatch({ type: PROFILE_TYPES.GET_POSTS, payload: { ...posts.data, _id: id, page: 2 } })

        dispatch({ type: PROFILE_TYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg }})
    }

}
export const updateUserProfile = ({ userData, profileImage, coverImage, auth }) => async (dispatch) => {

    if (!userData.fullname)
        return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Please add your Fullname" } })

    if (userData.fullname.length > 25)
        return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Your FullName is too long" } })

    if (userData.about.length > 1000)
        return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Story must be smaller than 1000 characters" } })

    try {
        let profile, cover;
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        if (profileImage) profile = await ImageUpload([profileImage])
        if (coverImage) cover = await ImageUpload([coverImage])

        const res = await patchDataAPI("/update_user", {
            ...userData,
            profileImage: profileImage ? profile[0].url : auth.user.profileImage,
            coverImage: coverImage ? cover[0].url : auth.user.coverImage,
        }, auth.token)

        dispatch({
            type: GLOBALTYPES.AUTH, payload: {
                ...auth, user: {
                    ...auth.user, ...userData,
                    profileImage: profileImage ? profile[0].url : auth.user.profileImage,
                    coverImage: coverImage ? cover[0].url : auth.user.coverImage,
                }
            }
        })
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })

    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.res.data.msg } })


    }

}
export const follow = ({ user, auth }) => async (dispatch) => {
    let newUser = { ...user, followers: [...user.followers, auth.user] }

    dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser })
    
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: { ...auth.user, following: [...auth.user.following, newUser] } } })

    try {
        await patchDataAPI(`user/${user._id}/follow`, null, auth.token)

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: "user followed" } })
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })

    }
}
export const Unfollow = ({ user, auth }) => async (dispatch) => {
    let newUser = { ...user, followers: DeleteData(user.followers, auth.user._id) }
    dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: newUser })

    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: { ...auth.user, following: DeleteData(auth.user.following, newUser._id) } } })
    try {
        await patchDataAPI(`user/${user._id}/unfollow`, null, auth.token)
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: "user unfollowed" } })
    } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })

    }
}

