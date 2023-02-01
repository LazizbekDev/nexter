import { Link } from "react-router-dom";
import {BiBath, BiMessageSquareEdit} from "react-icons/bi";
import { IoBed, IoTrashBin } from "react-icons/io5";
import {useEffect, useState} from "react";
import {auth} from "../../firebase.config";
// import { IoTrashBin } from "react-icons/io"
const ListingItem = ({listing, id, onDelete, onEdit}) => {
    const [owner, setOwner] = useState(false);

    useEffect(() => {
        if (listing && listing.userRef !== auth.currentUser.uid) {
            setOwner(false)
        } else {
            setOwner(true)
        }
    }, [listing])

    return (
        <li className={'categoryListing'}>
            <Link to={`/category/${listing.type}/${id}`} className={'categoryListingLink'}>
                <div className={'categoryListingImgBlock'}>
                    <img
                        src={listing.imgUrls[0]}
                        alt={listing.name}
                        className={'categoryListingImg'}
                    />
                </div>

                <div className={'categoryListingDetails'}>
                    <p className={'categoryListingLocation'}>{listing.location}</p>
                    <p className={'categoryListingName'}>{listing.name}</p>
                    <p className={'categoryListingPrice'}>
                        {listing.type === "rent" && 'month/'}
                        ${listing.offer ?
                            listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') :
                            listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                    </p>
                    <div className={'categoryListingInfoDiv'}>
                        <IoBed size={"2rem"} />
                        <p className={'categoryListingInfoText'}>
                            {listing.bedrooms > 1 ? `${listing.bedrooms} bed rooms`
                            : '1 bed room'}
                        </p>

                        <BiBath size={"2rem"} />
                        <p className={'categoryListingInfoText'}>
                            {listing.bathrooms > 1 ? `${listing.bathrooms} bath rooms`
                                : '1 bath room'}
                        </p>
                    </div>
                </div>
            </Link>
            {onDelete && owner && <IoTrashBin
                style={{color: "rgb(231, 76, 60)", fontSize: "4rem", cursor: "pointer"}}
                className={'removeIcon'}
                onClick={() => onDelete()}
            />}

            {onEdit && owner && <BiMessageSquareEdit
                style={{color: "rgb(60,231,140)", fontSize: "4rem", cursor: "pointer"}}
                className={'removeIcon'}
                onClick={() => onEdit()}
            />}
        </li>
    );
};

export default ListingItem;