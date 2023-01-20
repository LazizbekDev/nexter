import Home from "./pages/home/home";
import {Routes, Route} from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import {Login, SignUp} from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import ForgetPassword from "./components/ForgetPassword";
import Explore from "./pages/explore";
import Category from "./pages/Category";

function App() {

    return (
        <ProSidebarProvider>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/signup'} element={<SignUp/>}/>
                <Route path={'/category'} element={<Explore />}/>
                <Route path={'/category/:name'} element={<Category />}/>
                <Route path={'/profile'} element={<PrivateRoute />}>
                    <Route path={'/profile'} element={<Profile />} />
                </Route>
                <Route path={'/reset-password'} element={<ForgetPassword />} />
            </Routes>
            <ToastContainer />
        </ProSidebarProvider>
    );
}

export default App;
