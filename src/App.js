import { useState } from "react"
import Features from "./components/features/Features";
import Footer from "./components/footer/Footer";
import Gallery from "./components/gallery/Gallery";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Realtors from "./components/realtors/Realtors";
import Sidebar from "./components/sidebar/Sidebar";
import Story from "./components/story/Story";

function App() {
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
      <Home />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;
