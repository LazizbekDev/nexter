import React from 'react'
import "./Header.scss";
import logo from '../../img/logo.png'
import bbc from '../../img/logo-bbc.png'
import forbes from '../../img/logo-forbes.png'
import tech from '../../img/logo-techcrunch.png'
import bi from '../../img/logo-bi.png'
import clickSound from "../../sound/click.wav";
import {motion} from "framer-motion";

const Header = () => {
    const playOnClick = () => new Audio(clickSound).play()

    return (
        <div className='header'>
            <motion.img
                src={logo}
                alt={'project main logo'}
                className={'header__logo'}
                initial={{x: "-100%", opacity: 0}}
                whileInView={{x: "0%", opacity: 1}}
                transition={{duration: 0.5}}
            />
            <motion.div
                initial={{x: "-100%", opacity: 0}}
                whileInView={{x: "0%", opacity: 1}}
                transition={{duration: 0.5, delay: 0.3}}
            >
                <h3 className={'heading-3 heading-3--dark'}>Your own home:</h3>
            </motion.div>
            <motion.h1
                initial={{x: "-100%", opacity: 0}}
                whileInView={{x: "0%", opacity: 1}}
                transition={{duration: 0.5, delay: 0.4}}
                className={'heading-1'}>The ultimate personal freedom</motion.h1>
            <motion.button
                className={'btn header__btn'}
                initial={{x: "-100%", opacity: 0}}
                whileInView={{x: "0%", opacity: 1}}
                transition={{duration: 0.3, delay: 0.4}}
                onClick={playOnClick}>View our properties</motion.button>

            <motion.div
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 0.5, delay: 0.4}}
                className={'header__seenon-text'}>As Seen on
            </motion.div>

            <div className={'header__seenon-logos'}>
                <motion.img
                    src={bbc}
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.5}}
                    alt={'project main logo'}/>
                <motion.img
                    src={forbes}
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.6}}
                    alt={'project main logo'}/>
                <motion.img
                    src={tech}
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.7}}
                    alt={'project main logo'}/>
                <motion.img
                    src={bi}
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.8}}
                    alt={'project main logo'}/>
            </div>
        </div>
    )
}

export default Header