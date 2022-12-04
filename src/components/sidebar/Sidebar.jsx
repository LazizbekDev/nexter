import React from 'react'
import "./Sidebar.scss";
import {VscMenu, VscChromeClose} from "react-icons/vsc"
import clickSound from "../../sound/click.wav";
import { motion } from "framer-motion";

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
        </div>
    )
}

export default Sidebar