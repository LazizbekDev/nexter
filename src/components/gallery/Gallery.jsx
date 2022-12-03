import React from 'react'
import gal1 from '../../img/gal-1.jpeg';
import gal2 from '../../img/gal-2.jpeg';
import gal3 from '../../img/gal-3.jpeg';
import gal4 from '../../img/gal-4.jpeg';
import "./gallery.scss";

const Gallery = () => {
  return (
    <div className='gallery'>
        <figure className={'gallery__item gallery__item--1'}>
            <img src={gal1} alt={'gal.jpeg'} className={'gallery__img'} />
        </figure>
        <figure className={'gallery__item gallery__item--2'}>
            <img src={gal2} alt={'gal.jpeg'} className={'gallery__img'} />
        </figure>
        <figure className={'gallery__item gallery__item--3'}>
            <img src={gal3} alt={'gal.jpeg'} className={'gallery__img'} />
        </figure>
        <figure className={'gallery__item gallery__item--4'}>
            <img src={gal4} alt={'gal.jpeg'} className={'gallery__img'} />
        </figure>
    </div>
  )
}

export default Gallery