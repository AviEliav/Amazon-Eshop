import React, { useContext, useEffect, useState } from "react";
import { Store } from "../store";
import { SAVE_PAYMENT_METHOD } from "../actions";
import { useNavigate } from "react-router-dom";
import Title from "../components/shared/Title";
import CheckoutSteps from "../components/shared/CheckoutSteps";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const PaymentPage = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems, shippingAddress, paymentMethod },
        userInfo,
    } = state;
    const [paymentMethodName, setPaymentMethodName] = useState(
        paymentMethod || "PayPal"
    );
 
    useEffect(() => {
        if (cartItems.length === 0) {
            navigate("/");
        }
        if (!userInfo) {
            navigate("/signin?redirect=/shipping");
        }
        if (!shippingAddress.address) {
            navigate("/shipping");
        }
    }, [cartItems, navigate, shippingAddress, userInfo]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(shippingAddress)
        ctxDispatch({ type: SAVE_PAYMENT_METHOD, payload: paymentMethodName });
        console.log(shippingAddress)
        navigate("/placeorder");
    };

    return (
        <div>
            <Title title="Payment" />
            <CheckoutSteps step1 step2 step3 />
            <Container className="small-container">
                <h1 className="my-3">Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="Stripe">
                        <Form.Label>Stripe</Form.Label>
                        <Form.Check
                            type="radio"
                            id="Stripe"
                            value="Stripe"
                            checked={paymentMethodName === "Stripe"}
                            onChange={(e) => setPaymentMethodName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="PayPal">
                        <Form.Label>PayPal</Form.Label>
                        <Form.Check
                            type="radio"
                            id="PayPal"
                            value="PayPal"
                            checked={paymentMethodName === "PayPal"}
                            onChange={(e) => setPaymentMethodName(e.target.value)}
                        />
                    </Form.Group>
                    <div className="mb-3">
                        <Button type="submit">Continue</Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
};
export default PaymentPage