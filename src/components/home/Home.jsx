import React from 'react'
// import { IoIosExpand, IoPricetagOutline } from 'react-icons/io'
import { data } from './homeData';

import "./_Home.scss";
import HomeItem from './HomeItem';

const Home = () => {
  console.log(data)
  return (
    <div className='homes'>

      {data.map(house => (
        <HomeItem
          img={house.img}
          name={house.name}
          location={house.location}
          area={house.area}
          room={house.room}
          price={house.price}
        />
      ))}
    </div>
  )
}

export default Home