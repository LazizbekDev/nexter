import {useState, useEffect, useRef} from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"
import { db } from "../firebase.config";

const CreateListing = () => {

    const auth = getAuth();
    const navigate = useNavigate();
    const isMounted = useRef(true);
    // eslint-disable-next-line no-unused-vars
    const [geoEnabled] = useState(true);
    const [loading, setLoading] = useState(false)


    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0,
    })

    const {
        type,
        name,
        bedrooms,
        bathrooms,
        parking,
        furnished,
        address,
        offer,
        regularPrice,
        discountedPrice,
        images,
        latitude,
        longitude,
    } = formData

    useEffect(() => {

        if(isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({...formData, userRef: user.uid})
                } else {
                    navigate('/login')
                }
            })
        }

        return () => {
            isMounted.current = false
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    const onSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (discountedPrice > regularPrice) {
            setLoading(false);
            toast.error('Discounted price needs to be less than regular price');
            return
        }

        if (images.length > 6) {
            setLoading(false);
            toast.error('Max 6 images');
            return
        }

        let geoLocation = {};
        let location

        if (geoEnabled) {
            const response = await fetch(`http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_GEOCODE_API}&query=${address}`);
            const data = await response.json();
            

            if (data?.data?.length === 0) {
                setLoading(false);
                toast.error('Please enter correct address')
                return
            }

            geoLocation.lat = data.data[0]?.latitude ?? 0
            geoLocation.lng = data.data[0]?.longitude ?? 0
            location = data.data[0].street ? `${data.data[0].label}, ${data.data[0].street}` : data.data[0].label

            console.log(data)

            if (location === undefined || location.includes('undefined')) {
                setLoading(false);
                toast.error('Please enter correct address')
                return
            }

        } else {
            geoLocation.lat = latitude
            geoLocation.lng = longitude;
        }

        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage()
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

                const storageRef = ref(storage, 'images/' + fileName)

                const uploadTask = uploadBytesResumable(storageRef, image)

                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                            default:
                                break;
                        }
                    },
                    (error) => {
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                reject('User doesn\'t have permission to access the object')
                                break;
                            case 'storage/canceled':
                                // User canceled the upload
                                reject('User canceled the upload')
                                break;
                            // ...

                            case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                                reject('Unknown error occurred, inspect error.serverResponse')
                                break;

                            default:
                                reject('default error')
                        }
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }
                );
            })
        }

        const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
        ).catch((err) => {
            setLoading(false)
            toast.error(err)
            console.log(err)
        })

        const dataCopy = {
            ...formData,
            imgUrls,
            geoLocation,
            timestemp: serverTimestamp()
        }

        dataCopy.location = location
        delete dataCopy.images
        delete dataCopy.address
        !dataCopy.offer && delete dataCopy.discountedPrice;

        const docRef = await addDoc(collection(db, 'listings'), dataCopy)

        console.log(location)
        setLoading(false)
        toast.success('Listing saved')
        navigate(`/category/${dataCopy.type}/${docRef.id}`)
    }

    const onMutate = (e) => {
        let boolean = null;

        if (e.target.value === 'true') {
            boolean = true
        }
        if (e.target.value === 'false') {
            boolean = false
        }
        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }))
        }
        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value
            }))
        }
    }

    if (loading) {
        return (
            <h2 className={'heading-2'}>Loading...</h2>
        )
    }

    return (
        <div className='profile'>
            <header>
                <p className='pageHeader'>Create a Listing</p>
            </header>

            <main>
                <form className={'listingForm'} onSubmit={onSubmit}>
                    <div className={'formGroup'}>
                        <label className='formLabel'>Sell / Rent</label>
                        <div className='formButtons'>
                            <button
                                type='button'
                                className={type === 'sale' ? 'formButtonActive' : 'formButton'}
                                id='type'
                                value='sale'
                                onClick={onMutate}
                            >
                                Sell
                            </button>
                            <button
                                type='button'
                                className={type === 'rent' ? 'formButtonActive' : 'formButton'}
                                id='type'
                                value='rent'
                                onClick={onMutate}
                            >
                                Rent
                            </button>
                        </div>
                    </div>

                    <div className={'formGroup'}>
                        <label className='formLabel'>Name</label>
                        <input
                            className='formInputName'
                            type='text'
                            id='name'
                            value={name}
                            onChange={onMutate}
                            maxLength='32'
                            minLength='10'
                            required
                        />
                    </div>

                    <div className='formRooms flex formGroup'>
                        <div>
                            <label className='formLabel'>Bedrooms </label>
                            <input
                                className='formInputSmall'
                                type='number'
                                id='bedrooms'
                                value={bedrooms}
                                onChange={onMutate}
                                min='1'
                                max='50'
                                required
                            />
                        </div>
                        <div>
                            <label className='formLabel'> Bathrooms</label>
                            <input
                                className='formInputSmall'
                                type='number'
                                id='bathrooms'
                                value={bathrooms}
                                onChange={onMutate}
                                min='1'
                                max='50'
                                required
                            />
                        </div>
                    </div>

                    <div className={'formGroup'}>
                        <label className='formLabel'>Parking spot</label>
                        <div className='formButtons'>
                            <button
                                className={parking ? 'formButtonActive' : 'formButton'}
                                type='button'
                                id='parking'
                                value={true}
                                onClick={onMutate}
                                min='1'
                                max='50'
                            >
                                Yes
                            </button>
                            <button
                                className={
                                    !parking && parking !== null ? 'formButtonActive' : 'formButton'
                                }
                                type='button'
                                id='parking'
                                value={false}
                                onClick={onMutate}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    <div className={'formGroup'}>
                        <label className='formLabel'>Furnished</label>
                        <div className='formButtons'>
                            <button
                                className={furnished ? 'formButtonActive' : 'formButton'}
                                type='button'
                                id='furnished'
                                value={true}
                                onClick={onMutate}
                            >
                                Yes
                            </button>
                            <button
                                className={
                                    !furnished && furnished !== null
                                        ? 'formButtonActive'
                                        : 'formButton'
                                }
                                type='button'
                                id='furnished'
                                value={false}
                                onClick={onMutate}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    <div className={'formGroup'}>
                        <label className='formLabel'>Address</label>
                        <textarea
                            className='formInputAddress'
                            id='address'
                            value={address}
                            onChange={onMutate}
                            required
                        />
                    </div>

                    {!geoEnabled && (
                        <div className='formLatLng flex formGroup'>
                            <div>
                                <label className='formLabel'>Latitude</label>
                                <input
                                    className='formInputSmall'
                                    type='number'
                                    id='latitude'
                                    value={latitude}
                                    onChange={onMutate}
                                    required
                                />
                            </div>
                            <div>
                                <label className='formLabel'>Longitude</label>
                                <input
                                    className='formInputSmall'
                                    type='number'
                                    id='longitude'
                                    value={longitude}
                                    onChange={onMutate}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className={'formGroup'}>
                        <label className='formLabel'>Offer</label>
                        <div className='formButtons'>
                            <button
                                className={`${offer ? 'formButtonActive' : 'formButton'}`}
                                type='button'
                                id='offer'
                                value={true}
                                onClick={onMutate}
                            >
                                Yes
                            </button>
                            <button
                                className={
                                    !offer && offer !== null ? 'formButtonActive' : 'formButton'
                                }
                                type='button'
                                id='offer'
                                value={false}
                                onClick={onMutate}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    <div className={'formGroup'}>
                        <label className='formLabel'>Regular Price</label>
                        <div className='formPriceDiv'>
                            <input
                                className='formInputSmall'
                                type='number'
                                id='regularPrice'
                                value={regularPrice}
                                onChange={onMutate}
                                min='50'
                                max='750000000'
                                required
                            />
                            {type === 'rent' && <p className='formPriceText'>$ / Month</p>}
                        </div>
                    </div>

                    {offer && (
                        <div className={'formGroup'}>
                            <label className='formLabel'>Discounted Price</label>
                            <input
                                className='formInputSmall'
                                type='number'
                                id='discountedPrice'
                                value={discountedPrice}
                                onChange={onMutate}
                                min='50'
                                max='750000000'
                                required={offer}
                            />
                        </div>
                    )}

                    <div className={'formGroup'}>
                        <label className='formLabel'>Images</label>
                        <p className='imagesInfo'>
                            The first image will be the cover (max 6).
                        </p>
                        <input
                            className='formInputFile'
                            type='file'
                            id='images'
                            onChange={onMutate}
                            max='6'
                            accept='.jpg,.png,.jpeg'
                            multiple
                            required
                        />
                    </div>

                    <button type='submit' className='btn createListingButton'>
                        Create Listing
                    </button>
                </form>
            </main>
        </div>
    );
};

export default CreateListing;