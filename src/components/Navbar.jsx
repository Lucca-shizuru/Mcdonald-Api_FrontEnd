import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function Navbar() {
    const [hover, setHover] = useState(null);

    const handleMouseEnter = (index) => setHover(index);
    const handleMouseLeave = () => setHover(null);

    return (
        <nav style={styles.navbar}>
            <div style={styles.left}>
                <Link
                    to="/"
                    style={hover === 0 ? { ...styles.link, ...styles.linkHover } : styles.link}
                    onMouseEnter={() => handleMouseEnter(0)}
                    onMouseLeave={handleMouseLeave}
                >
                    <FaHome style={styles.icon} />
                </Link>
                <Link
                    to="/categories"
                    style={hover === 1 ? { ...styles.link, ...styles.linkHover } : styles.link}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                >
                    Categorias
                </Link>
                <Link
                    to="/products"
                    style={hover === 2 ? { ...styles.link, ...styles.linkHover } : styles.link}
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={handleMouseLeave}
                >
                    Produtos
                </Link>
            </div>
            <div style={styles.right}>
                <button
                    style={hover === 3 ? {...styles.logoutButton, ...styles.linkHover}: styles.logoutButton}
                        onMouseEnter={() => handleMouseEnter(3)}
                        onMouseLeave={handleMouseLeave}
                >
                        Sair
                        </button>
            </div>
        </nav>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        backgroundColor: '#ffcc00',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    left: {
        display: 'flex',
        gap: '20px',
    },
    right: {
        display: 'flex',
        gap: '20px',
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: '#000',
        fontWeight: 'bold',
        fontSize: '16px',
        transition: 'all 0.3s ease',
    },
    icon: {
        marginRight: '8px',
    },
    logoutButton: {
        backgroundColor: '#ffcc00',
        color: '#000',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    // Estilo de hover
    linkHover: {
        backgroundColor: '#e0a800',
        color: '#fff',
        borderRadius: '8px',
        padding: '5px 15px',
    },
};

export default Navbar;
