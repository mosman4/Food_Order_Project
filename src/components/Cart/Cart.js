import {useContext, useState} from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Button from "../UI/Button";
import "./Form.css";
import useForm from "../hooks/use-form";
import useFetch from "../hooks/use-fetch";
import Form from "../UI/Form";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [isConfirmed,setConfirm] = useState(false)
    const {
        input: Name,
        HasError: nameHasError,
        ChangeHandler: nameChangeHandler,
        blurHandler: nameBlurHandler,
        inputValid: nameInputValid
    } = useForm(x => x.trim() !== "");
    const {
        input: Street,
        HasError: streetHasError,
        ChangeHandler: streetChangeHandler,
        blurHandler: streetBlurHandler,
        inputValid: streetInputValid
    } = useForm(x => x.trim() !== "");
    const {
        input: PostalCode,
        HasError: codeHasError,
        ChangeHandler: codeChangeHandler,
        blurHandler: codeBlurHandler,
        inputValid: codeInputValid
    } = useForm(x => x.trim() !== "");
    const {
        input: City,
        HasError: cityHasError,
        ChangeHandler: cityChangeHandler,
        blurHandler: cityBlurHandler,
        inputValid: cityInputValid
    } = useForm(x => x.trim() !== "");

    let formIsValid = false;
    if (nameInputValid && streetInputValid && codeInputValid && cityInputValid) {
        formIsValid = true
    }
    const formSubmitHandler = (e) => {
        e.preventDefault()
        if (!formIsValid) {
            console.log("wtf")
            return
        }
        orderHandler({Name, Street,PostalCode,City})
        setConfirm(true)

    }

    const {isLoading, error, fetchMeals} = useFetch();
    const orderHandler = async (userInfo) => {
        fetchMeals({
            url: 'https://react-testing-42531-default-rtdb.firebaseio.com/orders.json', method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: {
                User: userInfo,
                orders:cartCtx.items
            },
        })
    };
    const firstNameClass = nameHasError ? "control invalid" : "control"
    const streetNameClass = streetHasError ? "control invalid" : "control"
    const codeNameClass = codeHasError ? "control invalid" : "control"
    const cityNameClass = cityHasError ? "control invalid" : "control"
    const [isPressed, setPress] = useState(false)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem(item);
    };

    const cartItems = (<ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (<CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
        />))}


    </ul>);

    if (!isConfirmed) {
    return (
        <Modal onClose={props.onClose}>
        {cartItems}
        {isPressed && <Form firstName={firstNameClass} formSubmission={formSubmitHandler}
                            nameBlur={nameBlurHandler} nameChanger={nameChangeHandler} streetName={streetNameClass}
                            streetBlur={streetBlurHandler} streetChanger={streetChangeHandler}
                            codeClass={codeNameClass}
                            codeBlur={codeBlurHandler} codeChanger={codeChangeHandler} cityClass={cityNameClass}
                            cityBlur={cityBlurHandler} cityChanger={cityChangeHandler} Error={error}/>}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>
                Close
            </button>
            {hasItems && !isPressed && <Button action={() => setPress(true)}>Order</Button>}
            {isPressed && <button disabled={!formIsValid} className={classes.button} type="submit" form="my-form">Confirm</button>}
        </div>

    </Modal>);}
    else {
        return (
            <Modal onClose={props.onClose}>
                <p>Your Order Has Been Received !</p>
                <div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={props.onClose}>
                        Close
                    </button>
                   </div>
            </Modal>)
    }
};
export default Cart;