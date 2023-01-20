import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { toast } from "react-toastify";
import{ db } from "../firebase.config";
import Sidebar from "../components/sidebar/Sidebar";

const Category = () => {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [opened, setOpened] = useState(false);


    const params = useParams();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const listingsRef = collection(db, 'listings');

                const q = query(
                    listingsRef,
                    where("type", "==", params.name),
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
    }, [params.name])

    return (
        <div className={`container-page ${opened && 'sidebar-open'}`}>
            <Sidebar
                className={`${opened && 'sidebar-btn'}`}
                mb={`${opened ? 'sidebar-open' : 'sidebar-close'}`}
                onClick={() => opened ? setOpened(false) : setOpened(true)}
            />

            <div>
                <div style={{
                    display: 'flex',
                    alignItems: "baseline",
                    justifyContent: "center",
                    marginTop: "2rem",
                    marginBottom: "2rem"
                }}>
                    <h2 style={{background: "#101d2c"}} className={'heading-2 btn'}>Place for {params.name}</h2>
                </div>

                <div>
                    {loading ? <h2 className={'heading-2'}>Loading...</h2> : listings &&
                    listings.length > 0 ? (
                        <main>
                            <ul>
                                {listings.map((listing) => (
                                    <h2 key={listing.id} className={'heading-2'}>{listing.data.name}</h2>
                                ))}
                            </ul>
                        </main>
                    ) : (
                        <h2 className={'heading-2'}>No listings found for {params.name}</h2>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Category;