import React from 'react'
import hoverSound from '../../sound/hover.wav';
import clickSound from '../../sound/click.wav';
import "./Footer.scss"

const Footer = () => {
    const playOnHover = () => new Audio(hoverSound).play()
    const playOnClick = () => new Audio(clickSound).play()
    return (
        <div className='footer'>
            <ul className={'nav'}>
                <li
                    className={'nav__item'}
                    onMouseEnter={() => playOnHover()}
                    onClick={() => playOnClick()}
                >
                    <a href={'/#'} className={'nav__link'}>Find your dream home</a>
                </li>
                <li
                    className={'nav__item'}
                    onMouseEnter={() => playOnHover()}
                    onClick={() => playOnClick()}
                >
                    <a href={'/#'} className={'nav__link'}>Request proposal</a>
                </li>
                <li
                    className={'nav__item'}
                    onMouseEnter={() => playOnHover()}
                    onClick={() => playOnClick()}
                >
                    <a href={'/#'} className={'nav__link'}>Download home planner</a>
                </li>
                <li
                    className={'nav__item'}
                    onMouseEnter={() => playOnHover()}
                    onClick={() => playOnClick()}
                >
                    <a href={'/#'} className={'nav__link'}>Contact me</a>
                </li>
                <li
                    className={'nav__item'}
                    onMouseEnter={() => playOnHover()}
                    onClick={() => playOnClick()}
                >
                    <a href={'/#'} className={'nav__link'}>Submit your resume</a>
                </li>
                <li
                    className={'nav__item'}
                    onMouseEnter={() => playOnHover()}
                    onClick={() => playOnClick()}
                >
                    <a href={'/#'} className={'nav__link'}>Hire me</a>
                </li>
            </ul>

            <p className={'copyright'}>
                &copy; Copyright 2017 by Jonas Schmedtmann, Course Learnt By
                <a
                    href={'https://github.com/lazizbekdev'}
                    rel="noreferrer"
                    onClick={() => playOnClick()}
                    target={'_blank'}> LazizbekDev
                </a>
            </p>
        </div>
    )
}

export default Footer