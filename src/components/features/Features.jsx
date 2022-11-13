import React from 'react'
import "./_Features.scss";
import svg from "../../img/sprite.svg"

const Features = () => {
  return (
    <div className='features'>
      <div className="feature">
        <svg className="feature_icon">
          <use xlinkHref={`${svg}#icon-global`} />
        </svg>
        <h4 className="heading-4">World's best luxury homes</h4>
        <p className="feature_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui molestiae voluptatem aliquid, asperiores incidunt odit!</p>
      </div>
      {/* 939103323  */}
      <div className="feature">
        <svg className="feature_icon">
          <use xlinkHref={`${svg}#icon-trophy`} />
        </svg>
        <h4 className="heading-4">Only the best preperties</h4>
        <p className="feature_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui molestiae voluptatem aliquid, asperiores incidunt odit!</p>
      </div>

      <div className="feature">
        <svg className="feature_icon">
          <use xlinkHref={`${svg}#icon-map-pin`} />
        </svg>
        <h4 className="heading-4">All home in top locations</h4>
        <p className="feature_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui molestiae voluptatem aliquid, asperiores incidunt odit!</p>
      </div>

      <div className="feature">
        <svg className="feature_icon">
          <use xlinkHref={`${svg}#icon-key`} />
        </svg>
        <h4 className="heading-4">New home in one week</h4>
        <p className="feature_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui molestiae voluptatem aliquid, asperiores incidunt odit!</p>
      </div>

      <div className="feature">
        <svg className="feature_icon">
          <use xlinkHref={`${svg}#icon-presentation`} />
        </svg>
        <h4 className="heading-4">Top 1% realtors</h4>
        <p className="feature_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui molestiae voluptatem aliquid, asperiores incidunt odit!</p>
      </div>

      <div className="feature">
        <svg className="feature_icon">
          <use xlinkHref={`${svg}#icon-lock`} />
        </svg>
        <h4 className="heading-4">Secure payment</h4>
        <p className="feature_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui molestiae voluptatem aliquid, asperiores incidunt odit!</p>
      </div>

    </div>
  )
}

export default Features