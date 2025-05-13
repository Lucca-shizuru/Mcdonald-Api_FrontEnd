import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const CategoryCard = ({ category, onEdit, onDelete }) => {
    return (
        <div style={styles.card}>
            <h3 style={styles.title}>{category.categoryName}</h3>
            <div style={styles.actions}>
                <button onClick={() => onEdit(category)} style={styles.editButton}>
                    <Pencil size={16} />
                </button>
                <button onClick={() => onDelete(category.categoryId)} style={styles.deleteButton}>
                    <Trash2 size={16} />
                </button>
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '12px',
        color: '#333',
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

export default CategoryCard;
