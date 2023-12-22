import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import NavbarCustom from "./components/NavbarCustom";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <NavbarCustom />
      <Gallery title="Trending Now" searchMoviesOf="Harry Potter" />
      <Footer />
    </>
  );
}

export default App;
