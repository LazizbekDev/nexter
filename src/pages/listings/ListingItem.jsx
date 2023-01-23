import { Link } from "react-router-dom";
import { BiBath } from "react-icons/bi";
import { IoBed, IoTrashBin } from "react-icons/io5";
// import { IoTrashBin } from "react-icons/io"
const ListingItem = ({listing, id, onDelete}) => {
    return (
        <li className={'categoryListing'}>
            <Link to={`/category/${listing.type}/${id}`} className={'categoryListingLink'}>
                <div className={'categoryListingImgBlock'}>
                    <img
                        src={listing.imageUrls[0]}
                        alt={listing.name}
                        className={'categoryListingImg'}
                    />
                </div>

                <div className={'categoryListingDetails'}>
                    <p className={'categoryListingLocation'}>{listing.location}</p>
                    <p className={'categoryListingName'}>{listing.name}</p>
                    <p className={'categoryListingPrice'}>
                        {listing.type === "rent" && 'oyiga/'}
                        {listing.offer ?
                            listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') :
                            listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        } So'm
                    </p>
                    <div className={'categoryListingInfoDiv'}>
                        <IoBed size={"2rem"} />
                        <p className={'categoryListingInfoText'}>
                            {listing.bedrooms > 1 ? `${listing.bedrooms} ta yotoq xona`
                            : '1 ta yotoq xono'}
                        </p>

                        <BiBath size={"2rem"} />
                        <p className={'categoryListingInfoText'}>
                            {listing.bathrooms > 1 ? `${listing.bathrooms} ta yuvunish xonasi`
                                : '1 ta yuvunish xonasi'}
                        </p>
                    </div>
                </div>
            </Link>
            {onDelete && <IoTrashBin
                style={{color: "rgb(231, 76, 60)", fontSize: "4rem"}}
                className={'removeIcon'}
                onClick={() => onDelete()}
            />}
        </li>
    );
};

export default ListingItem;