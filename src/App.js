import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import NavbarCustom from "./components/NavbarCustom";

import Footer from "./components/Footer";
import MainPage from "./components/MainPage";

function App() {
  return (
    <>
      <NavbarCustom />
      <MainPage />
      {/* <Gallery title="Trending Now" searchMoviesOf="Harry Potter" /> */}
      <Footer />
    </>
  );
}

export default App;
