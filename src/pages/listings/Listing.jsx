import { useState, useEffect } from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"
import {db} from "../../firebase.config";
import Sidebar from "../../components/sidebar/Sidebar";
import {BsChevronDoubleRight} from "react-icons/bs";

const Listing = () => {
    const [loading, setLoading] = useState(true);
    const [listing, setListing] = useState(null);
    const [shareLinkCopied, setShareLinkCopied] = useState(null);
    const [opened, setOpened] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const auth = getAuth();

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

    return (
        <div className={`container-page ${opened && 'sidebar-open'}`}>
            <Sidebar
                className={`${opened && 'sidebar-btn'}`}
                mb={`${opened ? 'sidebar-open' : 'sidebar-close'}`}
                onClick={() => opened ? setOpened(false) : setOpened(true)}
            />

            <div>
                <div style={{display: 'flex', alignItems: "baseline", justifyContent: "space-between"}}>
                    {loading ? <h2 className={'heading-2'}>Loading...</h2> : (<>
                        <h2 className={'heading-2'}>{listing.name}</h2>
                    </>)}
                </div>
            </div>
        </div>
    );
};

export default Listing;