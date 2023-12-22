import { Component } from "react";
import { Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import CommentArea from "./CommentArea";

class SingleMovie extends Component {
  state = {
    selected: false,
  };

  render() {
    const { movie } = this.props;
    return (
      <Col
        xs={12}
        sm={4}
        md={3}
        lg={2}
        className="d-flex align-items-stretch flex-column"
      >
        <Card
          id={movie.imdbID}
          className="movie-card "
          onClick={() => this.setState({ selected: !this.state.selected })}
          style={{ border: this.state.selected ? "3px solid red" : "none" }}
        >
          <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text className="text-secondary">
              Release year: {movie.Year}
            </Card.Text>
          </Card.Body>
        </Card>
        {this.state.selected && <CommentArea imdbID={movie.imdbID} />}
      </Col>
    );
  }
}

export default SingleMovie;
