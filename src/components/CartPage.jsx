import { Container, Button } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import { useEffect, useState } from "react";
import './CartPage.css';

export default function CartPage(){

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart-items")) || [];
        setCart(storedCart);
    }, []);

    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("cart-items", JSON.stringify(updatedCart));
    };

    const increaseQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        updateCart(updatedCart);
    };

    const decreaseQuantity = (index) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
        } else {
            updatedCart.splice(index, 1);
        }
        updateCart(updatedCart);
    };

    const removeItem = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        updateCart(updatedCart);
    };

    const subtotal = cart.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
        <>
        <NavigationBar path={"cart"} />
        <Container className="cart">
                <h2>Your Orders</h2>
                {cart.length > 0 ? (
                    <div className="cart-items">
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="cart-product">
                                                    <img src={item.link} alt={item.name} />
                                                    <div>
                                                        <h3>{item.name}</h3>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>${item.price.toFixed(2)}</td>
                                            <td>
                                                <Button onClick={() => decreaseQuantity(index)}>-</Button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <Button onClick={() => increaseQuantity(index)}>+</Button>
                                            </td>
                                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                                            <td>
                                                <Button onClick={() => removeItem(index)}>Remove</Button>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="empty-cart">No items in the cart</p>
                )}

                    <section className="cart-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-details">
                            <p>Subtotal: <span>${subtotal.toFixed(2)}</span></p>
                            <p>Shipping: <span>Free</span></p>
                            <p>Tax (8%): <span>${tax.toFixed(2)}</span></p>
                            <p className="total">Total: <span>${total.toFixed(2)}</span></p>
                        </div>
                        <button className="checkout-btn">Proceed to Checkout</button>
                    </section>
            </Container>
        </>
    );
}