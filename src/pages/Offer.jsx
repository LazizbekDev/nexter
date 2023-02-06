import {useEffect, useState} from 'react';
import { collection, getDocs, query, where, orderBy, limit, startAfter, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import{ db} from "../firebase.config";
import Sidebar from "../components/sidebar/Sidebar";
import ListingItem from "./listings/ListingItem";
import {useNavigate} from "react-router-dom";
import loader from "../img/loader.gif"

const Offer = () => {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastFetched, setLastFetched] = useState(null)
    const [opened, setOpened] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const listingsRef = collection(db, 'listings');

                const q = query(
                    listingsRef,
                    where("offer", "==", true),
                    orderBy('timestemp', 'desc'),
                    limit(10)
                )

                const querySnap = await getDocs(q);
                const lastVisible = querySnap.docs[querySnap.docs.length - 1];
                setLastFetched(lastVisible)
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

    const onDelete = async (id) => {
        if (window.confirm('Are u sure to delete')) {
            await deleteDoc(doc(db, 'listings', id))

            const updatedListings = listings.filter(listing => {
                return listing.id !== id
            });

            setListings(updatedListings)
        }
    }
    const loadMore = async () => {
        try {
            const listingsRef = collection(db, 'listings');

            const q = query(
                listingsRef,
                where("offer", "==", true),
                orderBy('timestemp', 'desc'),
                startAfter(lastFetched),
                limit(10)
            )

            const querySnap = await getDocs(q);

            const lastVisible = querySnap.docs[querySnap.docs.length - 1];
            setLastFetched(lastVisible)

            const listings = [];

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            setListings((prevState) => [...prevState, ...listings]);
            setLoading(false)
        } catch (err) {
            toast.error('Could not fetch listings')
        }
    }


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
                    <h2 style={{background: "#101d2c"}} className={'heading-2 btn'}>Place for Offers</h2>
                </div>

                <div>
                    {loading ? <div className={'center'}>
                        <div className={'center-asset'}>
                            <img
                                src={loader}
                                alt={'loader'}
                                width={120}
                            />
                        </div>
                    </div> : listings &&
                    listings.length > 0 ? (
                        <>
                            <main>
                                <ul className={'categoryListings'}>
                                    {listings.map((listing) => (
                                        <ListingItem
                                            listing={listing.data}
                                            id={listing.id}
                                            key={listing.id}
                                            onDelete={() => onDelete(listing.id)}
                                            onEdit={() => navigate(`/edit-listing/${listing.id}`)}
                                        />
                                    ))}
                                </ul>


                            </main>

                            <br/>
                            <br/>

                            {loadMore && listings.length >= 5 && (
                                <p className={'loadMore'} onClick={loadMore}>Load More</p>
                            )}
                        </>
                    ) : (
                        <div className={'center'}>
                            <div className={'center-asset'}>
                                <h2 className={'heading-2'}>No Offers found</h2>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Offer;