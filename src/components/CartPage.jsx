import { Container, Button, Form, Modal } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import { useEffect, useState } from "react";
import './CartPage.css';

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    });
    const [orderStatus, setOrderStatus] = useState({
        submitting: false,
        error: null,
        success: null
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        setOrderStatus({ ...orderStatus, submitting: true });

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items: cart,
                    customerInfo
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to place order');
            }

            setOrderStatus({
                submitting: false,
                error: null,
                success: data.message
            });

            // Clear cart on successful order
            localStorage.removeItem('cart-items');
            setCart([]);
            
            // Close modal after 2 seconds on success
            setTimeout(() => {
                setShowCheckout(false);
                setOrderStatus({ submitting: false, error: null, success: null });
            }, 2000);

        } catch (error) {
            setOrderStatus({
                submitting: false,
                error: error.message,
                success: null
            });
        }
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
                                            <Button variant="danger" onClick={() => removeItem(index)}>Remove</Button>
                                        </td>
                                    </tr>
                                ))}
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
                    <button 
                        className="checkout-btn"
                        onClick={() => setShowCheckout(true)}
                        disabled={cart.length === 0}
                    >
                        Proceed to Checkout
                    </button>
                </section>
                
                {/* Checkout Modal */}
                <Modal show={showCheckout} onHide={() => setShowCheckout(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Complete Your Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {orderStatus.success ? (
                            <div className="text-center text-success">
                                <h4>{orderStatus.success}</h4>
                                <p>Thank you for your order!</p>
                            </div>
                        ) : (
                            <Form onSubmit={handleCheckout}>
                                {orderStatus.error && (
                                    <div className="alert alert-danger">{orderStatus.error}</div>
                                )}
                                
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={customerInfo.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={customerInfo.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="phone"
                                        value={customerInfo.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-3">
                                    <Form.Label>Delivery Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="address"
                                        value={customerInfo.address}
                                        onChange={handleInputChange}
                                        required
                                        rows={3}
                                    />
                                </Form.Group>
                                
                                <div className="text-end">
                                    <Button 
                                        variant="secondary" 
                                        className="me-2" 
                                        onClick={() => setShowCheckout(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        variant="primary" 
                                        type="submit"
                                        disabled={orderStatus.submitting}
                                    >
                                        {orderStatus.submitting ? 'Processing...' : 'Place Order'}
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    );
}