import { useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import Realtors from "../../components/realtors/Realtors";
import Footer from "../../components/footer/Footer";
import Story from "../../components/story/Story";
import Features from "../../components/features/Features";
import Gallery from "../../components/gallery/Gallery";
import HomeComponent from "../../components/home/Home";

const Home = () => {
    const [opened, setOpened] = useState(false);

    return (
        <div className={`container ${opened && 'sidebar-open'}`}>
            <Sidebar
                className={`${opened && 'sidebar-btn'}`}
                mb={`${opened ? 'sidebar-open' : 'sidebar-close'}`}
                onClick={() => opened ? setOpened(false) : setOpened(true)} />
            <Header />
            <Realtors />
            <Features />
            <Story />
            <HomeComponent />
            <Gallery />
            <Footer />
        </div>
    );
}

export default Home;
