import { useState } from "react"
import { AiOutlineHeart, AiFillHeart, AiOutlineUser } from "react-icons/ai"
import { BiMap } from "react-icons/bi"
import { motion } from "framer-motion"
import clickSound from "../../sound/click.wav";

const HomeItem = ({ img, room, area, price, location, name, delay }) => {

    const [liked, setLiked] = useState(false)

    const clickToLike = () => {
        liked ? setLiked(false) : setLiked(true)
        new Audio(clickSound).play();
    }

    return (
        <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 0.4, delay: delay}}
            className="home">
            <img src={img} alt="house" className='home_img' />
            <div className="like" onClick={clickToLike}>
                {liked ? <AiFillHeart className="home_liked" size={'2rem'} /> : <AiOutlineHeart className='home_like' size={'2rem'} />}
            </div>
            <motion.h5
                initial={{y: "150%",opacity: 0}}
                whileInView={{y: "-50%", opacity: 1}}
                transition={{duration: 0.4}}
                className='home_name'>{name}</motion.h5>
            <div className='home_location'>
                <BiMap />
                <p>{location}</p>
            </div>

            <div className='home_rooms'>
                <AiOutlineUser />
                <p>{room} rooms</p>
            </div>

            <div className='home_area'>
                <BiMap />
                <p>{area} m<sup>2</sup></p>
            </div>

            <div className='home_price'>
                <BiMap />
                <p>{price} so'm</p>
            </div>

            <motion.button
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 0.4}}
                onClick={() => new Audio(clickSound).play()}
                className='cta btn home_btn'>Contact realtor</motion.button>
        </motion.div>
    )
}

export default HomeItem