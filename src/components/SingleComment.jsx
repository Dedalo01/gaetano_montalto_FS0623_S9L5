import { Button, ListGroup } from "react-bootstrap";

const Strive_Api_Key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZmYzNDBkOGEyMDAwMThhNDhiNDQiLCJpYXQiOjE3MDMyNDE5MjQsImV4cCI6MTcwNDQ1MTUyNH0.4uxtoW3Kb_ZdwHxgnnPUpxkI4kMIrMsEQNEFRPsijcg";

const SingleComment = ({ comment }) => {
  const deleteComment = async (movieId) => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + movieId,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Strive_Api_Key}`,
          },
        }
      );
      if (response.ok) {
        alert("Comment was deleted successfully!");
      } else {
        alert("Error - comment was NOT deleted!");
      }
    } catch (error) {
      alert("Error - comment was NOT deleted!");
    }
  };

  return (
    <ListGroup.Item>
      <p>{comment.comment}</p>
      <Button
        variant="danger"
        className="ml-2"
        onClick={() => deleteComment(comment._id)}
      >
        Delete
      </Button>
    </ListGroup.Item>
  );
};

export default SingleComment;
