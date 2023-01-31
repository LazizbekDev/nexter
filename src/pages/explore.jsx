import { useState } from 'react';
import Sidebar from "../components/sidebar/Sidebar";
import rent from "../img/house-1.jpeg"
import sale from "../img/house-2.jpeg"
import {Link} from "react-router-dom";
import "../components/header/Header.scss"
import Slider from "../components/Slider";
const Explore = () => {

    const [opened, setOpened] = useState(false);

    const categoryItem = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    }

    return (
        <div className={`container-page ${opened && 'sidebar-open'}`}>
            <Sidebar
                className={`${opened && 'sidebar-btn'}`}
                mb={`${opened ? 'sidebar-open' : 'sidebar-close'}`}
                onClick={() => opened ? setOpened(false) : setOpened(true)}
            />

            <div>

                <Slider />


                <div style={{
                    display: 'flex',
                    alignItems: "baseline",
                    justifyContent: "center",
                    marginTop: "2rem",
                    marginBottom: "2rem"
                }}>
                    <h2 style={{background: "#101d2c"}} className={'heading-2 btn'}>Explore</h2>
                    <button className={'btn header__btn'}>Categories</button>
                </div>

                <div>

                    <div style={{display: "flex"}}>
                        <Link to={'/category/rent'} style={categoryItem}>
                            <img src={rent} alt={'house for rent'} width={"60%"}/>
                            <button style={{transform: "translateY(-50%)", background: "#101d2c"}} className={'btn'}>Place for rent</button>
                        </Link>

                        <Link to={'/category/sale'} style={categoryItem}>
                            <img src={sale} alt={'house for sale'} width={"60%"}/>
                            <button style={{transform: "translateY(-50%)", background: "#101d2c"}} className={'btn'}>
                                Place for sale
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Explore;