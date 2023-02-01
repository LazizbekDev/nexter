import { useState } from "react"
import { AiOutlineHeart, AiFillHeart, AiOutlineUser } from "react-icons/ai"
import { TfiGift } from "react-icons/tfi"
import { motion } from "framer-motion"
import clickSound from "../../sound/click.wav";
import {useNavigate} from "react-router-dom";
import {BiMap} from "react-icons/bi";

const HomeItem = (
    {
        img,
        room,
        price,
        location,
        name,
        delay,
        type,
        id,
        parking,
        furnished
    }) => {

    const [liked, setLiked] = useState(false)
    const navigate = useNavigate();

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
            <div className={'home_img_block'}>
                <img src={img} alt="house" className='home_img' />
            </div>
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
                <p>{location.substring(0, 12).concat('...')}</p>
            </div>

            <div className='home_rooms'>
                <AiOutlineUser />
                <p>{room} rooms</p>
            </div>

            <div className='home_area'>
                {!parking && !furnished ? '' : <TfiGift />}
                {parking ? "Parking" : furnished && "Furnished"}
            </div>

            <div className='home_price'>
                <p>${price} {type === 'rent' && ' / month'}</p>
            </div>

            <button
                onClick={() => {
                    new Audio(clickSound).play()
                    navigate(`/category/${type}/${id}`)
                }}
                className='cta btn home_btn'>View More</button>
        </motion.div>
    )
}

export default HomeItem