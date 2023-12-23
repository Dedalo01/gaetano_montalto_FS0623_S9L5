import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import { Button } from "react-bootstrap";

const Strive_Api_Key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZmYzNDBkOGEyMDAwMThhNDhiNDQiLCJpYXQiOjE3MDMyNDE5MjQsImV4cCI6MTcwNDQ1MTUyNH0.4uxtoW3Kb_ZdwHxgnnPUpxkI4kMIrMsEQNEFRPsijcg";

class CommentArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      isLoading: true,
      isError: false,
      reload: false,
    };
  }

  getComments = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" +
          this.props.imdbID,
        {
          headers: {
            Authorization: `Bearer ${Strive_Api_Key}`,
          },
        }
      );

      if (response.ok) {
        let comments = await response.json();
        this.setState({
          comments: comments,
          isLoading: false,
          isError: false,
          reload: true,
        });
      } else {
        console.log("error");
        this.setState({ isLoading: false, isError: true, reload: false });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, isError: true, reload: false });
    }
  };

  componentDidMount = () => {
    this.getComments();
  };

  render() {
    return (
      <div className="text-center comment-area">
        {this.state.isLoading && <Loading />}

        <AddComment
          imdbID={this.props.imdbID}
          commentsToShow={this.state.comments}
        />

        <div className="wrap">
          <Button
            className="loadBtn btn-danger"
            type="button"
            onClick={() => this.getComments()}
          >
            Load Comments
          </Button>

          <CommentList commentsToShow={this.state.comments} />
        </div>
      </div>
    );
  }
}

export default CommentArea;
