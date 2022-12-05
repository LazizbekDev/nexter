import {motion} from 'framer-motion'
import clickSound from "../../../sound/click.wav";

const Content = () => {
    const playOnClick = () => new Audio(clickSound).play()

  return (
    <div className='content'>
      <motion.h3
          initial={{x: "100%", opacity: 0}}
          whileInView={{x: "0%", opacity: 1}}
          transition={{duration: 0.5}}
          className="heading-3 mb-sm">Happy customers</motion.h3>
      <motion.h2
          initial={{y: "50%", opacity: 0}}
          whileInView={{y: "0%", opacity: 1}}
          transition={{duration: 0.5, delay: 0.3}}
          className="heading-2 heading-2--dark mb-md">&ldquo;The best decision of our lives&rdquo;</motion.h2>
      <motion.p
          initial={{y: "50%", opacity: 0}}
          whileInView={{y: "0%", opacity: 1}}
          transition={{duration: 0.5, delay: 0.5}}
          className="content_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vero reprehenderit id placeat maxime iste, suscipit delectus ipsum voluptatum! Harum.</motion.p>
      <motion.button
          onClick={playOnClick}
          initial={{y: "100%", opacity: 0}}
          whileInView={{y: "0%", opacity: 1}}
          transition={{duration: 0.5, delay: 0.2}}
          className="btn">Find your own home</motion.button>
    </div>
  )
}

export default Content