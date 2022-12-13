import { useEffect, useState } from 'react';
import {getAuth} from "firebase/auth";
// import { auth } from "../../firebase.config";

const Profile = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth();

    useEffect(() => {
        setUser(auth.currentUser)
    },[auth.currentUser])
    return user ? <h1>{user.displayName}</h1> : "Not logged in"
};

export default Profile;