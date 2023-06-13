import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';


// class DishDetail extends Component {
    function RenderDish({dish}){
        if (dish != null)
            return (
                <Card className='col-12 col-md-5 m-1'>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return (
                <div></div>
            );
    }

    function RenderComments({comments}) {
        if (comments == null) {
            return (
                <div></div>
            )
        }
        const com = comments.map((Comment) => {
            return (
                <li key={Comment.id}>
                    <p>{Comment.comment}</p>
                    <p>{Comment.author},{new Intl.DateTimeFormat('en-US',
                     { year: 'numeric', month: 'short', 
                     day: '2-digit'}).
                     format(new Date(Date.parse(Comment.date)))}</p>
                </li>
            );
        });

        return (
            <div className='col-12  col-md-5 m-1'>
                <h4>Comment</h4>
                <ul className='list-unstyled'>{com}</ul>
            </div>
        )

    }
    

    const  DishDetail = (props) => {
        // const dish = this.props.dish;
        if (props.dish == null){
            return (
                <div></div>
            )
        }
        return (
                <div className='container'>
                    <div className='row'>
                       {/* {this.renderDish(dish)}
                    {this.renderComments(dish.comments)}  */}
                    <RenderDish dish={props.dish}  />
                    <RenderComments comments={props.dish.comments}  />
                    </div>
                    
                </div>
        );
    }


export default DishDetail;