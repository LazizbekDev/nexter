import React from 'react'
import story from "../../../img/story-1.jpeg";
import story2 from "../../../img/story-2.jpeg";
import { motion } from "framer-motion"

const Pics = () => {
  return (
    <div className='pics'>
      <motion.img
          initial={{y: "-100%", opacity: 0}}
          whileInView={{y: "0%", opacity: 1}}
          transition={{duration: 0.5}}
          src={story}
          className={"pics-img--1"} alt={"story 1"} />
      <motion.img
          initial={{x: "-100%", opacity: 0}}
          whileInView={{x: "0%", opacity: 1}}
          transition={{duration: 0.5}}
          src={story2} className={"pics-img--2"} alt={"story 2"} />
    </div>
  )
}

export default Pics