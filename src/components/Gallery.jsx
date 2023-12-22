import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Loading from "./Loading";
import SingleMovie from "./SingleMovie";

const OMDB_Url = "http://www.omdbapi.com/";
const OMDB_Api_Key = "d2ba067";

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: true,
    };
  }

  getMovies = async (movieTitle) => {
    const actualMovieArr = localStorage.getItem(movieTitle);
    if (actualMovieArr) {
      this.setState({ movies: JSON.parse(actualMovieArr), isLoading: false });
      //console.log("Got movies from LocalStorage", actualMovieArr);
    } else {
      const getMoviesUrl = `${OMDB_Url}?s=${movieTitle}&apikey=${OMDB_Api_Key}`;
      try {
        const res = await fetch(getMoviesUrl);

        if (!res.ok)
          throw new Error("ERROR: Couldn't retrieve your movies' data.");

        const data = await res.json();
        const moviesArr = data.Search.slice(0, 6);
        //console.log(moviesArr);

        this.setState({ movies: moviesArr });
        localStorage.setItem(movieTitle, JSON.stringify(moviesArr));

        console.log("state: ", this.state);
      } catch (err) {
        console.log("Error:", err);
        this.setState({ isLoading: false });
      }
    }
  };

  componentDidMount = () => {
    this.getMovies(this.props.searchMoviesOf);
  };

  render() {
    return (
      <Container fluid className="my-5">
        <h2 className="text-white">{this.props.title}</h2>
        <Row className="d-flex align-items-stretch">
          {this.state.isLoading && (
            <div className="text-center">
              <Loading />
            </div>
          )}
          {this.state.movies.map((movie, index) => (
            <SingleMovie movie={movie} key={index} />
          ))}
        </Row>
      </Container>
    );
  }
}

export default Gallery;
