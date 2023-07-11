import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Label,
  Col,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  handleSubmit(values) {
    // console.log("Current State is: " + JSON.stringify(values));
    // alert("Current State is: " + JSON.stringify(values));
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);

  }

  render() {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;
    return (
      <div className="container">
        <div className="row mt-3">
          <div>
            <Button outline onClick={this.toggleModal}>
              <span className="fa fa-pencil fa-lg"></span>{" "}
              <span class="text-dark font-weight-bold">Submit Comment</span>
            </Button>
          </div>

          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>
              <h4 class="text-info">Submit Comment</h4>
            </ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Col md={12}>
                    <Label htmlFor="rating">
                      <h6 classs="text-secondary">Rating</h6>
                    </Label>
                    <Control.select
                      model=".rating"
                      name="rating"
                      className="form-select text-dark "
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={12}>
                    <Label htmlFor="author">
                      <h6 classs="text-secondary">Your Name</h6>
                    </Label>
                    <Control.text
                      model=".author"
                      id="author"
                      name="author"
                      placeholder="Your Name"
                      className="form-control text-dark"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(15),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: "",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or less",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={12}>
                    <Label htmlFor="comment">
                      <h6 classs="text-secondary">Comment</h6>
                    </Label>
                    <Control.textarea
                      model=".comment"
                      id="comment"
                      name="comment"
                      rows="6"
                      className="form-control text-dark"
                    />
                  </Col>
                </Row>
                <Row
                  className="form-group"
                  style={{ paddingTop: 20, width: 100 }}
                >
                  <Col md={8}>
                    <Button type="submit" color="primary">
                      <span class="text-light">Submit</span>
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

function RenderDish({ dish }) {


  return (
    <div className="col-12">
      <Card>
      <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, addComment, dishId}) {
  return (
    <div className="col-12 ">
      <h4>Comments</h4>
      {comments.map((commentId) => {
        return (
          <div key={commentId.id} className="mb-3">
            <div>
              <p>{commentId.comment}</p>
              <p>
                -- {commentId.author},{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(commentId.date)))}
              </p>
            </div>
          </div>
        );
      })}          
      <CommentForm dishId={dishId} addComment={addComment}/>

    </div>
  );
}

const DishDetail = (props) => {
  const { dish, comments } = props;

  // const dishItem = <RenderDish dish={dish} />;
  // const dishComments = <RenderComments comments={dish.comments} />;

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <RenderDish dish={dish} />
        </div>
        <div className="col-6">


        <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />


        </div>
      </div>
    </div>
  );
};

export default DishDetail;


