import { Component } from "react";
import { Button, Form } from "react-bootstrap";

const Strive_Api_Key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZmYzNDBkOGEyMDAwMThhNDhiNDQiLCJpYXQiOjE3MDMyNDE5MjQsImV4cCI6MTcwNDQ1MTUyNH0.4uxtoW3Kb_ZdwHxgnnPUpxkI4kMIrMsEQNEFRPsijcg";

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {
        comment: "",
        rate: 1,
        elementId: this.props.imdbID,
      },
    };
  }

  sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments`,
        {
          method: "POST",
          body: JSON.stringify(this.state.comment),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${Strive_Api_Key}`,
          },
        }
      );

      if (response.ok) {
        alert("Comment was sent!");
        this.setState({
          comment: {
            comment: "",
            rate: 1,
            elementId: this.props.imdbID,
          },
          needReload: true,
        });
      } else {
        console.log("error");
        alert("something went wrong");
      }
    } catch (error) {
      console.log("error");
    }
  };

  render() {
    return (
      <div className="my-3">
        <Form onSubmit={this.sendComment}>
          <Form.Group>
            <Form.Label>Comment text</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add comment here"
              value={this.state.comment.comment}
              onChange={(e) =>
                this.setState({
                  comment: {
                    ...this.state.comment,
                    comment: e.target.value,
                  },
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              value={this.state.comment.rate}
              onChange={(e) =>
                this.setState({
                  comment: {
                    ...this.state.comment,
                    rate: e.target.value,
                  },
                })
              }
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Button variant="danger" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default AddComment;
