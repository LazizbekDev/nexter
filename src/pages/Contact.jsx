import { useEffect, useState } from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Sidebar from "../components/sidebar/Sidebar";

const Contact = () => {
    const [message, setMessage] = useState('');
    const [landlord, setLandlord] = useState(null);
    const [searchParams] = useSearchParams();
    const [opened, setOpened] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const getLandlord = async () => {
            const docRef = doc(db, 'users', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setLandlord(docSnap.data());
            } else {
                toast.error('Could not get Landlord');
            }
        }

        getLandlord().then(r => r);
    }, [id])

    const onChange = (e) => {
        setMessage(e.target.value)
    }
    return (
        <div className={`container-page ${opened && 'sidebar-open'}`}>
            <Sidebar
                className={`${opened && 'sidebar-btn'}`}
                mb={`${opened ? 'sidebar-open' : 'sidebar-close'}`}
                onClick={() => opened ? setOpened(false) : setOpened(true)}
            />

            <div className={'pageContainer'}>
                <div className={'pageHeader'}>
                    <h2 className={'heading-1 heading-2--dark'}>Landlord</h2>
                </div>

                {landlord !== null && (
                    <main>
                        <div className={'contactLandlord'}>
                            <p className={'heading-3'}>{landlord?.name}</p>
                        </div>

                        <form className={'messageForm'}>
                            <div className={'messageDiv'}>
                                <label htmlFor={'message'} className={'messageLabel'}>Message</label>

                                <textarea
                                    cols={10}
                                    rows={2}
                                    name={'message'}
                                    value={message}
                                    onChange={onChange}
                                    maxLength={100}
                                    className={'textarea'}
                                    id={'message'}>
                                </textarea>
                            </div>
                            <a
                                className={'btn'}
                                target={'_top'}
                                href={`mailto:${landlord?.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
                                Send message
                            </a>
                        </form>
                    </main>
                )}
            </div>
        </div>
    );
};

export default Contact;