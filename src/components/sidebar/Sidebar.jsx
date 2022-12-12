import React from 'react'
import "./Sidebar.scss";
import {VscMenu, VscChromeClose} from "react-icons/vsc"
import clickSound from "../../sound/click.wav";
import { motion } from "framer-motion";
import {Link} from "react-router-dom";

const Sidebar = ({onClick, className, mb}) => {

    const playOnClick = () => new Audio(clickSound).play()
    return (
        <div className={`sidebar ${mb}`}>
            <motion.button
                initial={{x: "-100%", opacity: 0}}
                animate={{x: "0%", opacity: 1}}
                transition={{duration: 0.5, delay: 0.3}}
                className={`nav-btn ${className}`} onClick={onClick}>
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
            </motion.button>
            <motion.ul
                className={`navigation ${className === 'sidebar-btn' && 'navigation__open'}`}
            >
                <li>
                    <a className={'heading-2'} href={'https://lazizbe.uz'}>Resume</a>
                </li>
                <li>
                    <a className={'heading-2'} href={'https://github.com/lazizbekdev'}>Github</a>
                </li>
                <li>
                    <Link to={'/login'} className={'heading-2'} href={'https://github.com/lazizbekdev'}>Login</Link>
                </li>
            </motion.ul>
        </div>
    )
}

export default Sidebar