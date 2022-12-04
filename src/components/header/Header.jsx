import React from 'react'
import "./Header.scss";
import logo from '../../img/logo.png'
import bbc from '../../img/logo-bbc.png'
import forbes from '../../img/logo-forbes.png'
import tech from '../../img/logo-techcrunch.png'
import bi from '../../img/logo-bi.png'
import clickSound from "../../sound/click.wav";

const Header = () => {
    const playOnClick = () => new Audio(clickSound).play()

    return (
        <div className='header'>
            <img src={logo} alt={'project main logo'} className={'header__logo'}/>
            <h3 className={'heading-3 heading-3--dark'}>Your own home:</h3>
            <h1 className={'heading-1'}>The ultimate personal freedom</h1>
            <button className={'btn header__btn'} onClick={playOnClick}>View our properties</button>
            <div className={'header__seenon-text'}>As Seen on</div>
            <div className={'header__seenon-logos'}>
                <img src={bbc} alt={'project main logo'}/>
                <img src={forbes} alt={'project main logo'}/>
                <img src={tech} alt={'project main logo'}/>
                <img src={bi} alt={'project main logo'}/>
            </div>
        </div>
    )
}

export default Header