import { Route, Redirect } from "react-router-dom"

const PrivateRouter = (props) => {
    const firstLogin = localStorage.getItem("firstlogin")
    return firstLogin ? <Route {...props} /> : <Redirect to="/" />
}

export default PrivateRouter