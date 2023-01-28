import { useState, useEffect } from 'react';
import { useNavigate, useParams} from "react-router-dom";
// import { getAuth } from "firebase/auth";
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
    // const auth = getAuth();

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

            <main>
                <div style={{display: 'flex', alignItems: "baseline", justifyContent: "space-between"}}>
                    {loading ? <h2 className={'heading-2'}>Loading...</h2> : (<>
                        <h2 className={'heading-2'}>{listing.name}</h2>
                    </>)}
                    <div className={'shareIconDiv'} onClick={shareToFriends}>
                        <IoMdShareAlt size={'2rem'} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Listing;