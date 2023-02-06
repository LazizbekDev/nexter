import { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, limit, query } from "firebase/firestore"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { db } from "../firebase.config";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import loader from "../img/loader.gif";

const Slider = () => {

    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            const listingsRef = collection(db, 'listings');
            const q = query(listingsRef, orderBy('timestemp', 'desc'), limit(5))

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
    }, [])

    if (loading) {
        return (
            <div className={'center'}>
                <div className={'center-asset'}>
                    <img
                        src={loader}
                        alt={'loader'}
                        width={120}
                    />
                </div>
            </div>
        )
    }
    return listings && (
        <>
            <p className={'exploreHeading heading-3'}>Recommended</p>

            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{clickable: true}}>
                {listings?.map(({data,id}) => (
                    <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                        <div style={{
                            background: `url(${data?.imgUrls[0]}) center no-repeat`,
                            backgroundSize: "cover"
                        }} className={'swiperSlideDiv'} />
                        <p className={'swiperSlideText'}>{data.name}</p>
                        <p className={'swiperSlidePrice'}>
                            ${data.discountedPrice ?? data.regularPrice}
                            {data.type === 'rent' && ' / month'}
                        </p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
};

export default Slider;