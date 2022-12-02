import { useState } from "react"
import { AiOutlineHeart, AiFillHeart, AiOutlineUser } from "react-icons/ai"
import { BiMap } from "react-icons/bi"

const HomeItem = ({ img, room, area, price, location, name }) => {

    const [liked, setLiked] = useState(false)

    return (
        <div className="home">
            <img src={img} alt="house" className='home_img' />
            <div onClick={() => {
                liked ? setLiked(false) : setLiked(true)
                console.log(liked)
            }}>
                {liked ? <AiFillHeart className="home_liked" size={'2rem'} /> : <AiOutlineHeart className='home_like' size={'2rem'} />}
            </div>
            <h5 className='home_name'>{name}</h5>
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

            <button className='cta'>Contact realtor</button>
        </div>
    )
}

export default HomeItem