import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useReducer } from "react";
import { Store } from "../store";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../actions";
import axios from "axios";
import { toast } from "react-toastify";
import { addToCartHandler, getError } from "../utils";
import Loading from "../components/shared/Loading";
import MessageBox from "../components/shared/MessageBox";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import productPageReducer from "../reducers/productPageReducer";
import ProductDescription from "../components/product/ProductDescription"
import CartDescription from "../components/product/CartDescription"


const initialState = {
    loading: false,
    error: "",
    product: {},
}

const ProductPage = () => {
    const params = useParams();
    const { token } = params;
    const navigate = useNavigate();

    const { state, dipatch: ctxDispatch } = useContext(Store)
    const { cart: { cartItems } } = state;

    const [{ loading, error, product }, dispatch] = useReducer(productPageReducer, initialState)

    useEffect(() => {
        const getProduct = async () => {
            dispatch({ type: GET_REQUEST });
           
            try {
                const res = await axios.get(`/api/v1/products/token/${token}`);
                console.log(res)
                dispatch({ type: GET_SUCCESS, payload: res.data });
            } catch (error) {
                dispatch({ type: GET_FAIL, payload: error.message });
                toast(getError(error))
            }
        }

        getProduct();
    }, [token])

    const addToCart = async () => {
        await addToCartHandler(product, cartItems, ctxDispatch);
        navigate("/cart");
    }

    return (
        <div>{loading ? (<Loading />) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <div>
                <Row>
                    <Col md={6}> 
                        <img width={400} src= {product.image} alt={product.title}/>
                    </Col>
                    <Col md={3}>
                        <ProductDescription {...product} />
                    </Col>
                    <Col md={3}>
                        <CartDescription product={product} addToCart={addToCart} />
                    </Col>
                </Row>
            </div>
        )}</div>
    )
}

export default ProductPage