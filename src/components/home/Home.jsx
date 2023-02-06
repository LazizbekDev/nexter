import React, {useEffect, useState} from 'react'
import {
    collection,
    getDocs,
    query,
    orderBy,
    limit
} from "firebase/firestore";
import "./_Home.scss";
import HomeItem from './HomeItem';
import {db} from "../../firebase.config";
import {toast} from "react-toastify";

const HomeComponent = () => {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const listingsRef = collection(db, 'listings');

                const q = query(
                    listingsRef,
                    orderBy('timestemp', 'desc'),
                    limit(10)
                )

                const querySnap = await getDocs(q);

                const listings = [];

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setListings(listings);
                setLoading(false)
            } catch (err) {
                toast.error('Could not fetch listings')
            }
        }

        fetchListings();
    }, [])


    return (
        <div className='homes'>

            {!loading && listings.map((house, index) => (
                <HomeItem
                    key={index}
                    delay={`0.${index + 1}`}
                    img={house.data.imgUrls[0]}
                    name={house.data.name}
                    location={house.data.location}
                    area={house.area}
                    room={house.room}
                    price={house.data.regularPrice}
                    type={house.data.type}
                    id={house.id}
                    parking={house.data.parking}
                    furnished={house.data.furnished}
                />
            ))}
        </div>
    )
}

export default HomeComponent