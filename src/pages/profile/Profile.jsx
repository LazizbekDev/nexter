import {useEffect, useState} from 'react';
import {getAuth, updateProfile} from "firebase/auth";
import {doc, updateDoc, collection, query, getDocs, where, orderBy, deleteDoc} from "firebase/firestore";
import { db } from "../../firebase.config";
import Sidebar from "../../components/sidebar/Sidebar";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import { BsChevronDoubleRight } from "react-icons/bs"
import ListingItem from "../listings/ListingItem";

const Profile = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [changeDetails, setChangeDetails] = useState(false)
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true)

    // eslint-disable-next-line no-unused-vars
    const [formData, setFormData] = useState({
        name: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email
    })

    const { name, email } = formData;

    useEffect(() => {
        const fetchListings = async () => {
            const listingsRef = collection(db, 'listings');

            const q = query(listingsRef,
                where('userRef', '==', auth.currentUser.uid),
                orderBy('timestemp', 'desc'));

            const querySnap = await getDocs(q);

            let listings = [];

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            setListings(listings);
            setLoading(false);
        }

        fetchListings().then(r => r);
    }, [auth.currentUser])

    const onLogout = () => {
        auth.signOut().then(() => navigate('/'));
    }

    const [opened, setOpened] = useState(false);

    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                await updateProfile(auth.currentUser, {
                    displayName: name
                })

                const userRef = await doc(db, 'users', auth.currentUser.uid);

                await updateDoc(userRef, {name})
            }
        } catch (err) {
            toast.error('Couldn\'t update profile details')
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onDelete = async (id) => {
        if (window.confirm('Are u sure to delete')) {
            await deleteDoc(doc(db, 'listings', id))

            const updatedListings = listings.filter(listing => {
                return listing.id !== id
            });

            setListings(updatedListings)
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
                <div style={{display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
                    <h2 className={'heading-3'} style={{fontSize: '4rem',marginLeft: '.5rem'}}>Profile</h2>
                    <button className={'btn'} onClick={onLogout}>Logout</button>
                </div>

                <div style={{display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
                    <div className={'profileCard'}>
                        <form>
                            <input
                                type={'text'}
                                id={'name'}
                                placeholder={"Name"}
                                disabled={!changeDetails}
                                value={name}
                                autoFocus={changeDetails}
                                onChange={onChange}
                                className={!changeDetails ? 'profileName' : 'profileNameActive'}
                            />
                            <input
                                type={'email'}
                                id={'email'}
                                placeholder={"email"}
                                disabled={!changeDetails}
                                value={email}
                                onChange={onChange}
                                className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                            />
                        </form>
                    </div>


                    <button className={'btn'} onClick={() => {
                        changeDetails && onSubmit();
                        setChangeDetails((prevState) => !prevState);
                    }}>
                        {changeDetails ? 'done' : 'change'}
                    </button>
                </div>

                {!loading && listings.length > 0 && (
                    <>
                        <h3
                            className={'heading-3'}
                            style={{fontSize: '3rem',marginLeft: '.5rem'}}>
                            Your listings
                        </h3>

                        <ul className={'categoryListings'}>
                            {listings.map(listing => (
                                <ListingItem
                                    key={listing.id}
                                    listing={listing.data}
                                    id={listing.id}
                                    onDelete={() => onDelete(listing.id)}
                                />
                            ))}
                        </ul>
                    </>
                )}

                <Link
                    to={'/create-listing'}
                    className={'btn'}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        backgroundColor: "#101d2c",
                        width: "max-content",
                        position: "absolute",
                        bottom: 0,
                        right: 0
                    }}
                >
                    Sell or rent your home <BsChevronDoubleRight size={'2rem'} />
                </Link>
            </div>
        </div>
    )
};

export default Profile;