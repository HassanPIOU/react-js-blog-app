import React, { useState } from 'react';
import { selectSignedIn,
    selectUserData,
    setInput,
    setSignedIn,
    setUserData} from "../helpers/UserSlice";
import {useDispatch, useSelector} from "react-redux";
import {Avatar} from "@material-ui/core";
import {GOOGLE_CLIENTID} from "../config";
import {GoogleLogout} from "react-google-login";


const Header = () => {
    const [inputValue,setInputValue] = useState("coronavirus")
    const isSignedIn = useSelector(selectSignedIn)
    const userData = useSelector(selectUserData)
    const dispach = useDispatch()


    const handleClick = (e) => {
        e.preventDefault();
        dispach(setInput(inputValue));
    };

    const logout = (response) =>{
        dispach(setSignedIn(false))
        dispach(setUserData(null))
    }

    return (
        <div className="header">
              <h1 className="navbar_header">MyBlog   🙂</h1>
            {isSignedIn && (<div className="search">
                <input type="text" className="search_input" placeholder="search" value={inputValue} onChange={(e) => setInputValue(e.target.value) } />
                <button className="search_submit" onClick={handleClick}>Search</button>
            </div>)
            }

            {isSignedIn && (<div className="userData">
                <Avatar  className="user" src={userData?.imageUrl} alt={userData?.name} />
                <h1 className="signIn">{userData?.givenName}</h1>
                <GoogleLogout
                    clientId = {GOOGLE_CLIENTID}
                    render={renderProps => (
                        <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className="btn-logout"
                        >Logout 😧</button>
                    )}
                    onLogoutSuccess={logout}

                />
            </div>)}
        </div>
    )
}


export default Header