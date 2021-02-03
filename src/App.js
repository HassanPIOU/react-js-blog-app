import React from "react";
import Home from './components/Home'
import './assets/css/app.css'
import Header from "./components/Header";
import {useSelector} from "react-redux";
import {selectSignedIn} from "./helpers/UserSlice";
import Blog from "./components/Blog";
function App() {

    const isSignedIn = useSelector(selectSignedIn)

  return (
    <div className="App">
        <Header />
        <Home />
        {isSignedIn && <Blog />}
    </div>
  );
}

export default App;
