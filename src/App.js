import Home from "./pages/home/home";
import {Routes, Route} from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import {Login, SignUp} from "./pages/login/Login";

function App() {

    return (
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/signup'} element={<SignUp/>}/>
        </Routes>
    );
}

export default App;
