import React from 'react'
import {data} from './homeData';

import "./_Home.scss";
import HomeItem from './HomeItem';

const Home = () => {
    return (
        <div className='homes'>

            {data.map(house => (
                <HomeItem
                    key={house.img}
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