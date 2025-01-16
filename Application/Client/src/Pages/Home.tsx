import Hero from "../Components/Hero";
import Mockup from "../Components/Mockup";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Home() {
   




    return (
    
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] overflow-y-scroll">
            <Navbar />
            <div className=" w-full p-5 sm:w-[60%] relative top-24 sm:top-48  sm:left-1/4  sm:-translate-x-[8%] min-h-screen ">
                <Hero />
                <Mockup />
                <Footer />
                

            </div>
        </div>
    )
}

export default Home