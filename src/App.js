import './App.css';
import CartPage from './components/CartPage';
import ContactPage from './components/ContactPage';
import Home from './components/Home';
import MenuPage from './components/MenuPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/order" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
