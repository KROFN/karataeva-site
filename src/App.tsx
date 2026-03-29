import "./styles/globals.css";
import GrainOverlay from "./components/common/GrainOverlay";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Gallery from "./components/Gallery/Gallery";
import Services from "./components/Services/Services";
import Process from "./components/Process/Process";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <>
      <GrainOverlay />
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Services />
        <Process />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
