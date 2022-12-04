import React from 'react'
import realtor1 from "../../img/realtor-1.jpeg"
import realtor2 from "../../img/realtor-2.jpeg"
import realtor3 from "../../img/realtor-3.jpeg"
import RealtorsList from "./RealtorsList";
import "./Realtors.scss"

const Realtors = () => {

    const data = [
        {
            img: realtor1,
            name: "mern.me",
            sold: 329
        },
        {
            img: realtor2,
            name: "muslim.bro",
            sold: 247
        },
        {
            img: realtor3,
            name: "just.ibrohim",
            sold: 218
        },
    ]

    return (
        <div className='realtors'>
            <h3 className={'heading-3'}>Top 3 realtors</h3>

            <div className={'realtors__list'}>
                {data.map((realtor) => (
                    <RealtorsList
                        key={realtor.img}
                        img={realtor.img}
                        name={realtor.name}
                        sold={realtor.sold}
                    />
                ))}
            </div>
        </div>
    )
}

export default Realtors