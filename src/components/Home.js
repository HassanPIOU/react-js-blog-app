import React from "react";
import GoogleLogin from "react-google-login";
import {GOOGLE_CLIENTID} from '../config/index'
import {useDispatch,useSelector} from "react-redux";
import {selectSignedIn, setSignedIn, setUserData} from '../helpers/UserSlice'
import "../assets/css/style.css"
const Home = () => {

    const dispatch = useDispatch()
    const login = (response) => {
        dispatch(setSignedIn(true))
        dispatch(setUserData(response.profileObj))
    }

    const isSignedIn = useSelector(selectSignedIn)
    return (
        <div className="home" style={{display : isSignedIn ? "none" : ""}}>

            {!isSignedIn ?
            <div className="login_message">
                <h2>Welcome</h2>
                <p>
                    We provide high quality online resource for reading blogs. just sign up and start reading some quality blogs.
                </p>

                <GoogleLogin
                    clientId= {GOOGLE_CLIENTID}
                    render={renderProps => (
                        <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className="btn-login"
                        >Login with Google</button>
                    )}

                    onSuccess={login}
                    onFailure={login}
                    isSignedIn={true}
                    cookiePolicy={'single_host_origin'}
                />
            </div>  : ""
            }
        </div>
    )
}

export default Home