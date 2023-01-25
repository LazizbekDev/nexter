import { useState } from 'react';
import {getAuth, updateProfile} from "firebase/auth";
import {doc, updateDoc} from "firebase/firestore";
import { db } from "../../firebase.config";
import Sidebar from "../../components/sidebar/Sidebar";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import { BsChevronDoubleRight } from "react-icons/bs"

const Profile = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [changeDetails, setChangeDetails] = useState(false)

    // eslint-disable-next-line no-unused-vars
    const [formData, setFormData] = useState({
        name: auth?.currentUser?.displayName,
        email: auth?.currentUser?.email
    })

    const { name, email } = formData;

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
    return (
        <div className={`container-page ${opened && 'sidebar-open'}`}>
            <Sidebar
                className={`${opened && 'sidebar-btn'}`}
                mb={`${opened ? 'sidebar-open' : 'sidebar-close'}`}
                onClick={() => opened ? setOpened(false) : setOpened(true)}
            />

            <div>
                <div style={{display: 'flex', alignItems: "baseline", justifyContent: "space-between"}}>
                    <h2 className={'heading-2'}>Profile</h2>
                    <button className={'btn'} onClick={onLogout}>Logout</button>
                </div>

                <div style={{display: 'flex', alignItems: "baseline", justifyContent: "space-between"}}>
                    <h2 className={'heading-2'}>Personal details</h2>
                    <button className={'btn'} onClick={() => {
                        changeDetails && onSubmit();
                        setChangeDetails((prevState) => !prevState);
                    }}>
                        {changeDetails ? 'done' : 'change'}
                    </button>
                </div>

                <div className={'profileCard'}>
                    <form>
                        <input
                            type={'text'}
                            id={'name'}
                            placeholder={"Name"}
                            disabled={!changeDetails}
                            value={name}
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