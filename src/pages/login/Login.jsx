import React from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import {auth, db} from "../../firebase.config";

export const Login = () => {

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email')
        const password = formData.get('password')

        const data = {
            email: email,
            password: password
        }

        console.table({data})
    }
    return (
        <div className={'login-body'}>
            <form className="screen-1" onSubmit={submitHandler}>
                <Icon />
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
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')

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
            console.log(err)
        }

    }
    return (
        <div className={'login-body'}>
            <form className="screen-1" onSubmit={submitHandler}>
                <Icon />
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

function Icon() {
    return (
        <svg className="logo" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width={300} height={300} viewBox="0 0 640 480" xmlSpace="preserve">
            <g transform="matrix(3.31 0 0 3.31 320.4 240.4)">
                <circle className={'login-icon'} style={{stroke: 'rgb(0, 0, 0)', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeDashoffset: 0, strokeLinejoin: 'miter', strokeMiterlimit: 4, fillRule: 'nonzero', opacity: 1}} cx={0} cy={0} r={40} />
            </g>
            <g transform="matrix(0.98 0 0 0.98 268.7 213.7)">
                <circle style={{stroke: 'rgb(0, 0, 0)', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeDashoffset: 0, strokeLinejoin: 'miter', strokeMiterlimit: 4, fill: 'rgb(255, 255, 255)', fillRule: 'nonzero', opacity: 1}} cx={0} cy={0} r={40} />
            </g>
            <g transform="matrix(1.01 0 0 1.01 362.9 210.9)">
                <circle style={{stroke: 'rgb(0, 0, 0)', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeDashoffset: 0, strokeLinejoin: 'miter', strokeMiterlimit: 4, fill: 'rgb(255, 255, 255)', fillRule: 'nonzero', opacity: 1}} cx={0} cy={0} r={40} />
            </g>
            <g transform="matrix(0.92 0 0 0.92 318.5 286.5)">
                <circle style={{stroke: 'rgb(0, 0, 0)', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeDashoffset: 0, strokeLinejoin: 'miter', strokeMiterlimit: 4, fill: 'rgb(255, 255, 255)', fillRule: 'nonzero', opacity: 1}} cx={0} cy={0} r={40} />
            </g>
            <g transform="matrix(0.16 -0.12 0.49 0.66 290.57 243.57)">
                <polygon style={{stroke: 'rgb(0, 0, 0)', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeDashoffset: 0, strokeLinejoin: 'miter', strokeMiterlimit: 4, fill: 'rgb(255, 255, 255)', fillRule: 'nonzero', opacity: 1}} points="-50,-50 -50,50 50,50 50,-50 " />
            </g>
            <g transform="matrix(0.16 0.1 -0.44 0.69 342.03 248.34)">
                <polygon style={{stroke: 'rgb(0, 0, 0)', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeDashoffset: 0, strokeLinejoin: 'miter', strokeMiterlimit: 4, fill: 'rgb(255, 255, 255)', fillRule: 'nonzero', opacity: 1}} vectorEffect="non-scaling-stroke" points="-50,-50 -50,50 50,50 50,-50 " />
            </g>
        </svg>
    )
}