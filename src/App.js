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
import Category from "./pages/listings/Category";
import Offer from "./pages/Offer";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/listings/Listing";

function App() {

    return (
        <ProSidebarProvider>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/signup'} element={<SignUp/>}/>
                <Route path={'/category'} element={<Explore />}/>
                <Route path={'/category/:name'} element={<Category />}/>
                <Route path={'/offers'} element={<Offer />}/>
                <Route path={'/profile'} element={<PrivateRoute />}>
                    <Route path={'/profile'} element={<Profile />} />
                </Route>
                <Route path={'/reset-password'} element={<ForgetPassword />} />
                <Route path={'/create-listing'} element={<CreateListing />} />
                <Route path={'/category/:name/:id'} element={<Listing />} />
            </Routes>
            <ToastContainer />
        </ProSidebarProvider>
    );
}

export default App;
