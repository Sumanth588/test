import { useState } from "react";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import { Container, Form, Button, Alert } from "react-bootstrap";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    
    const [status, setStatus] = useState({
        submitting: false,
        submitted: false,
        error: null,
        success: null
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ ...status, submitting: true });
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }
            
            setStatus({
                submitting: false,
                submitted: true,
                error: null,
                success: data.message
            });
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                message: ''
            });
            
        } catch (error) {
            setStatus({
                submitting: false,
                submitted: true,
                error: error.message,
                success: null
            });
        }
    };
    
    return (
        <>
            <NavigationBar path={"contact"} />
            <Container className="contact-us">
                <h2>Contact Us</h2>
                <p>Email: info@andhraspices.com</p>
                <p>Phone: +1 123 456 7890</p>
                
                {status.submitted && status.success && (
                    <Alert variant="success">
                        {status.success}
                    </Alert>
                )}
                
                {status.submitted && status.error && (
                    <Alert variant="danger">
                        {status.error}
                    </Alert>
                )}
                
                <Form onSubmit={handleSubmit} className="mt-4" style={{maxWidth: '600px', margin: '0 auto'}}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            required 
                            placeholder="Your Name"
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                            placeholder="Your Email"
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Message</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required 
                            rows={5} 
                            placeholder="Your Message"
                        />
                    </Form.Group>
                    
                    <Button 
                        type="submit" 
                        variant="success" 
                        className="mt-2" 
                        disabled={status.submitting}
                    >
                        {status.submitting ? 'Submitting...' : 'Send Message'}
                    </Button>
                </Form>
            </Container>
            <Footer />
        </>
    );
}