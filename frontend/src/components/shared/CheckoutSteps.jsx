import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import PropTypes from "prop-types"

const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    <Row className="checkout-steps">
        <Col className={step1? "active" : ""}>SignIn</Col>
        <Col className={step2? "active" : ""}>Shipping</Col>
        <Col className={step3? "active" : ""}>Payment</Col>
        <Col className={step4? "active" : ""}>Place Order</Col>
    </Row>
  )
}

CheckoutSteps.propTypes = {
    step1: PropTypes.bool,
    step2: PropTypes.bool,
    step3: PropTypes.bool,
    step4: PropTypes.bool,
}

export default CheckoutSteps