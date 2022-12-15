import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const OAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>
            OR
            <p>Sign {location.pathname === '/login' ? "in" : "up"} with</p>
            <button>
                <FcGoogle />
            </button>
        </div>
    );
};

export default OAuth;