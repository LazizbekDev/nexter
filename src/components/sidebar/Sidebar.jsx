import React from 'react'
import "./Sidebar.scss";
import {VscMenu, VscChromeClose} from "react-icons/vsc"
import clickSound from "../../sound/click.wav";

const Sidebar = ({onClick, className}) => {

    const playOnClick = () => new Audio(clickSound).play()
    return (
        <div className='sidebar'>
            <button className={`nav-btn ${className}`} onClick={onClick}>
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
            </button>
        </div>
    )
}

export default Sidebar