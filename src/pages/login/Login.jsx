import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, getAuth} from "firebase/auth";
import {doc, serverTimestamp, setDoc} from "firebase/firestore";
import {Link, useNavigate} from "react-router-dom";
import "./login.scss";
import {db} from "../../firebase.config";
import {toast} from "react-toastify";
import logo from "../../img/logo.png"
import OAuth from "../../components/OAuth";

export const Login = () => {

    const navigate = useNavigate();
    const auth = getAuth()
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email')
        const password = formData.get('password')

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            if (userCredential.user) {
                navigate('/')
            }
        } catch (err) {
            toast.error('Bad user credentials')
        }
    }
    return (
        <div className={'login-body'}>
            <form className="screen-1" onSubmit={submitHandler}>
                <img src={logo} style={{ width: "50%", margin: "1rem auto" }} alt={"logo"} />

                <div className="input-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Username@gmail.com"
                    />
                </div>
                <div className="input-group">
                    <input
                        className="pas"
                        placeholder={"Password"}
                        type="password"
                        name="password"
                    />
                </div>

                <button
                    className="login"
                    type={'submit'}>Login
                </button>

                <div className={'google'}>
                    <OAuth />
                </div>

                <div className="login-footer">
                    <Link to={'/signup'}>Sign up</Link>
                    <Link to={'/reset-password'}>Forgot Password?</Link>
                </div>
            </form>
        </div>
    );
};

export const SignUp = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(auth.currentUser, {
                displayName: name
            })

            await setDoc(doc(db, 'users', user.uid), {
                name,
                email,
                timestamp: serverTimestamp()
            })

            navigate('/');
        } catch (err) {
            toast.error('Something went wrong with registration')
        }

    }
    return (
        <div className={'login-body'}>
            <form className="screen-1" onSubmit={submitHandler}>
                <img src={logo} style={{ width: "50%", margin: "1rem auto" }} alt={"logo"} />
                <div className="input-group">
                    <input
                        placeholder={"Name"}
                        type="text"
                        name="name"
                    />
                </div>
                <div className="input-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Username@gmail.com"
                    />
                </div>

                <div className="input-group">
                    <input
                        className="pas"
                        placeholder={"Password"}
                        type="password"
                        name="password"
                    />
                </div>

                <button
                    className="login"
                    type={'submit'}>Sign Up
                </button>

                <div className={'google'}>
                    <OAuth />
                </div>

                <div className="login-footer">
                    <Link to={'/login'}>Sign Up</Link>
                    <a href={'/#'}>Need help?</a>
                </div>
            </form>
        </div>
    );
}