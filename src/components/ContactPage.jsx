import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import { Container } from "react-bootstrap";

export default function ContactPage(){
    return (
        <>
            <NavigationBar path={"contact"} />
            <Container className="contact-us">
                <h2>Contact Us</h2>
                <p>Email: info@andhraspices.com</p>
                <p>Phone: +1 123 456 7890</p>
            </Container>
            <Footer />
        </>
    );
}