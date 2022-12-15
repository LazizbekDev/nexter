import React, {useEffect} from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import {auth, db} from "../../firebase.config";
import {toast} from "react-toastify";
import logo from "../../img/logo.png"

export const Login = () => {

    const navigate = useNavigate();

    useEffect(() => {
        auth.currentUser && navigate('/profile')
    }, [auth.currentUser])
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

                <div className="login-footer">
                    <Link to={'/signup'}>Sign up</Link>
                    <a href={'/#'}>Forgot Password?</a>
                </div>
            </form>
        </div>
    );
};

export const SignUp = () => {
    const navigate = useNavigate();

    useEffect(() => {
        auth.currentUser && navigate('/profile')
    }, [auth.currentUser])
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
                    type={'submit'}>Login
                </button>

                <div className="login-footer">
                    <Link to={'/login'}>Log in</Link>
                    <a href={'/#'}>Need help?</a>
                </div>
            </form>
        </div>
    );
}