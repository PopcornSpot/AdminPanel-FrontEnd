import NavBar from "../ReusableComponents/NavbarComponent";
import HeroSection from "./HeroSectionComp";

const Home = () => {
  return (
    <>
      <header>
        <NavBar/>
      </header>
      <main className="relative top-20">
        <HeroSection/>
      </main>
      <footer className="w-full h-full p-28">
      </footer>
    </>
  );
};

export default Home;
