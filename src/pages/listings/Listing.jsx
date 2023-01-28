import { useState, useEffect } from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"
import {db} from "../../firebase.config";
import Sidebar from "../../components/sidebar/Sidebar";
import {IoMdShareAlt} from "react-icons/io";
import {toast} from "react-toastify";

const Listing = () => {
    const [loading, setLoading] = useState(true);
    const [listing, setListing] = useState(null);
    // const [shareLinkCopied, setShareLinkCopied] = useState(null);
    const [opened, setOpened] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const userRef = getAuth();

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.id);
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                console.log(docSnap.data());
                setListing(docSnap.data());
                setLoading(false);
            }
        }

        fetchListing();
    }, [navigate, params.id])

    const shareToFriends = async () => {
        const shareData = {
            title: listing.name,
            text: `House for ${listing.type} in ${listing.location}. \n ${listing.bedrooms} bed rooms and ${listing.bathrooms} bath rooms`,
            url: window.location.href
        }

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                toast.success('Thanks for sharing');
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                toast.success('Link copied to clipboard')
            } catch (err) {
                toast.error('Something went to wrong ')
            }
        }
    }

    return (
        <div className={`container-page ${opened && 'sidebar-open'}`}>
            <Sidebar
                className={`${opened && 'sidebar-btn'}`}
                mb={`${opened ? 'sidebar-open' : 'sidebar-close'}`}
                onClick={() => opened ? setOpened(false) : setOpened(true)}
            />

            <main style={{padding: "0 7rem"}}>
                <div>
                    {loading ? <h2 className={'heading-2'}>Loading...</h2> : (<>
                        <div className={'listingDetails'}>
                            <p className={'listingName heading-3'}>
                                {listing.name} - {listing.offer ?
                                listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') :
                                listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            } So'm
                            </p>
                            <p className={'listingLocation heading-2'}>{listing.location}</p>
                            <p className={'listingType'}>For {listing.type}</p>
                            {listing.offer && <p className={'discountPrice'}>
                                {(listing.regularPrice - listing.discountedPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Discount
                            </p> }
                            <ul className={'listingDetailsList heading-3'}>
                                <li>
                                    {listing.bedrooms > 1 ? `${listing.bedrooms} ta yotoq xona`
                                        : '1 ta yotoq xono'}
                                </li>
                                <li>
                                    {listing.bathrooms > 1 ? `${listing.bathrooms} ta yuvunish xonasi`
                                        : '1 ta yuvunish xonasi'}
                                </li>
                                <li>{listing.parking && "Parking spot"}</li>
                                <li>{listing.furnished && "Furnished"}</li>
                            </ul>
                            <p className={'listingLocationTitle'}>Location</p>

                            {userRef.currentUser?.uid !== listing.userRef && (
                                <Link to={`/contact/${listing.userRef}?listingName=${listing.name}&listingLocation=${listing.location}`} className={'btn'}>
                                    Contact landloard
                                </Link>
                            )}
                            <button className={'shareIconDiv'} onClick={shareToFriends}>
                                <IoMdShareAlt size={'4rem'} />
                            </button>
                        </div>
                    </>)}
                </div>
            </main>
        </div>
    );
};

export default Listing;