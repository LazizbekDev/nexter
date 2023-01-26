import React from 'react'
import {VscMenu, VscChromeClose} from "react-icons/vsc"
import clickSound from "../../sound/click.wav";
import { motion } from "framer-motion";
import {Link} from "react-router-dom";
import { getAuth } from "firebase/auth";
// import {Sidebar} from "react-pro-sidebar";
import "./Sidebar.scss";

const Sidebar = ({onClick, className, mb}) => {
    const playOnClick = () => new Audio(clickSound).play();
    const auth = getAuth();

    return (
        <div className={`sidebar ${mb}`}>
            <div className={`nav-btn ${className}`} onClick={onClick}>
                {className !== 'sidebar-btn' ? (
                    <VscMenu
                        size={'4rem'}
                        onClick={playOnClick}
                        style={{cursor: "pointer"}}
                    />
                ) : (
                    <VscChromeClose
                        size={'4rem'}
                        onClick={playOnClick}
                        style={{cursor: "pointer"}}
                    />
                )}
            </div>
            <motion.ul
                className={`navigation ${className === 'sidebar-btn' && 'navigation__open'}`}
            >
                <li>
                    <a className={'heading-2'} href={'https://lazizbe.uz'}>Resume</a>
                </li>
                <li>
                    <Link
                        to={'/category'}
                        className={'heading-2'}>Category
                    </Link>
                </li>
                <li>
                    <Link
                        to={'/offers'}
                        className={'heading-2'}>Offers
                    </Link>
                </li>
                {!auth.currentUser ? (
                    <li>
                        <Link to={'/login'} className={'heading-2'} href={'https://github.com/lazizbekdev'}>Login</Link>
                    </li>
                ) : (
                    <li>
                        <Link
                            to={'/profile'}
                            className={'heading-2'}
                            href={'https://github.com/lazizbekdev'}
                        >Profile</Link>
                    </li>
                )}
            </motion.ul>
        </div>
    )
}

export default Sidebar