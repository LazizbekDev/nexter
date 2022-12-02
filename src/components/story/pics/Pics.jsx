import React from 'react'
import story from "../../../img/story-1.jpeg";
import story2 from "../../../img/story-2.jpeg";
import "./Pics.scss";

const Pics = () => {
  return (
    <div className='pics'>
      <img src={story} className={"pics-img--1"} alt={"story 1"} />
      <img src={story2} className={"pics-img--2"} alt={"story 2"} />
    </div>
  )
}

export default Pics