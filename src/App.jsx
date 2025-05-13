import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Products from './pages/Products';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;