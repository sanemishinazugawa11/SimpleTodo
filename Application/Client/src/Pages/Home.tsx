import Hero from "../Components/Hero";
import Mockup from "../Components/Mockup";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Home() {





    return (

        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] overflow-y-scroll">
            <Navbar />
            <div className=" w-[80%] p-5 mt-40 relative left-1/2 -translate-x-[50%]  ">
                <Hero />
                <Mockup />
            </div>
            <Footer />

        </div>
    )
}

export default Home