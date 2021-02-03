import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../helpers/UserSlice"

export default configureStore({
    reducer : {
        user :userReducer
    }
})