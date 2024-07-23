import { useContext, useEffect, useState } from "react"
import { Store } from "../store";
import { Link, useNavigate } from "react-router-dom";
import { CLEAR_CART } from "../actions";
import { toast } from "react-toastify";
import { getError } from "../utils";
import Title from "../components/shared/Title";
import CheckoutSteps from "../components/shared/CheckoutSteps";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Loading from "../components/shared/Loading"
import axios from "axios";

const SubmitOrderPage = () => {
    const [loading, setLoading] = useState(false);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const { paymentMethod, cartItems, shippingAddress } = cart;
    const navigate = useNavigate();

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate("/")
        }

        if (!userInfo) {
            navigate("/signin?redirect=/placeorder")
        }

        if (!shippingAddress) {
            console.log("hello from navigate to shipping")
            navigate("/shipping")
        }

        if (!paymentMethod) {
            navigate("/payment")
        }

    }, [navigate, paymentMethod, userInfo, shippingAddress, cartItems])

    const submitOrderHandler = async () => {
        try { console.log(userInfo.token)
            setLoading(true)
            const { data } = await axios.post("/api/v1/orders",
                {
                    orderItems: cartItems,
                    shippingAddress: shippingAddress,
                    paymentMethod: paymentMethod,
                    itemsPrice: cart.itemsPrice,
                    shippingPrice: cart.shippingPrice,
                    taxPrice: cart.taxPrice,
                    totalPrice: cart.totalPrice,
                }, {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                }
            );
            console.log('hi from submit order')
            console.log(data)
            ctxDispatch({ type: CLEAR_CART })
            localStorage.removeItem("cartItems");
            navigate(`/order/${data.order._id}`)
        }

        catch (error) {
            toast.error(getError(error))
        }

        finally {
            setLoading(false)
        }
    }

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    cart.itemsPrice = round2(
        cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
    )

    cart.taxPrice = round2(cart.itemsPrice * 0.17);
    cart.shippingPrice = cart.itemsPrice < 50
        ? round2(cart.itemsPrice * 0.02)
        : round2(cart.itemsPrice * 0.1);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;


    return (
        <div>
            <Title title='Order Summary' />
            <CheckoutSteps step1 step2 step3 step4 />
            <h1 className="my-3">Order Summary</h1>
            <Row>
                <Col md={8}>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong>
                                {shippingAddress.fullName}
                                <br />

                                <strong>Address:</strong>
                                {shippingAddress.address}
                                <br />

                                <strong>Postal Code:</strong>
                                {shippingAddress.postalCode}
                                <br />

                                <strong>City:</strong>
                                {shippingAddress.city}
                                <br />

                                <strong>Country:</strong>
                                {shippingAddress.country}
                                <br />
                            </Card.Text>
                            <Link to="/payment">Edit</Link>
                        </Card.Body>
                    </Card>

                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method:</strong>
                                {paymentMethod}
                            </Card.Text>
                            <Link to="/payment">Edit</Link>
                        </Card.Body>
                    </Card>

                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Items</Card.Title>
                            <ListGroup variant='flush'>
                                <Row className="align-items-center">
                                    <Col md={6}>Description</Col>
                                    <Col md={3}>Quantity</Col>
                                    <Col md={3}>Price</Col>
                                </Row>
                                {cartItems.map((item) => (
                                    <ListGroup.Item key={item._id}>
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <img src={item.image} alt={item.title} className="img-fluid rounded img-thumbnail" />{""}
                                                <Link to={`/product/${item.token}`}>{item.title}</Link>
                                            </Col>
                                            <Col md={3}>
                                                <span>{item.quantity}</span>
                                            </Col>
                                            <Col md={3}>
                                                ${item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Link to={"/cart"}>Edit</Link>
                        </Card.Body>
                    </Card>
                </Col>


                <Col md={4}>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>Summary:</Card.Title>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row >
                                        <Col>Items:</Col>
                                        <Col>${cart.itemsPrice.toFixed(2)}</Col>
                                    </Row>
                                    <Row >
                                        <Col>Shipping:</Col>
                                        <Col>${cart.shippingPrice.toFixed(2)}</Col>
                                    </Row>
                                    <Row >
                                        <Col>Tax:</Col>
                                        <Col>${cart.taxPrice.toFixed(2)}</Col>
                                    </Row>
                                    <Row >
                                        <Col>Total:</Col>
                                        <Col>${cart.totalPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className='d-grid'>
                                        <Button type="button" onClick={submitOrderHandler} disabled={cartItems.length === 0}>Submit</Button>
                                    </div>
                                    {loading && <Loading />}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

            </Row >
        </div >
    )
}

export default SubmitOrderPage