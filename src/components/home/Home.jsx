import React from 'react'
import {data} from './homeData';

import "./_Home.scss";
import HomeItem from './HomeItem';

const HomeComponent = () => {
    return (
        <div className='homes'>

            {data.map((house, index) => (
                <HomeItem
                    key={house.img}
                    delay={`0.${index + 1}`}
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

export default HomeComponent