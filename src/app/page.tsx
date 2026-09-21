import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import HeroDistortion from "@/components/HeroDistortion";
import Manifesto from "@/components/Manifesto";
import Specialties from "@/components/Specialties";
import Gallery from "@/components/Gallery";
import Studio from "@/components/Studio";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import BookingForm from "@/components/BookingForm";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <HeroDistortion />
        <Manifesto />
        <Specialties />
        <Gallery />
        <Studio />
        <About />
        <Testimonials />
        <BookingForm />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
