import { Navbar, Nav, Container } from "react-bootstrap";

export default function NavigationBar({path}){
    return (
        <>
            <Navbar>
                <Container className='nav-bar'>
                    <Navbar.Brand href="/">Andhra Spices</Navbar.Brand>
                    <Nav className='nav-items'>
                        {path === "home"&&(<>
                            <Nav.Link href="/menu">Menu</Nav.Link>
                            <Nav.Link href="/order">Cart</Nav.Link>
                            <Nav.Link href="/contact">Contact</Nav.Link></>        
                        )}
                        {path === "menu"&&(<>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/order">Cart</Nav.Link>
                            <Nav.Link href="/contact">Contact</Nav.Link>
                        </>
                        )}
                        {path === 'contact'&&(<>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/menu">Menu</Nav.Link>
                            <Nav.Link href="/order">Cart</Nav.Link>
                        </>)}
                        {path==="cart"&&(<>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/menu">Menu</Nav.Link>
                            <Nav.Link href="/contact">Contact</Nav.Link>
                        </>)}
                        <Nav.Link href="https://www.tajmahalfw.com/">External Site</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}