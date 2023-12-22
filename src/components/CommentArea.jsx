import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
/* import Error from "./Error"; */

const Strive_Api_Key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZmYzNDBkOGEyMDAwMThhNDhiNDQiLCJpYXQiOjE3MDMyNDE5MjQsImV4cCI6MTcwNDQ1MTUyNH0.4uxtoW3Kb_ZdwHxgnnPUpxkI4kMIrMsEQNEFRPsijcg";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
  };

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
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        this.setState({ comments: comments, isLoading: false, isError: false });
      } else {
        console.log("error");
        this.setState({ isLoading: false, isError: true });
      }
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, isError: true });
    }
  };
  componentDidMount = () => {
    this.getComments();
  };

  render() {
    return (
      <div className="text-center comment-area">
        {this.state.isLoading && <Loading />}
        {/*  {this.state.isError && <Error />} */}
        <AddComment imdbID={this.props.imdbID} comments={this.state.comments} />
        <CommentList commentsToShow={this.state.comments} />
      </div>
    );
  }
}

export default CommentArea;
