import Footer from "./Footer";
import NavigationBar from "./NavigationBar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function MenuPage(){

    const items = [{name: "Biryani", desc: "Mild spicy, Medium Spicy, Extra Spicy", price: 10.99, link: require('../images/biryani.jpg')},
        {name: "Panner-Tikka-Masala", desc: "Mild spicy, Medium Spicy, Extra Spicy", price: 7.99, link: require('../images/paneer_tikka.jpg')},
        {name: "Chicken65", desc: "Mild spicy, Medium Spicy, Extra Spicy", price: 8.99, link: require('../images/chicken65.jpeg')}
    ];

    const addToCart = (foodItem) => {

        let cart = localStorage.getItem('cart-items');

        try {
            cart = cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error("Invalid JSON in cart-items, resetting cart:", error);
            cart = [];
        }

        if (!Array.isArray(cart)) {
            cart = [];
        }

        const existingitemIndex = cart.findIndex(item => item.name === foodItem.name);

        if (existingitemIndex !== -1) {
            cart[existingitemIndex].quantity += 1;
        } else {
            cart.push({ ...foodItem, quantity: 1 });
        }

        localStorage.setItem('cart-items', JSON.stringify(cart));

        alert(`${foodItem.name} added to cart.`);
    };

    return (
        <>
        <NavigationBar path={"menu"}/>
        <Container className="Menu">
            <h2>Our Menu</h2>
            <Row>
                {items.map((item, index)=>(
                    <Col key={index} lg={3} md={1}>
                    <Card className="category-card">
                        <Card.Img src={item.link} alt={item.name} />
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>{item.desc}</Card.Text>
                            <Card.Text>${item.price}</Card.Text>
                            <Button variant="primary" onClick={() => addToCart(item)}>Add to Orders</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        <Footer />
        </>
    );
}