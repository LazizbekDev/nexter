import React from 'react'
import "./Sidebar.scss";
import { VscMenu, VscChromeClose } from "react-icons/vsc"

const Sidebar = ({onClick, className}) => {
  return (
    <div className='sidebar'>
      <button className={`nav-btn ${className}`} onClick={onClick}>
          {className !== 'sidebar-btn' ? <VscMenu size={'4rem'} /> : <VscChromeClose size={'4rem'} />}
      </button>
    </div>
  )
}

export default Sidebar