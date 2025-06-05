import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <div style={styles.card}>
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={styles.image} />}
            <h3 style={styles.title}>{product.name}</h3>
            <p style={styles.category}>Categoria: {product.categoryName}</p>
            <div style={styles.actions}>
                <button onClick={() => onEdit(product)} style={styles.editButton}><Pencil size={16} /></button>
                <button onClick={() => onDelete(product.productId)} style={styles.deleteButton}><Trash2 size={16} /></button>
            </div>
        </div>
    );
};

const styles = {
    card: {
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        width: '300px',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '12px',
        marginBottom: '12px',
    },
    title: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '8px',
    },
    category: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '12px',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
    },
    editButton: {
        backgroundColor: '#f0f0f0',
        border: 'none',
        padding: '6px',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    deleteButton: {
        backgroundColor: '#ff4d4f',
        border: 'none',
        padding: '6px',
        borderRadius: '8px',
        cursor: 'pointer',
        color: 'white',
    },
};

export default ProductCard;