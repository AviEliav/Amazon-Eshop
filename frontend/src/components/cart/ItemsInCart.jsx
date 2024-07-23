import PropTypes from "prop-types";
import MessageBox from "../shared/MessageBox";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ItemsInCart = ({cartItems, updateCartHandler, removeItemHandler}) => {
  return (
    <div>
        {cartItems.length === 0 ? (
            <MessageBox>
                Your Cart is Empty. {" "}
                <Link to="/">Go Back to Home Page</Link>
            </MessageBox>
        ) : (
            <ListGroup>
                {cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                        <Row className='align-items-center'>
                            <Col md={4}>
                                <img className="img-fluid rounded img-thumbnail" src={item.image} alt={item.title}/> {" "}
                                <Link to={`/product/${item.token}`}>
                                    {item.title}
                                </Link>
                            </Col>

                             <Col md={3}>
                               <Button onClick={()=>updateCartHandler(item,item.quantity -1)} variant="light" name="minusButton" disabled={item.quantity===1}>
                                    <i className="fa fa-minus-circle"/>
                               </Button>
                               <span>{item.quantity}</span> {" "}
                               <Button onClick={()=>updateCartHandler(item,item.quantity + 1)} variant="light" name="plusButton" disabled={item.quantity===item.countInStock}>
                                    <i className="fa fa-plus-circle"/>
                               </Button>
                            </Col>

                            <Col md={1}>${item.price}</Col>
                            <Col md={1}>
                               
                            <Button onClick={()=> removeItemHandler(item)} variant="light">
                             <i className="fa fa-trash"></i>
                            </Button>

                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )}
    </div>
  )
}

ItemsInCart.propTypes = {
    cartItems: PropTypes.array,
    updateCartHandler: PropTypes.func,
    removeItemHandler: PropTypes.func
}

export default ItemsInCart